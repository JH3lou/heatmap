# streamlit-account-heatmap

An interactive, filterable **stacked-bar heatmap** as a bidirectional
[Streamlit](https://streamlit.io) component. Render a heatmap over your rows,
click categories to filter, and read the current selection (and matching row
indices) back in Python.

Built on the React component
[`@jh3lou/account-heatmap`](../heatmap-react) — the same component you can use
directly in a React app.

> Authored by [Justin Helou](https://github.com/JH3lou). MIT licensed.

## Install

```bash
pip install streamlit-account-heatmap
```

## Usage

```python
import pandas as pd
import streamlit as st
from streamlit_account_heatmap import account_heatmap

accounts = pd.DataFrame([
    {"name": "Johnson Trust", "cashPercent": 15.2, "status": "Active"},
    {"name": "Miller Family", "cashPercent": 3.8,  "status": "Pending"},
    # ...
])

config = {
    "cash": {
        "label": "Cash Levels",
        "categories": [
            {"label": "HighCash",   "color": "bg-blue-600",
             "rules": [{"field": "cashPercent", "op": ">", "value": 15}]},
            {"label": "MediumCash", "color": "bg-blue-400",
             "rules": [{"field": "cashPercent", "op": "between", "value": [5, 15]}]},
            {"label": "LowCash",    "color": "bg-blue-200",
             "rules": [{"field": "cashPercent", "op": "<", "value": 5}]},
        ],
    },
    "status": {
        "label": "Account Status",
        "categories": [
            {"label": "Active",  "color": "bg-green-600",
             "rules": [{"field": "status", "op": "==", "value": "Active"}]},
            {"label": "Pending", "color": "bg-yellow-600",
             "rules": [{"field": "status", "op": "==", "value": "Pending"}]},
        ],
    },
}

result = account_heatmap(accounts, config, initial_type="cash", key="hm")

# React to the selection
st.dataframe(result.filter(accounts))   # only the rows that match
st.write(result.type, result.categories, result.indices)
```

See [`example.py`](./example.py) for a complete side-by-side heatmap + table app.

## API

### `account_heatmap(data, config, ...) -> HeatmapResult`

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `list[dict]` \| `pd.DataFrame` | — | Rows to visualize. |
| `config` | `dict` | — | Declarative config (see below). |
| `initial_type` | `str` | first key | Which type to show first. |
| `title` | `str` | `"Heatmap"` | Heading above the heatmap. |
| `orientation` | `"vertical"` \| `"horizontal"` | `"vertical"` | Layout. |
| `height` | `str` | `"320px"` | Bar height (vertical only). |
| `inline` | `bool` | `False` | Drop the card wrapper. |
| `show_filters` | `bool` | `True` | Show active-filter chips. |
| `key` | `str` | `None` | Streamlit widget key. |

Returns a `HeatmapResult` (a dict subclass) with:

- `result.type` — the selected heatmap type key
- `result.categories` — the selected category labels
- `result.indices` — indices (into your original `data`) of matching rows
- `result.filter(data)` — the matching rows (DataFrame in, DataFrame out)

### Config schema

`config` maps a **type key** to a definition with a `label` and a list of
`categories`. Each category has:

- `label` — display name and filter key
- `color` — a Tailwind background class (e.g. `"bg-blue-600"`)
- `rules` — a list of rule objects, AND-ed together

A rule is `{"field", "op", "value", "abs"?}`:

| `op` | meaning | `value` |
|------|---------|---------|
| `>` `<` `>=` `<=` | numeric comparison | number |
| `==` `!=` | equality | number / string / bool |
| `between` | inclusive range | `[min, max]` |

Set `"abs": true` to compare the absolute value of a numeric field (handy for
drift/variance). The full standard Tailwind color palette is available for the
`color` field.

## Development

The frontend is a Vite + React + TypeScript app that reuses the React package
source directly (via a Vite alias), so there is a single source of truth.

```bash
cd streamlit_account_heatmap/frontend
npm install
npm run build          # emits streamlit_account_heatmap/frontend/build
```

To iterate live, set `_RELEASE = False` in
[`streamlit_account_heatmap/__init__.py`](./streamlit_account_heatmap/__init__.py)
and run the dev server:

```bash
npm run dev            # serves on http://localhost:3001
streamlit run example.py
```

Build the Python distribution with the frontend bundled in:

```bash
python -m build        # produces wheel + sdist under dist/
```

## License

MIT © [Justin Helou](https://github.com/JH3lou)
