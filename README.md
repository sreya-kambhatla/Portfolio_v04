# ✨ Sreya's Portfolio

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-Visit_Portfolio-00d4ff?style=for-the-badge&labelColor=060b14)](https://sreya-kambhatla.github.io/Portfolio_v04/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](#)

A dark glassmorphism portfolio built from scratch with vanilla HTML, CSS, and JavaScript.

---

## ✨ Features

### 🎨 Design & Theming
- 🌙 **Dark glassmorphism design** — frosted glass tiles on a deep navy canvas
- ☀️ **Light mode toggle** — warm greige palette with indigo accents, switchable via an animated orb button
- 🌌 **Animated particle background** — 70-node network with cyan/purple nebula glow, visible in both modes

### 🧩 Sections & Components
- 🎬 **Scroll-triggered reveal animations** — every section heading, label, tile, quotes card, and connect links animate in on scroll
- 💼 **Experience timeline** — horizontal shimmer wave on desktop, vertical animated line on mobile, with aligned dots per card
- 🛠️ **5-panel tech stack grid** — asymmetric layout with subtle category tints
- 💬 **Manager quotes carousel** — auto-rotating slideshow with smooth transitions
- 📬 **Email compose panel** — inline contact form powered by EmailJS with auto-reply

### 📱 Mobile & Responsive
- **Hamburger nav** — animated slide-down drawer with X close button
- **Scroll reveal on all sections** — every heading, label, quote, and tile animates in
- **Optimised canvas** — particle count halved on mobile to preserve battery and keep scrolling smooth
- **Horizontal scroll locked** — `overscroll-behavior-x:none` on both `html` and `body` prevents sideways drift on iOS

### ⚙️ Technical
- 🤖 **CI/CD pipeline** — GitHub Actions validates HTML, JS syntax, and CSS brace balance on every push
- 🚫 **Jekyll bypassed** — `.nojekyll` file ensures GitHub Pages serves plain HTML directly, no build step
- 🔒 **Email obfuscation bypass** — email address assembled at runtime in JS to prevent Cloudflare from encoding it
- ⚡ **Zero dependencies** — vanilla JS only, no frameworks, no build step

---

## 📁 Folder Structure

```
Portfolio/
├── index.html                  # Page structure & content
├── styles.css                  # All styling, animations, light/dark themes, responsive layout
├── script.js                   # Canvas, scroll reveal, quotes, contact form, email injection
├── serve.sh                    # Shell: spin up local dev server instantly
├── .nojekyll                   # Tells GitHub Pages to skip Jekyll and serve HTML directly
├── Portfolio Picture.png       # Profile photo
├── Sreya_Kambhatla_Resume.pdf  # Downloadable resume
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Actions: validates HTML, JS, and CSS on every push
```

## 📬 Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sreya-kambhatla/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sreya-kambhatla)
[![Calendly](https://img.shields.io/badge/Book_a_Call-4D94FF?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://calendly.com/sreyakambhatla/30min)
[![Email](https://img.shields.io/badge/Email-00d4ff?style=for-the-badge&logo=microsoftoutlook&logoColor=white)](mailto:sreyakambhatla@outlook.com)
