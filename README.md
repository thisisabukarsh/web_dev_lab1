# Web Dev Presentation Template

## Project Structure

```
web_dev_presentation/
│
├── public/
│   ├── images/                # All images used in slides
│   └── ...                    # Other static assets (fonts, etc.)
│
├── slides/                    # Each slide as a separate HTML file
│   ├── 01_welcome.html
│   ├── 02_kickoff.html
│   ├── ... (one file per slide)
│
├── src/
│   ├── js/
│   │   └── main.js            # Handles loading slides, navigation, etc.
│   └── css/
│       └── styles.css         # Custom styles (if any)
│
├── index.html                 # The main template (loads slides dynamically)
└── README.md
```

## How to Add a Slide

1. Create a new HTML file in the `slides/` folder (e.g., `03_example.html`).
2. Only include the content for the slide (no `<html>`, `<head>`, or `<body>` tags).
3. The navigation and template are handled automatically.

## How It Works

- `index.html` is the main entry point and loads slides dynamically into a container.
- Navigation is handled by `src/js/main.js`.
- All images and static assets go in `public/images/`.

---

This structure is modular, scalable, and easy to maintain. Add, remove, or edit slides by simply modifying files in the `slides/` folder.
