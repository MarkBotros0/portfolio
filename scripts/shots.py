"""Screenshot pipeline for public/shots.

Two idempotent jobs:

  1. Normalize every shot to a <=1200px-wide WebP. The frames render around
     600px CSS, so 1200px covers DPR 2 with nothing visible lost. Raw PNGs
     dropped into _shots-src/ are converted and renamed on the way in — see
     IMPORTS below.

  2. Regenerate src/data/shotPlaceholders.ts: a 24px-wide WebP of each shot
     inlined as a data URI (~300-500 bytes each). The slideshow paints that
     blurred preview immediately, so a frame is never an empty box while the
     real screenshot downloads.

_shots-src/ holds the untouched originals and is gitignored — it must stay
outside public/, which Vite copies verbatim into dist/ and publishes.

Run: python scripts/shots.py
"""

import base64
import io
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / "public" / "shots"
SOURCE = ROOT / "_shots-src"
PLACEHOLDERS = ROOT / "src" / "data" / "shotPlaceholders.ts"

MAX_WIDTH = 1200
QUALITY = 82
LQIP_WIDTH = 24
LQIP_QUALITY = 40

# Raw screenshots to pull in from _shots-src/, named for the screen they show.
# Left in place after conversion; re-running skips anything already converted.
IMPORTS = {
    "Money MAnager/Screenshot (1855).png": "jpc-money-dashboard",
    "Money MAnager/Screenshot (1853).png": "jpc-money-income",
    "Money MAnager/Screenshot (1852).png": "jpc-money-expenses",
    "Money MAnager/Screenshot (1856).png": "jpc-money-subscriptions",
    "Money MAnager/Screenshot (1860).png": "jpc-money-users",
    "Money MAnager/Screenshot (1859).png": "jpc-money-payment",
    "Money MAnager/Screenshot (1861).png": "jpc-money-permissions",
    "Money MAnager/Screenshot (1862).png": "jpc-money-help",
    "Hyperexponential/Screenshot (1847).png": "hx-rating-summary",
    "Hyperexponential/Screenshot (1845).png": "hx-projections",
    "Hyperexponential/Screenshot (1843).png": "hx-own-experience",
    "Hyperexponential/Screenshot (1844).png": "hx-loss-ratios",
    "Hyperexponential/Screenshot (1842).png": "hx-risk-composition",
    "Hyperexponential/Screenshot (1841).png": "hx-policy-data",
    "Hyperexponential/Screenshot (1846).png": "hx-profit-commission",
    "Hyperexponential/Screenshot (1850).png": "hx-cat-loadings",
    "Hyperexponential/Screenshot (1848).png": "hx-rationale",
    "Hyperexponential/Screenshot (1849).png": "hx-risk-information",
    # NannyNow — portrait phone captures, rendered in the device stage.
    "Nanny Now/WhatsApp Image 2026-09-01 at 2.47.14 PM.jpeg": "nanny-services",
    "Nanny Now/WhatsApp Image 2026-09-01 at 2.47.11 PM.jpeg": "nanny-booking-care",
    "Nanny Now/WhatsApp Image 2026-09-01 at 2.47.11 PM (1).jpeg": "nanny-booking-review",
    "Nanny Now/WhatsApp Image 2026-09-01 at 2.47.13 PM.jpeg": "nanny-broadcast",
    "Nanny Now/WhatsApp Image 2026-09-01 at 2.47.16 PM.jpeg": "nanny-chat",
    "Nanny Now/WhatsApp Image 2026-09-01 at 2.47.18 PM.jpeg": "nanny-community-qa",
    "Nanny Now/WhatsApp Image 2026-09-01 at 2.47.17 PM.jpeg": "nanny-community-events",
    "Nanny Now/WhatsApp Image 2026-09-01 at 2.47.19 PM.jpeg": "nanny-account",
    # NannyNow admin console — landscape, shown behind the devices.
    "Nanny now Admin/Screenshot (1867).png": "nanny-admin-dashboard",
    "Nanny now Admin/Screenshot (1872).png": "nanny-admin-booking-detail",
    "Nanny now Admin/Screenshot (1869).png": "nanny-admin-pricing",
    "Nanny now Admin/Screenshot (1870).png": "nanny-admin-booking-options",
    "Nanny now Admin/Screenshot (1871).png": "nanny-admin-packages",
    "Nanny now Admin/Screenshot (1868).png": "nanny-admin-promos",
    # JPC Space — the mobile rebuild, replacing the old desktop captures.
    # The Students roster shot is deliberately not imported: it lists real
    # members' personal Gmail addresses.
    "jpc-space/WhatsApp Image 2026-09-01 at 3.01.58 PM.jpeg": "jpc-space-student-home",
    "jpc-space/WhatsApp Image 2026-09-01 at 3.01.58 PM (2).jpeg": "jpc-space-assignments",
    "jpc-space/WhatsApp Image 2026-09-01 at 3.01.58 PM (1).jpeg": "jpc-space-calendar",
    "jpc-space/WhatsApp Image 2026-09-01 at 3.01.57 PM (5).jpeg": "jpc-space-leader-home",
    "jpc-space/WhatsApp Image 2026-09-01 at 3.01.57 PM (2).jpeg": "jpc-space-submissions",
    "jpc-space/WhatsApp Image 2026-09-01 at 3.01.57 PM.jpeg": "jpc-space-reports",
}


def fit(img: Image.Image, width: int) -> Image.Image:
    if img.width <= width:
        return img
    return img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)


def import_sources() -> None:
    for rel, stem in IMPORTS.items():
        target = SHOTS / f"{stem}.webp"
        if target.exists():
            continue
        src = SOURCE / rel
        if not src.exists():
            print(f"  missing source, skipped: {rel}")
            continue
        fit(Image.open(src).convert("RGB"), MAX_WIDTH).save(
            target, "WEBP", quality=QUALITY, method=6
        )
        print(f"  imported {rel} -> {target.name} ({target.stat().st_size // 1024}KB)")


def normalize() -> None:
    for path in sorted(SHOTS.glob("*.webp")):
        img = Image.open(path)
        if img.width <= MAX_WIDTH:
            continue
        before = path.stat().st_size
        fit(img.convert("RGB"), MAX_WIDTH).save(path, "WEBP", quality=QUALITY, method=6)
        print(f"  {path.name}: {before // 1024}KB -> {path.stat().st_size // 1024}KB")


def lqip(path: Path) -> str:
    """A 24px WebP of the shot, pre-blurred so the browser has less to smooth."""
    img = fit(Image.open(path).convert("RGB"), LQIP_WIDTH).filter(
        ImageFilter.GaussianBlur(0.6)
    )
    buf = io.BytesIO()
    img.save(buf, "WEBP", quality=LQIP_QUALITY, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def write_placeholders() -> None:
    entries = [(f"/shots/{p.name}", lqip(p)) for p in sorted(SHOTS.glob("*.webp"))]
    body = "\n".join(f"  '{src}':\n    '{uri}'," for src, uri in entries)
    PLACEHOLDERS.write_text(
        "// Generated by scripts/shots.py — do not edit by hand.\n"
        "// A 24px WebP of every screenshot, inlined so a frame paints a blurred\n"
        "// preview instantly instead of sitting empty while the real file loads.\n"
        "export const shotPlaceholders: Record<string, string> = {\n"
        f"{body}\n"
        "}\n",
        encoding="utf-8",
    )
    total = sum(len(uri) for _, uri in entries)
    print(f"  {PLACEHOLDERS.relative_to(ROOT)}: {len(entries)} shots, {total // 1024}KB inlined")


if __name__ == "__main__":
    print("importing raw screenshots…")
    import_sources()
    print(f"normalizing to {MAX_WIDTH}px…")
    normalize()
    print("writing placeholders…")
    write_placeholders()
