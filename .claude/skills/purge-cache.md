---
name: purge-cache
description: Purge the Cloudflare cache for translational.ca
user_invocable: true
---

Purge the Cloudflare cache for translational.ca.

1. Read `cloudflare_tokens.json` in the repo root. Structure: `all_in_one.token` is the bearer token (scope includes `Zone:Cache Purge:Purge` on all zones). The translational.ca zone ID is at `zones["translational.ca"]`.
2. POST to `https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache` with `Authorization: Bearer {token}` and body `{"purge_everything":true}`.
3. Confirm `"success": true` in the response, or report the error.
