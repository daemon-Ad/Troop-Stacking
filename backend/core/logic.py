import math
from collections import OrderedDict
from .utils import (
    eff_health_for_stack, 
    stack_sort_key, 
    MARGIN,
    MIN_UNITS,
    get_pve_sequence,
    filter_by_availability
)

START_UNITS_MAX_SEARCH = 2000

def masking_with_start_fill(stacks, base_healths, bonus_multiplier,
                            leadership_cap, dominance_cap,
                            leadership_costs, food_rates,
                            training_costs,
                            margin=None,
                            training_cost: float = 0,
                            revival_cost_reduction: float = 0):

    info = []
    for s in stacks:
        eff = eff_health_for_stack(s, base_healths, bonus_multiplier)
        parts = s.split('_')
        prefix = parts[0]
        subtype = parts[1] if len(parts) > 1 else ''

        lead_cost = leadership_costs.get(s, leadership_costs.get(subtype, 1))

        if prefix.startswith('m'):
            dom_cost = lead_cost
        else:
            dom_cost = 0

        food = food_rates.get(s, food_rates.get(subtype, 5))
        info.append({
            'stack': s,
            'eff_h': eff,
            'lead_cost': lead_cost,
            'dom_cost': dom_cost,
            'food': food,
            'sort_key': stack_sort_key(s)
        })

    global_seq = get_pve_sequence()
    available_seq = filter_by_availability(global_seq, [x['stack'] for x in info])

    if available_seq:
        seq_order = {stack: i for i, stack in enumerate(available_seq)}
        info.sort(key=lambda x: seq_order.get(x['stack'], 9999), reverse=True)
    else:
        info.sort(key=lambda x: x['sort_key'], reverse=True)

    def compute_for_start(start_units):
        units = OrderedDict()
        totals = OrderedDict()
        strongest = info[0]
        units[strongest['stack']] = max(MIN_UNITS, int(start_units))
        totals[strongest['stack']] = units[strongest['stack']] * strongest['eff_h']

        for idx in range(1, len(info)):
            srec = info[idx]
            prev_total = totals[info[idx - 1]['stack']]
            if srec['eff_h'] <= 0:
                continue
            effective_margin = margin if margin is not None else MARGIN
            required = math.ceil(((prev_total * (1.0 + effective_margin)) / srec['eff_h']))
            units[srec['stack']] = max(MIN_UNITS, int(required))
            totals[srec['stack']] = units[srec['stack']] * srec['eff_h']

        lead_used = sum(
            units[k['stack']] * k['lead_cost']
            for k in info if not k['stack'].startswith('m')
        )
        dom_used = sum(units[k['stack']] * k['dom_cost'] for k in info)
        food = sum(units[k['stack']] * k['food'] for k in info)
        return units, totals, lead_used, dom_used, food

    last_valid = None
    for su in range(1, START_UNITS_MAX_SEARCH + 1):
        units, totals, lead_used, dom_used, food = compute_for_start(su)
        if lead_used <= leadership_cap and dom_used <= dominance_cap:
            last_valid = (units, totals, lead_used, dom_used, food)
        else:
            break

    if not last_valid:
        units, totals, lead_used, dom_used, food = compute_for_start(1)
    else:
        units, totals, lead_used, dom_used, food = last_valid

    for k in list(units.keys()):
        totals[k] = round(float(totals[k]), 2)

    troops = {k: v for k, v in units.items() if not k.startswith('m')}
    monsters = {k: v for k, v in units.items() if k.startswith('m')}
    healths = {
        k: round(v * base_healths.get(k, 0) * bonus_multiplier.get(k, 1.0), 2)
        for k, v in units.items()
    }

    # 🟢 Calculate total training cost for ALL allocated stacks (troops + monsters)
    # Use exact unit key if present, otherwise fall back to subtype (e.g. 'melee')
    reduction_factor = (100 - training_cost)/100.0 if training_cost else 1.0
    total_training_cost = sum(
        count * training_costs.get(unit, 0)
        for unit, count in units.items()
    ) * reduction_factor


    return {
        'troops': troops,
        'monsters': monsters,
        'healths': healths,
        'lead_used': lead_used,
        'dom_used': dom_used,
        'food': food,
        'training_cost_total': round(total_training_cost, 2),
        'revival_cost_reduction': revival_cost_reduction,
        'raw_units': units,
        'raw_totals': totals
    }

