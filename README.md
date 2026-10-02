# portfolio-demo2 — Chaitanya, Data & AI Leader

Static portfolio site (HTML/CSS/JS, no build step) ready for GitHub Pages.

## Folder structure

```
portfolio-demo2/
├── index.html              # Single-page site: hero, about, skills, projects, experience,
│                           # certifications, achievements, contact
├── css/style.css           # All styles (light/dark themes via CSS variables)
├── js/
│   ├── theme-init.js       # Applies saved theme before first paint
│   └── main.js             # Theme toggle, mobile nav, scroll-spy, back-to-top
├── images/profile/profile.jpg   # Your photo (replace with a square ~600×600 image)
├── assets/
│   ├── icons/              # Favicons
│   └── og-image.png        # Social share preview image
├── resume/
│   ├── resume.html         # Printable resume (Print → Save as PDF)
│   └── Chaitanya_DataEngineer.docx
├── certificates/           # Put certificate PDFs/badges here
├── docs/                   # Notes, write-ups, case studies
└── temp/                   # Scratch files (ignored by git)
```

## Customise

1. ~~Replace `images/profile/profile.jpg` with your photo~~ Done. The current photo is 1120×1404 and about 1.5 MB. Shrinking it to roughly 600×600 and under 200 KB will make the page load faster.
2. Search `index.html` and `resume/resume.html` for `example.com`, `yourprofile`, `yourusername` and put in your real email, LinkedIn and GitHub.
3. Edit the sample projects, employers, certifications and achievements to match your history.
4. Optional: export `resume/resume.html` to PDF and link that instead.

## Preview locally

Double-click `index.html`, or use the VS Code "Live Server" extension, or run `npx serve .`.

## Publish on GitHub Pages

- Repository: https://github.com/gcpchaitanya79/portfolio-demo2 (branch `main`)
- Live site: https://gcpchaitanya79.github.io/portfolio-demo2/ (once Pages is enabled)

To turn on Pages, go to **Settings → Pages → Source: Deploy from a branch → `main` / root → Save**.

To publish changes, run `git add . && git commit -m "..." && git push`. The site rebuilds automatically.

The `canonical` and `og:` URLs in `index.html` still point to `yourusername.github.io`. Change them to `gcpchaitanya79.github.io`.

## Recent changes

- `fa6d3b5` Replaced the placeholder profile photo with a real photo.
- `ce081e3` First version of the portfolio: hero, about, skills, projects, experience, certifications, achievements, contact, printable resume and GitHub Pages setup.
