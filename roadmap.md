# Production deployment fixes

- [x] Remove the production sign-in handoff to `csifans.lovable.app`; use same-origin Google OAuth on Pages and preserve the Lovable preview broker.
- [x] Keep database-backed admin authorization unchanged and verify the configured Site URL/redirect allow-list.
- [x] Surface sanitized provider errors from assistant streams in the website and production logs.
- [x] Run the static production build and compile the Pages Function; verify the generated artifacts.
- [ ] Verify live Pages secrets, runtime logs, and Google sign-in end-to-end. Blocked: the available Cloudflare account does not contain the `csifans` Pages project, and no Google account session is available for an end-to-end login.