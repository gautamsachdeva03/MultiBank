# QA Strategy — Task 2

## Scenario

You join a fintech startup as QA Engineer. A mobile trading app (iOS + Android) ships in two weeks. No test suite, no QA docs, fast-moving dev team, real user funds involved.

---

## 1. Where do you start?

I start with **risk discovery**, not test cases.

Day-one priorities:
1. **Map money paths** — deposit, withdraw, order placement, balance display, fee calculation.
2. **Understand release scope** — what is in v1 vs deferred; read open PRs and feature flags.
3. **Shadow real users** — walk through onboarding, first trade, and withdrawal on staging with product.
4. **Inventory existing safety nets** — crash reporting (Sentry/Firebase), API monitoring, manual QA checklists devs already use.
5. **Define release blockers** — a short list of flows that must never break (auth, balances, order execution, withdrawal).

The output of week one is a **risk-ranked test charter**, not a full regression suite.

---

## 2. How would you approach testing this app?

A layered strategy balanced for a two-week deadline:

### Layer 1 — Critical path manual + exploratory (Days 1–5)
- Charter-based sessions on fund movement and trading flows.
- Device matrix: 2 iOS + 2 Android devices, different OS versions.
- Network conditions: offline, slow 3G, app backgrounding mid-order.

### Layer 2 — Targeted automation (Days 3–10)
- **API contract tests** for order, balance, and auth endpoints (fastest ROI).
- **Smoke E2E** on mobile (Detox / Appium / Maestro) for login → view balance → place/cancel order.
- **Unit/integration** left to devs; QA focuses on user-observable behavior.

### Layer 3 — Non-functional checks (Days 7–12)
- Session timeout and token refresh
- Push notification delivery for order fills
- Biometric fallback flows
- Localization and number formatting (crypto decimals matter)

### Layer 4 — Release readiness (Days 12–14)
- Full regression of blocker flows
- Production-like soak test with test accounts
- Rollback verification

---

## 3. What does QA look like inside a sprint?

| Phase | QA Activities |
|-------|---------------|
| **Ticket creation** | Review acceptance criteria for testability; flag missing edge cases (insufficient balance, partial fills, market closed). |
| **Development** | Write test charters; prepare test data; stub API tests against OpenAPI spec. |
| **Code complete** | Exploratory testing on branch builds; log defects with repro video + logs. |
| **Stabilization** | Re-test fixes; run smoke automation on CI artifact. |
| **Sprint review** | Demo tested flows; present known issues and risk acceptance. |
| **Regression** | Execute tiered suite: smoke (30 min) → core (2 hr) → full (overnight). |

QA is embedded **before** code merges for high-risk stories, not only at the end.

---

## 4. What does your ideal regression suite look like?

Tiered and fast-first:

### Tier 0 — Smoke (< 15 min, every build)
- App launches and authenticates
- Portfolio balance loads correctly
- Place limit order → appears in open orders
- Cancel order → balance restored
- Logout / session expiry

### Tier 1 — Core regression (< 2 hr, nightly)
- All order types supported in v1
- Deposit and withdrawal happy paths
- Error handling: insufficient funds, invalid pair, market halt
- Push notifications for fills
- Deep links and app resume

### Tier 2 — Full regression (weekly / pre-release)
- Cross-device/OS matrix
- Localization and accessibility
- Performance benchmarks (screen load < 2s on 4G)
- Security: cert pinning, jailbreak/root detection if required

### Tier 3 — Production synthetic monitoring
- Scheduled canary transactions on test accounts
- Balance reconciliation alerts

Automation ratio target: **70% API**, **20% mobile E2E smoke**, **10% manual exploratory** for new features.

---

## 5. What would keep you up at night?

Specific to a **real-funds mobile trading app** two weeks from launch:

1. **Balance inconsistency** — UI balance ≠ ledger balance after partial fills or failed withdrawals.
2. **Race conditions** — double-tap buy, duplicate orders, or stale price execution.
3. **Withdrawal failures** — funds debited but blockchain/transfer not initiated.
4. **Auth/session bugs** — token refresh failure mid-trade leaving user in a broken state.
5. **Regulatory compliance gaps** — missing risk disclaimers, geo-restrictions, or audit trail.
6. **Production config drift** — staging passes but prod points to wrong API or feature flag.
7. **Crash on cold start** — first-time user onboarding is the highest-traffic, least-tested path.
8. **Insufficient observability** — no way to trace a user complaint to a specific order ID in logs.

I would **not** ship without: reconciliation checks, withdrawal dry-runs on staging with real pipeline config, and a documented rollback plan.

---

## Mapping to This Web Automation Project

The same principles apply to `trade.mb.io`:
- Test public, high-traffic paths first (markets, navigation, content)
- Externalize data for maintainability
- Separate smoke from deep regression
- Document assumptions and risks explicitly
- Design for extension when auth-gated flows are later in scope