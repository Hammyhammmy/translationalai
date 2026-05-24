---
name: update-blog
description: Scan blog/ subdirectories, regenerate posts.json, commit and push. Optionally purge Cloudflare cache.
user_invocable: true
---

# Update Blog Index

Scan the `blog/` directory for post subdirectories and regenerate `blog/posts.json`.

## Steps

1. **Scan** `blog/*/` for subdirectories (each is a "series").
2. For each series directory, find all `.html` files (excluding `index.html`, `nav.js`).
3. For each HTML file:
   - Extract the `<title>` tag content for the post title. If no title tag, derive a title from the filename (replace hyphens/underscores with spaces, drop the date prefix).
   - Extract the date from the filename if it starts with a date pattern like `YYYY-MM-DD`. Format as "Mon DD, YYYY" (e.g. "May 24, 2026").
   - Build the href as `{series-folder}/{filename}`.
4. Sort posts within each series by date descending (newest first).
5. Sort series alphabetically by folder name.
6. Write the result to `blog/posts.json` in this format:
   ```json
   {
     "series": [
       {
         "title": "Series Name (derived from folder, title-cased, hyphens to spaces)",
         "posts": [
           {"title": "Post Title", "date": "May 24, 2026", "href": "series-folder/filename.html"}
         ]
       }
     ]
   }
   ```
7. **Commit and push** the updated `blog/posts.json`.
8. **Purge Cloudflare cache** using the cache_purge token from `cloudflare_tokens.json` (zone ID for translational.ca).
