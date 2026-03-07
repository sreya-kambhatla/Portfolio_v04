# ✨ Sreya's Portfolio — v03 Toggle Edition

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-Visit_Portfolio-00d4ff?style=for-the-badge&labelColor=060b14)](https://sreya-kambhatla.github.io/Portfolio_v04/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](#)

A dark glassmorphism portfolio built from scratch with vanilla HTML, CSS, and JavaScript — no frameworks, no build step. Features animated particle backgrounds, scroll-triggered reveals, a warm light mode, and a fully responsive layout.

---

## 🖼️ Preview

> Visit the [live site](https://sreya-kambhatla.github.io/Portfolio/) to see it in action

[![Portfolio Preview](https://img.shields.io/badge/%E2%96%B6_View_Live-sreya--kambhatla.github.io%2FPortfolio-00d4ff?style=flat-square&labelColor=060b14)](https://sreya-kambhatla.github.io/Portfolio/)

---

## ✨ Features

### 🎨 Design & Theming
- 🌙 **Dark glassmorphism design** — frosted glass tiles on a deep navy canvas
- ☀️ **Light mode toggle** — warm greige palette with indigo accents, switchable via an animated orb button
- 🟠 **Amber sun / cyan moon toggle** — orb shifts from cyan (dark) to amber (light) to reflect the active theme
- 🌌 **Animated particle background** — 70-node network with cyan/purple nebula glow, visible in both modes

### 🧩 Sections & Components
- 📊 **Stats row** — 2+ Years Experience, 50%+ Reporting Time Saved, 96% Client Satisfaction — indigo in light mode, cyan in dark
- 🎬 **Scroll-triggered reveal animations** — elements slide in as you scroll
- 📚 **Vertical education timeline** — alternating left/right cards with 4-color spine gradient
- 💼 **Horizontal experience timeline** — shimmer wave animation, hover-to-expand job details
- 💬 **Rotating manager quotes** — auto-cycling with per-company color coding
- 🛠️ **5-panel tech stack grid** — asymmetric layout with subtle category tints

### 📬 Contact
- **Outlook-style compose form** — Name, From, Subject, and message fields powered by EmailJS — no backend needed
- **Email chip** — displays recipient address styled with purple (light mode) or cyan (dark mode) palette chip
- **Social email icon** — links directly to `mailto:sreyakambhatla@outlook.com`

### ⚙️ Technical
- 🖼️ **OG social preview image** — auto-generated with Python + Pillow for link sharing
- 🤖 **CI/CD pipeline** — GitHub Actions validates HTML, CSS & JS on every push
- 📱 **Fully responsive** — mobile, tablet, and desktop
- 🔖 **Custom SK favicon** — cyan monogram in browser tab

---

## 🆕 Changelog — v03 Toggle Edition

| Change | Details |
|---|---|
| ☀️ Light / dark mode | Full warm-greige light theme with `[data-theme="light"]` CSS scoping |
| 🟠 Toggle orb colors | Cyan orb + moon icon in dark mode → amber orb + sun icon in light mode |
| 🔆 Sun icon visibility | Darker amber (`#c97d10`) orb with white icon fill for contrast |
| 📊 Stats color | Light mode stat numbers updated to indigo (`#3d3dc4`) to match palette |
| 📧 Email chip style | Chip uses cyan (dark) / purple (light) to follow the compose card palette |
| ✉️ Email display | Compose "To:" chip shows plain-text email, bypassing Cloudflare obfuscation |

---

## 📁 Folder Structure

```
Portfolio-Toggle-Mode-v03/
├── index.html                  # Page structure & content
├── styles.css                  # All styling, animations, light/dark themes, responsive layout
├── script.js                   # Canvas, scroll reveal, quotes, contact form
├── serve.sh                    # Shell: spin up local dev server instantly
├── profile.webp                # Profile photo
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Actions: validates on every push
```

---

## 🚀 Running Locally

```bash
# Clone the repo
git clone https://github.com/sreya-kambhatla/Portfolio.git
cd Portfolio

# Spin up local server (no install needed)
bash serve.sh
```

Then open `http://localhost:8000` in your browser.

---

## 📬 Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sreya-kambhatla/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sreya-kambhatla)
[![Calendly](https://img.shields.io/badge/Book_a_Call-4D94FF?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://calendly.com/sreyakambhatla/30min)
[![Email](https://img.shields.io/badge/Email-00d4ff?style=for-the-badge&logo=microsoftoutlook&logoColor=white)](mailto:sreyakambhatla@outlook.com)
