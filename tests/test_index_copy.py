"""Copy/structure assertions for the prep-swap wedge + adaptive-history moat on index.html.

No app/HTTP harness on this static site — these are grep-level guarantees that the agreed
positioning is present and the rejected framings are absent. Run:

    /Users/work/python-local/venv/bin/python tests/test_index_copy.py     # exits nonzero on fail
    /Users/work/python-local/venv/bin/pytest tests/test_index_copy.py -v   # also works
"""
import pathlib
import re

HTML = (pathlib.Path(__file__).parent.parent / "index.html").read_text()
LOW = HTML.lower()
# tag-collapsed view so copy assertions tolerate <br>/inline markup inside a phrase
FLAT = re.sub(r"<[^>]+>", " ", HTML)
FLAT = re.sub(r"\s+", " ", FLAT)


def test_hero_leads_with_swap_wedge():
    assert "Chart prep, without the prep work" in FLAT


def test_hero_keeps_provenance_promise_below():
    # provenance identity must survive as the subhead, not be deleted
    assert "traced" in LOW and "record" in LOW


def test_swap_chip_targets_the_work_not_a_worker():
    # reframed chip present; human-replacement framings forbidden
    assert "manual prep" in LOW
    assert "you don't have to hire" not in LOW
    assert "pay someone" not in LOW


def test_moat_contrasts_generated_history_against_a_static_form():
    # the differentiator: generated from the referral vs a form that asks the same thing
    assert "generated from" in LOW
    assert "same question" in LOW  # matches "same questions" (the static-form side)


def test_moat_credits_team_and_patient_not_patient_only():
    assert "moa" in LOW
    assert "patient" in LOW


def test_contributor_byline_present_and_labeled_as_shipping_later():
    assert "Prepared by" in HTML
    # honest gating: byline must be labeled as not-yet-shipped, tied to the app update
    assert "app update" in LOW


def test_contributor_graphic_shows_multiple_people():
    # the "many hands, one chart" band: four distinct contributors + the rust [ • ] mark
    for role in ("Referring GP", "Patient", "MOA / PA", "You (specialist)"):
        assert role in HTML, role
    assert "[ • ]" in HTML
    # honest gating line stays with the graphic
    assert "contributor byline ships with the app update" in LOW


def test_no_teams_rebrand_and_ocean_not_named():
    assert "chartprepper teams" not in LOW
    assert "ocean" not in LOW  # imply the generic-form competitor, never name it


if __name__ == "__main__":
    import sys
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    failed = 0
    for fn in fns:
        try:
            fn()
            print(f"PASS  {fn.__name__}")
        except AssertionError as e:
            failed += 1
            print(f"FAIL  {fn.__name__}  {e}")
    print(f"\n{len(fns) - failed}/{len(fns)} passed")
    sys.exit(1 if failed else 0)
