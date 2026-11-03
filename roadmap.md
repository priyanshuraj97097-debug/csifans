# Production deployment fixes

- [x] Remove the production sign-in handoff to `csifans.lovable.app`; use same-origin Google OAuth on Pages and preserve the Lovable preview broker.
- [x] Keep database-backed admin authorization unchanged and verify the configured Site URL/redirect allow-list.
- [x] Surface sanitized provider errors from assistant streams in the website and production logs; confirm the live Pages request returns Gemini HTTP 401 Unauthorized.
- [x] Run the static production build and compile the Pages Function; verify the generated artifacts.
- [ ] Fix the production Gemini credential. Blocked: the live request confirms Gemini HTTP 401 Unauthorized, and the connected Cloudflare account does not contain the `csifans` Pages project needed to update its production secret.
- [ ] Verify Google sign-in end-to-end. Blocked: a real authorized Google session is unavailable; the configured auth allow-list and Site URL have been read, and `csifans.pages.dev/admin` is allowed.