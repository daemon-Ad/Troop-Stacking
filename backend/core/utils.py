from collections import OrderedDict
import math

# Constants
MARGIN = 0.01
MIN_UNITS = 1
TYPE_STRENGTH = {'melee': 1, 'ranged': 2, 'mounted': 3, 'flying': 4}

def eff_health_for_stack(stack_key, base_healths, bonus_multiplier):
    base = base_healths.get(stack_key, 0)
    bonus = bonus_multiplier.get(stack_key, 1.0)
    return float(base) * float(bonus)

def stack_sort_key(stack):
    parts = stack.split('_')
    prefix = parts[0]
    subtype = parts[1] if len(parts) > 1 else ''

    # base tier
    if prefix.startswith('m') and prefix[1:].isdigit():
        tier = int(prefix[1:])
    elif prefix[0] in ('g', 's') and prefix[1:].isdigit():
        tier = int(prefix[1:])
    else:
        tier = 0

    # base strengths
    type_strength = TYPE_STRENGTH.get(subtype, 1)
    role_strength = 2 if prefix.startswith('g') else 1

    if prefix.startswith('s') and subtype == 'flying' and 5 <= tier <= 7:
        type_strength = 2.5

    if prefix.startswith('m'):
        tier += 100
        role_strength = 3

    return (tier, type_strength, role_strength)

def build_stack_list(g_tiers, s_tiers, m_tiers, availability, base_healths):
    stacks = []
    for s in s_tiers:
        for sub in availability.get(f's{s}', []):
            stacks.append(f's{s}_{sub}')
    for g in g_tiers:
        for sub in availability.get(f'g{g}', []):
            stacks.append(f'g{g}_{sub}')
    for m in m_tiers:
        prefix = f'm{m}_'
        selected_subs = availability.get(f'm{m}', [])
        for sub in selected_subs:
            key = f'{prefix}{sub}'
            if key in base_healths:
                stacks.append(key)
    return stacks

# comment this if you want to go to orevious version
def get_pve_sequence():
    """Global death sequence order for PVE battles (monsters)."""
    return [
        # T1–T4
        "s1_melee", "g1_melee", "g1_mounted", "g1_ranged",
        "s2_melee", "g2_melee", "g2_mounted", "g2_ranged",
        "s3_melee", "g3_melee", "g3_mounted", "g3_ranged",
        "s4_melee", "g4_melee", "g4_mounted", "g4_ranged",

        # T5–T9 as per your defined global logic
        "s5_mounted", "s5_flying", "s5_melee", "s5_ranged",
        "g5_melee", "g5_mounted", "g5_ranged", "s6_mounted",
        "s6_flying", "s6_melee", "s6_ranged", "g6_melee",
        "g5_flying", "g6_mounted", "g6_ranged", "s7_mounted",
        "s7_flying", "s7_melee", "s7_ranged", "g7_melee",
        "g6_flying", "g7_mounted", "g7_ranged", "s8_mounted",
        "s8_flying", "s8_melee", "s8_ranged", "g8_melee",
        "g7_flying", "g8_mounted", "g8_ranged", "s9_mounted",
        "s9_flying", "s9_melee", "s9_ranged", "g9_melee",
        "g8_flying", "g9_mounted", "g9_ranged", "g9_flying",

        "m3_water_elemental", "m3_battle_boar", "m3_emerald_dragon", "m3_stone_gargoyle",
        "m4_gorgon_medusa", "m4_many_armed_guardian", "m4_magic_dragon", "m4_ice_phoenix",
        "m5_desert_vanquisher", "m5_fearsome_manticore", "m5_flaming_cantaur", "m5_ettin",
        "m6_troll_rider", "m6_crystal_dragon", "m6_ruby_golem", "m6_jungle_destroyer",
        "m7_ancient_terror", "m7_destructive_colossus", "m7_black_dragon", "m7_wind_lord",
        "m8_devastator_1", "m8_fire_phoenix_1", "m8_kraken_1", "m8_trickster_1",
        "m9_devastator_2", "m9_fire_phoenix_2", "m9_kraken_2", "m9_trickster_2"
    ]


def filter_by_availability(sequence, available_stacks):
    """Return only those from sequence that exist in available stacks."""
    return [s for s in sequence if s in available_stacks]



