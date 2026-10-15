# SDD ledger â€” plan: docs/superpowers/plans/2026-10-14-crm-textil.md

Spec and plan approved; direct implementation and private publication authorized.
Pre-flight: Tasks 1â€“7 share Company, Activity, Deal, filters, integer money and business dates. API and UI use the same contracts.
Ruling: New app has its own repository on codex/crm-textil, isolated from source spreadsheets; no parent repository exists.
Ruling: Use Node's built-in test runner with TypeScript stripping rather than adding Vitest. Same assertions, fewer installation dependencies; tests must still exercise real SQLite and domain logic.
Ruling: Shell bookkeeping scripts are replaced by this tracked ledger on Windows; preserve task evidence here instead of disposable Bash tooling.
Task 1 in progress: starter and private Site registered. npm absent in runtime; official npm downloaded into ignored local tools after network escalation succeeded.

Tasks 1–6 implementation written. Domain and SQLite tests: node --test tests/domain.test.ts tests/store.test.ts → 11/11 PASS (after RED missing implementations). Extractor: 1750 unique CNPJs, 120 cities, 346 Caruaru, exact office/priority counts confirmed. Demo activity excluded.
Ruling: One authenticated snapshot endpoint provides the 1750 records for responsive client-side search/pagination and consistent dashboard calculations. Dataset is server-only, private response no-store; risk is payload size, to assess during browser QA.
Ruling: Business repository grouped into one focused store module with domain helpers rather than multiple server modules; interfaces remain independently tested against SQLite.
Task 7 in progress: responsive UI, typecheck/build and browser QA.

Tasks 1–6: complete. Node suite 15/15 PASS, includes source reconciliation, valid CNPJs, bounded resumable seed, optimistic lock, duplicate close and changed-payload retry rejection.
Browser E2E: PASS: 1750 imported; create company; failed POST preserves note; follow-up; 32.50 x 1000 quote; close order; rate snapshot; concurrent edit reload preserving changed fields; persistence; global search from Clients; 390px no overflow; anonymous API 401. No page errors.
Final review: independent reviewer provided findings about retry idempotency, refresh-after-save and global search. Findings fixed and covered by SQLite/browser tests. Reviewer hit usage limit before complete final report; remaining acceptance checklist self-reviewed, not represented as a full independent sign-off.
Final fixes: stable company IDs; changed payload retries explicitly rejected; saved POST with failed refresh reported as saved; explicit conflict reload merges only fields touched by user; global company search crosses lead/client scope; explicit form accessible labels.
Ruling: Initial seed limited to 40 new records per authenticated request to stay within database request limits; browser resumes until complete. Cost: first load makes more short requests, then normal single snapshot reads.
Ruling: Publishing follows the approved Sites workflow instead of a PR/merge menu: isolated new repository and explicit user approval to finish CRM without more planning confirmations.
Local QA-created companies removed from local database only; original input files and deployment seed unchanged.
