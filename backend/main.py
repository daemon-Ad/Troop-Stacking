from fastapi import FastAPI, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from core.data_loader import load_from_json
from core.logic import masking_with_start_fill
from core.utils import build_stack_list
from functools import lru_cache
from database import get_db
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from email.mime.text import MIMEText
from dotenv import load_dotenv
import smtplib
import os

# Load environment variables
load_dotenv()

app = FastAPI(title="Troop Optimizer API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load troop data
base_healths, food_rates, leadership_costs, training_costs = load_from_json("core/troops_data.json")

# Request model for /calculate
class CalcRequest(BaseModel):
    g_tiers: list[int]
    s_tiers: list[int]
    m_tiers: list[int]
    availability: dict
    bonus_multiplier: dict
    leadership_cap: float
    dominance_cap: float
    margin: float | None = None
    training_cost: float | None = 0
    revival_cost_reduction: float | None = 0


@app.get("/api")
def root():
    return {"message": "Troop Optimizer API is running."}


@app.post("/api/calculate")
def calculate(req: CalcRequest):
    stacks = build_stack_list(
        req.g_tiers, req.s_tiers, req.m_tiers,
        req.availability, base_healths
    )

    expanded_bonus = {key: 1.0 + (val / 100.0) for key, val in req.bonus_multiplier.items()}

    for g in req.g_tiers:
        for sub in ["melee", "ranged", "mounted", "flying"]:
            troop_key = f"guardsman_{sub}"
            if troop_key in expanded_bonus:
                expanded_bonus[f"g{g}_{sub}"] = expanded_bonus[troop_key]

    for s in req.s_tiers:
        for sub in ["melee", "ranged", "mounted", "flying"]:
            troop_key = f"specialist_{sub}"
            if troop_key in expanded_bonus:
                expanded_bonus[f"s{s}_{sub}"] = expanded_bonus[troop_key]

    warnings = []
    troop_bonus_keys = [k for k in req.bonus_multiplier.keys() if k.startswith(("guardsman_", "specialist_"))]
    all_troop_bonus_zero = all(req.bonus_multiplier.get(k, 0) == 0 for k in troop_bonus_keys)

    if not troop_bonus_keys:
        warnings.append("No troop bonuses detected (guardsman_* / specialist_*). Default bonuses = 0%.")
    elif all_troop_bonus_zero:
        warnings.append("All troop bonuses are set to 0%. This may cause unrealistic results.")

    monster_bonus_keys = [k for k in req.bonus_multiplier.keys() if k.startswith("m")]
    if not monster_bonus_keys:
        warnings.append("No monster bonuses detected. Monster layers will be underpowered.")

    result = masking_with_start_fill(
        stacks=stacks,
        base_healths=base_healths,
        bonus_multiplier=expanded_bonus,
        leadership_cap=req.leadership_cap,
        dominance_cap=req.dominance_cap,
        leadership_costs=leadership_costs,
        food_rates=food_rates,
        training_costs=training_costs,
        margin=req.margin,
        training_cost=req.training_cost,
        revival_cost_reduction=req.revival_cost_reduction
    )

    result["warnings"] = warnings
    return result


@app.get("/api/meta")
@lru_cache(maxsize=1)
def meta():
    monsters = {}
    for k in base_healths.keys():
        if k.startswith("m") and "_" in k:
            try:
                tier = int(k.split("_")[0][1:])
                name = "_".join(k.split("_")[1:])
                monsters.setdefault(tier, []).append(name)
            except Exception:
                continue
    return {"monsters": monsters}


# -----------------------------
# 📧 EMAIL FALLBACK CONFIG
# -----------------------------
MAIL_HOST = os.getenv("MAIL_HOST")
MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
MAIL_USER = os.getenv("MAIL_USER")
MAIL_PASS = os.getenv("MAIL_PASS")
MAIL_TO = os.getenv("MAIL_TO")

def send_backup_email(data: dict):
    """Send fallback email if Supabase insert fails."""
    subject = f"Backup Contact Message from {data['player_name']} (K{data['kingdom']})"
    body = (
        f"Kingdom: {data['kingdom']}\n"
        f"Coords: X={data['x_coord']} | Y={data['y_coord']}\n"
        f"Player: {data['player_name']}\n"
        f"Email: {data['email']}\n"
        f"Message:\n{data['message']}"
    )

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = MAIL_USER
    msg["To"] = MAIL_TO

    try:
        with smtplib.SMTP(MAIL_HOST, MAIL_PORT) as server:
            server.starttls()
            server.login(MAIL_USER, MAIL_PASS)
            server.send_message(msg)
        print("📧 Backup email sent successfully.")
    except Exception as e:
        print(f"⚠️ Failed to send backup email: {e}")


# -----------------------------
# 📨 CONTACT ENDPOINT
# -----------------------------
@app.post("/api/contact")
def contact(
    kingdom: str = Form(...),
    x_coord: str = Form(...),
    y_coord: str = Form(...),
    player_name: str = Form(...),
    message: str = Form(...),
    email: str = Form(None),
    db=Depends(get_db)
):
    data = {
        "kingdom": kingdom,
        "x_coord": x_coord,
        "y_coord": y_coord,
        "player_name": player_name,
        "email": email or "N/A",
        "message": message
    }

    try:
        # Primary insert into Supabase Postgres
        db.execute(
            text("""
                INSERT INTO contact_messages (kingdom, x_coord, y_coord, player_name, email, message)
                VALUES (:kingdom, :x_coord, :y_coord, :player_name, :email, :message)
            """),
            data
        )
        db.commit()
        print(f"💾 Message saved from {player_name} (K{kingdom})")
        return {"status": "received", "saved_to": "supabase"}

    except OperationalError as e:
        print(f"⚠️ Supabase unreachable, sending fallback email. Error: {e}")
        send_backup_email(data)
        return {"status": "received", "saved_to": "email_backup"}


frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="static")

@app.get("/{full_path:path}")
def serve_frontend(full_path: str):
    index_file = os.path.join(frontend_path, "index.html")
    return FileResponse(index_file)

