import json
from functools import lru_cache
import os
JSON_PATH = os.path.join(os.path.dirname(__file__), "troops_data.json")


@lru_cache(maxsize=1)
def load_from_json(path=JSON_PATH):
    base_healths = {}
    food_rates = {}
    leadership_costs = {}
    training_costs = {}

    try:
        with open(path, "r") as f:
            data = json.load(f)
        for entry in data:
            unit = entry.get("unit_type")
            if not unit:
                continue
            health = float(entry.get("base_health", 0))
            food = float(entry.get("food_consumption", 0))
            leadership = float(entry.get("leadership", 0))
            cost = float(entry.get("cost", 0))

            base_healths[unit] = health
            food_rates[unit] = food
            leadership_costs[unit] = leadership
            training_costs[unit] = cost

            # add short key for monsters (e.g., m3_water)
            #parts = unit.split('_')
            #if len(parts) >= 2 and parts[0].startswith('m'):
            #   short = f"{parts[0]}_{parts[1]}"
            #   if short not in base_healths:
            #       base_healths[short] = health
            #       food_rates[short] = food
            #       leadership_costs[short] = leadership

    except Exception as e:
        st.warning(f"Could not read JSON at {path}: {e}. Using minimal defaults.")

    return base_healths, food_rates, leadership_costs, training_costs
