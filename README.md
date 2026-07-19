# MultiBank QA Automation Framework

Playwright + TypeScript UI automation framework for [trade.mb.io](https://trade.mb.io/) and the public [mb.io](https://mb.io) marketing site, built for the MultiBank QA Automation Coding Challenge.

## Quick Start

```bash
npm install
npx playwright install
npx playwright test
```

View the HTML report after a run:

```bash
npx playwright show-report
```

## Project Structure

```
src/
  data/            # Parameterized test data (JSON)
  fixtures/        # Custom Playwright fixtures
  pages/           # Page Object Model (POM)
  models/          # Section Models
tests/
  navigation/      # Top nav visibility and routing
  company/         # Marketing and Why multibank
  home/            # Home page trading sections
docs/              # QA strategy
```

## Design Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| Framework | Playwright + TypeScript | Strong auto-waiting, multi-browser support, first-class CI |
| Pattern | Page Object Model + fixtures | Separation of concerns; tests stay readable |
| Test data | Externalized JSON | Easy to extend without touching test logic |
| Scope | `trade.mb.io` + `mb.io` | Root trade URL requires login; public flows span both domains |
| Assertions | Role/text-based locators | Resilient to CSS churn; aligns with accessibility tree |
| Retries | 1 local / 2 in CI | Handles transient network or market data latency |

## Assumptions

1. **`trade.mb.io/` redirects to login** — public automation starts at `/en-AE`.
2. **Spot trading** is validated on the Home page with category tabs (All, Top Gainers, Top Losers, Top Volume, Favorites).
3. **Marketing content** (hero banners, app store links) lives on `mb.io/en-AE`.
4. **About Us > Why MultiBank** maps to `mb.io/en-AE/company` ("Why MultiBank Group?").
5. **No login or financial actions** are performed per assignment rules.
6. **Live market prices** are dynamic; tests assert structure and presence, not exact values.

## Test Commands

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run full suite (Chromium, Firefox, WebKit, mobile) |
| `npx playwright test --project=chromium` | Chromium only |
| `npx playwright test --debug` | Headed mode for debugging |
| `npx playwright test --ui` | Starts the interactive UI mode |
| `npx playwright test example` | Runs the tests in a specific file |

## Deliverables

- [QA Strategy (Task 2)](docs/QA_STRATEGY.md)
- Sample report: run `npx playwright test` then run `npx playwright show-report`
- Cross-browser evidence: CI matrix runs Chromium, Firefox, and WebKit

## Framework Extension Guide

1. Add page objects under `src/pages/`.
2. Add JSON data under `src/data/`.
3. Register fixtures in `src/fixtures/test-fixtures.ts`.
4. Create spec files under `tests/<domain>/`.
5. Tag critical paths with `@smoke` for fast regression.
