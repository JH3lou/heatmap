"""Example Streamlit app for the account heatmap component.

Run with:

    pip install -e ".[example]"
    streamlit run example.py
"""

import pandas as pd
import streamlit as st

from streamlit_account_heatmap import account_heatmap

st.set_page_config(page_title="Account Heatmap", layout="wide")

# --- Sample data -----------------------------------------------------------
accounts = pd.DataFrame(
    [
        {"id": 1, "name": "Johnson Trust", "accountNumber": "ACC001", "totalValue": 1250000, "cashPercent": 15.2, "driftPercent": 2.1, "restrictions": "None", "status": "Active", "advisor": "Smith, John"},
        {"id": 2, "name": "Miller Family", "accountNumber": "ACC002", "totalValue": 850000, "cashPercent": 3.8, "driftPercent": -1.2, "restrictions": "Tax Loss", "status": "Pending", "advisor": "Johnson, Mary"},
        {"id": 3, "name": "Davis Corp", "accountNumber": "ACC003", "totalValue": 2100000, "cashPercent": 22.5, "driftPercent": 4.8, "restrictions": "ESG Only", "status": "Active", "advisor": "Brown, David"},
        {"id": 4, "name": "Wilson Retirement", "accountNumber": "ACC004", "totalValue": 450000, "cashPercent": 1.2, "driftPercent": 0.5, "restrictions": "None", "status": "On Hold", "advisor": "Smith, John"},
        {"id": 5, "name": "Taylor Holdings", "accountNumber": "ACC005", "totalValue": 1800000, "cashPercent": 8.7, "driftPercent": -2.8, "restrictions": "No Options", "status": "Active", "advisor": "Johnson, Mary"},
        {"id": 6, "name": "Anderson LLC", "accountNumber": "ACC006", "totalValue": 950000, "cashPercent": 18.9, "driftPercent": 3.2, "restrictions": "None", "status": "Closed", "advisor": "Brown, David"},
        {"id": 7, "name": "Thompson Trust", "accountNumber": "ACC007", "totalValue": 650000, "cashPercent": 0.8, "driftPercent": 1.1, "restrictions": "Tax Loss", "status": "Active", "advisor": "Smith, John"},
        {"id": 8, "name": "Garcia Family", "accountNumber": "ACC008", "totalValue": 1350000, "cashPercent": 25.3, "driftPercent": 5.2, "restrictions": "ESG Only", "status": "Pending", "advisor": "Johnson, Mary"},
        {"id": 9, "name": "Martinez Corp", "accountNumber": "ACC009", "totalValue": 750000, "cashPercent": 4.1, "driftPercent": -0.8, "restrictions": "None", "status": "Active", "advisor": "Brown, David"},
        {"id": 10, "name": "Rodriguez Trust", "accountNumber": "ACC010", "totalValue": 1150000, "cashPercent": 12.4, "driftPercent": 2.9, "restrictions": "No Options", "status": "On Hold", "advisor": "Smith, John"},
    ]
)

# --- Declarative heatmap config (JSON-serializable) ------------------------
config = {
    "cash": {
        "label": "Cash Levels",
        "categories": [
            {"label": "HighCash", "color": "bg-blue-600", "rules": [{"field": "cashPercent", "op": ">", "value": 15}]},
            {"label": "MediumCash", "color": "bg-blue-400", "rules": [{"field": "cashPercent", "op": "between", "value": [5, 15]}]},
            {"label": "LowCash", "color": "bg-blue-200", "rules": [{"field": "cashPercent", "op": "<", "value": 5}]},
        ],
    },
    "drift": {
        "label": "Drift Analysis",
        "categories": [
            {"label": "HighDrift", "color": "bg-red-600", "rules": [{"field": "driftPercent", "op": ">", "value": 3, "abs": True}]},
            {"label": "MediumDrift", "color": "bg-orange-400", "rules": [{"field": "driftPercent", "op": "between", "value": [1, 3], "abs": True}]},
            {"label": "LowDrift", "color": "bg-green-400", "rules": [{"field": "driftPercent", "op": "<", "value": 1, "abs": True}]},
        ],
    },
    "restrictions": {
        "label": "Restrictions",
        "categories": [
            {"label": "ESG Only", "color": "bg-purple-600", "rules": [{"field": "restrictions", "op": "==", "value": "ESG Only"}]},
            {"label": "Tax Loss", "color": "bg-yellow-500", "rules": [{"field": "restrictions", "op": "==", "value": "Tax Loss"}]},
            {"label": "No Options", "color": "bg-gray-500", "rules": [{"field": "restrictions", "op": "==", "value": "No Options"}]},
            {"label": "None", "color": "bg-green-500", "rules": [{"field": "restrictions", "op": "==", "value": "None"}]},
        ],
    },
    "value": {
        "label": "Account Value",
        "categories": [
            {"label": "HighValue", "color": "bg-emerald-600", "rules": [{"field": "totalValue", "op": ">", "value": 1500000}]},
            {"label": "MediumValue", "color": "bg-emerald-400", "rules": [{"field": "totalValue", "op": "between", "value": [800000, 1500000]}]},
            {"label": "LowValue", "color": "bg-emerald-200", "rules": [{"field": "totalValue", "op": "<", "value": 800000}]},
        ],
    },
    "status": {
        "label": "Account Status",
        "categories": [
            {"label": "Active", "color": "bg-green-600", "rules": [{"field": "status", "op": "==", "value": "Active"}]},
            {"label": "Pending", "color": "bg-yellow-600", "rules": [{"field": "status", "op": "==", "value": "Pending"}]},
            {"label": "On Hold", "color": "bg-orange-600", "rules": [{"field": "status", "op": "==", "value": "On Hold"}]},
            {"label": "Closed", "color": "bg-gray-600", "rules": [{"field": "status", "op": "==", "value": "Closed"}]},
        ],
    },
}

st.title("Account Overview")
st.caption("Click a heatmap segment to filter the table below.")

left, right = st.columns([1, 3])

with left:
    result = account_heatmap(
        data=accounts,
        config=config,
        initial_type="cash",
        title="Account Heatmap",
        orientation="vertical",
        height="320px",
        key="account_heatmap",
    )

with right:
    filtered = result.filter(accounts)
    st.write(f"**{len(filtered)} of {len(accounts)} accounts**")
    st.dataframe(filtered, use_container_width=True, hide_index=True)

    if result.categories:
        st.info("Active filters: " + ", ".join(result.categories))
