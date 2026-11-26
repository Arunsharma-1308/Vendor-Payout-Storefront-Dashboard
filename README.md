# Vendor Payout & Storefront Dashboard

GLA University | Mini Project 1 | Batch 2024-2028 | Section AG | 5th Semester
Faculty Mentor: Satyam Kumar Jha

A browser-only simulation of a multi-vendor seller panel built with plain HTML5, CSS3 and vanilla JavaScript. It has a Storefront, an Inventory manager and a Payout Ledger that reconciles every order against a payout with an animated running balance. No backend, no framework, no API.

## How to run
Download or clone the repository and double-click `index.html`. It opens in Chrome, Edge or Firefox and works offline.

## Folder structure and owners
| File | Purpose | Owner |
| --- | --- | --- |
| `index.html` | Page structure: header, tabs, Overview, Storefront, Inventory and Ledger sections | Arun Sharma |
| `css/style.css` | Layout, colours, typography, light/dark theme, animations | Atul Singh |
| `js/data.js` | Helpers, global state, seeded mock-data generator, localStorage | Aryan Goswami |
| `js/charts.js` | SVG bar and line charts | Aryan Goswami |
| `js/reconcile.js` | Reconciliation engine, animated ledger, balance counter | Aryan Shukla |
| `js/app.js` | Storefront, Inventory and Overview views, events, start-up | Arun Sharma |
| `README.md` | Documentation, testing and demo | Ayush Pathak |

## Reconciliation rules
- Expected payout = order amount minus an 8% marketplace fee.
- Payout within Rs 1 of expected: Matched.
- Payout exists but the amount differs: Mismatch.
- No payout yet: Pending (does not change the balance).
- Running balance = cumulative sum of payouts received.

## Demo flow
1. Overview: summary figures and charts.
2. Storefront: product cards and stock badges.
3. Inventory: add, edit, change stock, remove; check Storefront updates.
4. Refresh the page: data is kept (localStorage).
5. Payout Ledger: watch rows reconcile and the balance count up; try Replay and New dataset.
6. Theme button: light and dark mode.

## Test cases
| No. | Test | Expected result |
| --- | --- | --- |
| 1 | First load | 12 products and 26 orders appear |
| 2 | Add a valid product | Shows in Inventory and Storefront |
| 3 | Add with empty name or price 0 | Error message, nothing added |
| 4 | Stock set to 0 | Out of stock badge |
| 5 | Stock below 10 | Low stock badge |
| 6 | Remove a product | Removed from both views |
| 7 | Refresh the page | Inventory changes are kept |
| 8 | Open the ledger | Rows animate; final balance equals sum of received payouts |
| 9 | Order without payout | Pending, balance unchanged |
| 10 | Payout differs from expected | Mismatch |
| 11 | New dataset | New data generated and ledger replays |
| 12 | Phone-width screen | Layout adapts; tables scroll inside their box |

## Limitations
Data is simulated; reconciliation is a simplified model without tax, refunds or currency rules; storage is localStorage on one device; one vendor per session.

## Future scope
Multiple vendor accounts, partial payouts and refunds, configurable payout cycles, notifications, PDF/CSV export, optional real backend.
