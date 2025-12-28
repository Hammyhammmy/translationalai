# TranslationalAI Website

Static HTML website for TranslationalAI, ready for deployment to GitHub Pages.

## Local Testing

### Option 1: Python HTTP Server (Recommended)

Python 3 comes with a built-in HTTP server. This is the simplest way to test locally:

```bash
python3 -m http.server 8000
```

Then open your browser and visit:
- `http://localhost:8000`

### Option 2: Node.js http-server

If you have Node.js installed:

```bash
npx http-server -p 8000
```

Then visit `http://localhost:8000`

### Option 3: VS Code Live Server

If you're using VS Code, install the "Live Server" extension and right-click on `index.html` to select "Open with Live Server".

## File Structure

- `index.html` - Main navigation page
- `home.html` - Homepage (standard version)
- `home-simple.html` - Homepage (simplified version)
- `lightscribe.html` / `lightscribe-simple.html` - LightScribe product page
- `chartprepper.html` / `chartprepper-simple.html` - ChartPrepper product page
- `partner-in-practice.html` / `partner-in-practice-simple.html` - Partner in Practice product page
- `api-integration.html` / `api-integration-simple.html` - API Integration page
- `team.html` - About/Team page
- `404.html` - Custom 404 page with routing logic

## GitHub Pages Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `translationalai` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 2. Push to GitHub

From your local directory:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: TranslationalAI website"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/translationalai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (in the repository menu)
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### 4. Access Your Site

After enabling GitHub Pages, your site will be available at:
- `https://YOUR_USERNAME.github.io/translationalai/`

GitHub Pages may take a few minutes to build and deploy. You'll see a green checkmark when it's ready.

## Route Handling

The `404.html` file handles routing for clean URLs:
- `/home` → `home.html`
- `/lightscribe` → `lightscribe.html`
- `/chartprepper` → `chartprepper.html`
- etc.

GitHub Pages will automatically use `404.html` for any routes that don't match existing files.

## Notes

- All HTML files are self-contained with inline CSS and JavaScript
- Files are designed to work both standalone and within Squarespace
- The `.gitignore` excludes Python cache files, backup folders, and virtual environments

## Updating the Site

To update the site:

```bash
# Make your changes to HTML files
git add .
git commit -m "Update website content"
git push
```

GitHub Pages will automatically rebuild and deploy your changes (usually within 1-2 minutes).

# translationalai
