"""
generate_og_image.py
--------------------
Generates the Open Graph social preview image for Sreya's portfolio.
This image appears when the portfolio link is shared on LinkedIn, Twitter,
Slack, iMessage — it's the card preview with name and title.

Standard OG image size: 1200 x 630 pixels

Usage:
    pip install Pillow
    python generate_og_image.py

Output:
    og-image.png  (place in repo root, referenced in index.html meta tags)

How it works:
    Pillow is Python's image library. We:
    1. Create a blank canvas at 1200x630
    2. Draw a dark gradient background using horizontal scanlines
       (Pillow has no built-in gradient, so we interpolate per scanline)
    3. Render name, role, stats, and a 4-color accent bar
    4. Save as PNG
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ── Canvas ───────────────────────────────────────────────────────────────────
W, H = 1200, 630
img = Image.new("RGB", (W, H), color=(6, 11, 20))
draw = ImageDraw.Draw(img)

# ── Background gradient ───────────────────────────────────────────────────────
# We interpolate each horizontal scanline between two colors.
# This is a common pattern when libraries lack native gradient support.
for y in range(H):
    t = y / H
    r = int(6  + (12  - 6)  * t)
    g = int(11 + (21  - 11) * t)
    b = int(20 + (40  - 20) * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# ── Subtle dot-grid overlay ───────────────────────────────────────────────────
grid_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(grid_layer)
for x in range(0, W, 50):
    gd.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
for y in range(0, H, 50):
    gd.line([(0, y), (W, y)], fill=(255, 255, 255, 8))
img = Image.alpha_composite(img.convert("RGBA"), grid_layer).convert("RGB")
draw = ImageDraw.Draw(img)

# ── Cyan nebula glow top-left ─────────────────────────────────────────────────
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd2  = ImageDraw.Draw(glow)
for radius in range(380, 0, -6):
    alpha = int(28 * (1 - radius / 380) ** 2)
    gd2.ellipse([(200-radius, 150-radius), (200+radius, 150+radius)],
                fill=(0, 180, 220, alpha))
img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
draw = ImageDraw.Draw(img)

# ── 4-color vertical accent bar (left edge) ──────────────────────────────────
# Matches the portfolio timeline gradient: cyan -> purple -> amber -> green
STOPS = [(0,212,255), (167,139,250), (245,166,35), (38,217,138)]
for y in range(H):
    t   = y / H * (len(STOPS) - 1)
    i   = min(int(t), len(STOPS) - 2)
    frac = t - i
    c1, c2 = STOPS[i], STOPS[i+1]
    color = tuple(int(c1[j] + (c2[j]-c1[j]) * frac) for j in range(3))
    draw.line([(0, y), (5, y)], fill=color)

# ── Fonts ─────────────────────────────────────────────────────────────────────
def load_font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"    if bold else
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for p in candidates:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

font_label = load_font(15)
font_name  = load_font(68, bold=True)
font_role  = load_font(26)
font_small = load_font(19)

CYAN=(0,212,255); PURPLE=(167,139,250); AMBER=(245,166,35); GREEN=(38,217,138)
WHITE=(232,237,245); MUTED=(122,143,166)
PAD = 70

# ── Label ─────────────────────────────────────────────────────────────────────
draw.text((PAD, 72), "DATA & BUSINESS ANALYST  \u00b7  PORTFOLIO", font=font_label, fill=CYAN)

# ── Name ──────────────────────────────────────────────────────────────────────
draw.text((PAD, 108), "Sreya Kambhatla", font=font_name, fill=WHITE)

# ── Divider ───────────────────────────────────────────────────────────────────
div = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(div).line([(PAD, 238), (W-PAD, 238)], fill=(255,255,255,30), width=1)
img = Image.alpha_composite(img.convert("RGBA"), div).convert("RGB")
draw = ImageDraw.Draw(img)

# ── Role ──────────────────────────────────────────────────────────────────────
draw.text((PAD, 256), "Turning complex data into strategic decisions", font=font_role, fill=MUTED)

# ── Stat chips ────────────────────────────────────────────────────────────────
stats = [
    ("2+ Years Experience",     CYAN),
    ("500+ Shipments Tracked",  PURPLE),
    ("50%+ Reporting Saved",    AMBER),
    ("96% Client Satisfaction", GREEN),
]
cx, cy, ch = PAD, 328, 38
for label, color in stats:
    bb = draw.textbbox((0,0), label, font=font_small)
    tw = bb[2]-bb[0]
    cw = tw + 36
    bg = tuple(int(c*0.12) for c in color)
    bd = tuple(int(c*0.45) for c in color)
    rect = [(cx, cy), (cx+cw, cy+ch)]
    try:
        draw.rounded_rectangle(rect, radius=ch//2, fill=bg, outline=bd)
    except AttributeError:
        draw.rectangle(rect, fill=bg, outline=bd)
    draw.text((cx+18, cy+(ch-(bb[3]-bb[1]))//2), label, font=font_small, fill=color)
    cx += cw + 14

# ── Footer ────────────────────────────────────────────────────────────────────
foot = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(foot).line([(PAD, H-90), (W-PAD, H-90)], fill=(255,255,255,18), width=1)
img = Image.alpha_composite(img.convert("RGBA"), foot).convert("RGB")
draw = ImageDraw.Draw(img)
draw.text((PAD, H-64), "sreya-kambhatla.github.io", font=font_small, fill=CYAN)
draw.text((W-PAD-270, H-64), "Python \u00b7 SQL \u00b7 Power BI \u00b7 ML", font=font_small, fill=MUTED)

# ── Save ──────────────────────────────────────────────────────────────────────
OUTPUT = "og-image.png"
img.save(OUTPUT, "PNG", optimize=True)
print(f"Saved {OUTPUT}  ({W}x{H}px, {os.path.getsize(OUTPUT):,} bytes)")
print()
print("Add these meta tags inside <head> in index.html:")
print('  <meta property="og:title" content="Sreya Kambhatla | Data & Business Analyst"/>')
print('  <meta property="og:description" content="Turning complex data into strategic decisions."/>')
print('  <meta property="og:image" content="https://sreya-kambhatla.github.io/og-image.png"/>')
print('  <meta property="og:url" content="https://sreya-kambhatla.github.io"/>')
print('  <meta name="twitter:card" content="summary_large_image"/>')
