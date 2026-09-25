"""Streamlit component for an interactive, filterable stacked-bar heatmap.

Wraps the ``@jh3lou/account-heatmap`` React component as a bidirectional
Streamlit custom component: render a heatmap over your rows, click categories to
filter, and read the current selection (and the matching row indices) back in
Python.

Authored by Justin Helou (https://github.com/JH3lou). MIT licensed.
"""

import os
from typing import Any, Dict, List, Optional, Sequence, Union

import streamlit.components.v1 as components

# Toggle this to False and run the frontend dev server (``npm run dev`` in
# ``frontend/``) to iterate on the component locally.
_RELEASE = True

_COMPONENT_NAME = "account_heatmap"

if not _RELEASE:
    _component_func = components.declare_component(
        _COMPONENT_NAME,
        url="http://localhost:3001",
    )
else:
    _parent_dir = os.path.dirname(os.path.abspath(__file__))
    _build_dir = os.path.join(_parent_dir, "frontend", "build")
    _component_func = components.declare_component(_COMPONENT_NAME, path=_build_dir)


def _to_records(data: Any) -> List[Dict[str, Any]]:
    """Normalize supported inputs into a list of plain dicts.

    Accepts a list of dicts or a pandas DataFrame (imported lazily so pandas is
    not a hard dependency of the component).
    """
    if data is None:
        return []

    # pandas DataFrame -> records, without importing pandas at module load.
    if hasattr(data, "to_dict") and hasattr(data, "columns"):
        return data.to_dict(orient="records")

    return [dict(row) for row in data]


class HeatmapResult(dict):
    """The value returned from the component after each interaction.

    Behaves like a dict with keys ``type``, ``categories`` and ``indices`` and
    also exposes them as attributes for convenience::

        result = account_heatmap(...)
        result.type        # currently selected heatmap type
        result.categories  # list of selected category labels
        result.indices     # indices (into the original data) of matching rows
    """

    @property
    def type(self) -> Optional[str]:
        return self.get("type")

    @property
    def categories(self) -> List[str]:
        return self.get("categories", []) or []

    @property
    def indices(self) -> List[int]:
        return self.get("indices", []) or []

    def filter(self, data: Any) -> Any:
        """Return only the rows the current selection matches.

        Works with a pandas DataFrame (returns a filtered DataFrame) or with the
        same list-of-dicts you passed in (returns a filtered list).
        """
        idx = self.indices
        # pandas DataFrame
        if hasattr(data, "iloc"):
            return data.iloc[idx]
        records = _to_records(data)
        return [records[i] for i in idx if 0 <= i < len(records)]


def account_heatmap(
    data: Any,
    config: Dict[str, Any],
    initial_type: Optional[str] = None,
    title: str = "Heatmap",
    orientation: str = "vertical",
    height: str = "320px",
    inline: bool = False,
    show_filters: bool = True,
    key: Optional[str] = None,
) -> HeatmapResult:
    """Render the heatmap and return the current selection.

    Parameters
    ----------
    data:
        A list of dicts or a pandas DataFrame — the rows to visualize.
    config:
        A JSON-serializable declarative config mapping a *type key* to a
        definition with a ``label`` and a list of ``categories``. Each category
        has ``label``, ``color`` (a Tailwind class such as ``"bg-blue-600"``)
        and ``rules`` (a list of ``{"field", "op", "value", "abs"?}``). Rules on
        one category are AND-ed. Supported ops: ``>``, ``<``, ``>=``, ``<=``,
        ``==``, ``!=``, ``between`` (``value`` is ``[min, max]``, inclusive).

        Example::

            {
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
            }
    initial_type:
        Which type key to show first. Defaults to the first key in ``config``.
    title:
        Heading shown above the heatmap.
    orientation:
        ``"vertical"`` (sidebar) or ``"horizontal"`` (top bar).
    height:
        CSS height of the bar in vertical orientation (e.g. ``"320px"``).
    inline:
        If True, drop the card wrapper so the heatmap embeds cleanly in a
        container.
    show_filters:
        Show the active-filter chips beneath the heatmap.
    key:
        Streamlit widget key.

    Returns
    -------
    HeatmapResult
        Dict-like with ``type``, ``categories`` and ``indices``. Call
        ``result.filter(data)`` to get the matching rows.
    """
    if orientation not in ("vertical", "horizontal"):
        raise ValueError(
            f"orientation must be 'vertical' or 'horizontal', got {orientation!r}"
        )

    records = _to_records(data)

    if initial_type is None:
        initial_type = next(iter(config), None)

    component_value = _component_func(
        data=records,
        config=config,
        initialType=initial_type,
        title=title,
        orientation=orientation,
        height=height,
        inline=inline,
        showFilters=show_filters,
        key=key,
        default={"type": initial_type, "categories": [], "indices": list(range(len(records)))},
    )

    return HeatmapResult(component_value or {})


__all__ = ["account_heatmap", "HeatmapResult"]
