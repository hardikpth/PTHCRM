# Marketing Department Workbook Import

Source: `Marketing Department Document (2).xlsx` supplied on 14 August 2026.

## Imported records

| CRM module | Records |
|---|---:|
| Clients | 761 |
| Enquiries | 353 |
| Follow-up history | 407 |
| Quotations | 492 |
| Tenders | 257 |

The import is a one-time, non-destructive browser migration. It merges into existing CRM data and does not replace records already entered by users.

## Source mapping

- `Party name with number` was mapped to Clients. GSTIN values embedded in party names were separated into the GST field.
- `Clintal Meeting` and `Clintal Meeting 2026` were mapped to Enquiries. Their dated activity/detail pairs were mapped to completed Follow-up records linked to the corresponding enquiry.
- `Quotation tracking System` was mapped to Quotations. Because the source register contains scope descriptions but no line prices, each quotation is marked as a historical, on-request line with a zero total instead of inventing a price.
- `Tender Allocation System`, `The Tender.com`, and `Copy of Tender Allocation Syste` were mapped to Tenders. Overlapping records were consolidated.

## Status interpretation

- Enquiry `Closed` → Won, `Cancle`/cancelled → Lost, `Open` → Review, otherwise New.
- Quotation `YES` → Won, `NO` → Lost, blank → Submitted.
- Historical tenders are marked Submitted because the source contains deadlines and allocation details but no reliable outcome field.

## Data-quality audit

- 81 duplicate tender rows were removed from overlapping sheets.
- 234 consolidated clients have no phone number in the source.
- 1 enquiry has no source date.
- 19 tenders have no source value.
- No quotations are missing a customer after normalization.

Blank source values remain blank. No contact details, dates, tender values, or quotation prices were inferred.

