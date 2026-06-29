# Cloudflare Custom Domain: emr.translational.ca → Cloud Run

*Created: 2026-05-14*

## Overview

Route `emr.translational.ca` to the LightEMR **production** Cloud Run service (`lightemr-prod-emrh4jz3xq-nn.a.run.app`) via Cloudflare, with SSL at the edge.

**Important:** `deploy.sh` deploys to the `lightemr-prod` service (not `lightemr`). The CNAME and Worker must target `lightemr-prod-emrh4jz3xq-nn.a.run.app`.

Same pattern as `chart.translational.ca` → ChartPrepper (see `chartprepper-app/docs/cloudflare-custom-domain-setup.md`).

## Step 1: Cloudflare DNS — CNAME Record

In the Cloudflare dashboard for `translational.ca`, add:

| Type  | Name  | Target                                    | Proxy |
|-------|-------|-------------------------------------------|-------|
| CNAME | `emr` | `lightemr-prod-emrh4jz3xq-nn.a.run.app`      | On (orange cloud) |

Proxy **must be on** — Cloudflare terminates SSL and routes through the Worker.

## Step 2: Cloudflare Worker — Host Header Rewrite

Cloud Run rejects requests where the `Host` header doesn't match its `*.run.app` domain. Create a Worker named `emr-proxy`:

```js
addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  url.hostname = 'lightemr-prod-emrh4jz3xq-nn.a.run.app';
  const newRequest = new Request(url, event.request);
  newRequest.headers.set('Host', url.hostname);
  event.respondWith(fetch(newRequest));
});
```

## Step 3: Worker Route

Map the subdomain to the Worker:

| Route                       | Worker       |
|-----------------------------|-------------|
| `emr.translational.ca/*`   | `emr-proxy` |

## Step 4: Firebase Auth — Authorized Domain

Add `emr.translational.ca` to Firebase authorized domains so login redirects work:

```bash
# Using the lightemr-local-dev service account (has Firebase Auth Admin role)
export GOOGLE_APPLICATION_CREDENTIALS=credentials/cloud-sql-proxy-key.json

# List current authorized domains
gcloud alpha identity-platform config describe --project=lightemr-prod \
  --format='value(authorizedDomains)'

# Add the new domain (via Firebase console or gcloud)
# Firebase Console → Authentication → Settings → Authorized domains → Add domain
# Add: emr.translational.ca
```

Current authorized domains: `lightemr-prod.firebaseapp.com`, `lightemr-prod.web.app`, `localhost`

## Step 5: CORS Origins (optional)

CORS is currently locked to `localhost:8080` and `localhost:3000`. Since the app is server-rendered (not a separate SPA calling the API cross-origin), CORS doesn't apply to normal navigation. Only needed if a separate frontend makes `fetch()` calls to the API.

If needed, add to `lightemr/api/main.py`:

```python
allow_origins=[
    "http://localhost:8080",
    "http://localhost:3000",
    "https://emr.translational.ca",
],
```

## Step 6: Webhook Base URL

Set `LIGHTEMR_WEBHOOK_BASE_URL=https://emr.translational.ca` so Telnyx webhook registrations use the stable domain instead of whatever `Host` header the admin's browser sends. Already set in both `start.sh` and `deploy.sh`.

## Step 7: Tenant Resolution

The existing tenant middleware resolves tenants from subdomains (e.g., `clinicname.emr.translational.ca`). If using a flat domain (`emr.translational.ca` with no clinic subdomain), tenant resolution falls through to cookie → JWT → env var.

For multi-clinic on the custom domain, you'd use the pattern `{clinic}.emr.translational.ca` — each clinic gets a subdomain. The Cloudflare Worker route `emr.translational.ca/*` already catches `*.emr.translational.ca` with a wildcard CNAME.

**Alternative:** If using a wildcard, change the DNS record to:

| Type  | Name   | Target                                    | Proxy |
|-------|--------|-------------------------------------------|-------|
| CNAME | `*.emr`| `lightemr-prod-emrh4jz3xq-nn.a.run.app`      | On    |

And the Worker route to `*.emr.translational.ca/*`.

## Verification

After all steps:

```bash
# Should return the LightEMR login page
curl -sI https://emr.translational.ca | head -5

# Check SSL cert (should be Cloudflare edge cert for *.translational.ca)
echo | openssl s_client -connect emr.translational.ca:443 -servername emr.translational.ca 2>/dev/null | openssl x509 -noout -subject -issuer
```

## Tokens

Cloudflare API token (same as ChartPrepper): see `chartprepper-app/chartprep_frontend/cloudflare_workers.json`
