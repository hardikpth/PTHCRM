# Schedule of Rates Audit — FY 2026–27

**Audit date:** 2026-07-28  
**Dataset:** `assets/js/sor.js`

## Result after corrections

- Categories: **34**
- Tests/services: **310**
- Individually priced tests/services: **257**
- Individually unpriced or package-included rows: **53**
- Vertically merged package rates: **3 packages at ₹4,000 each**
- Duplicate category IDs: **0**
- Duplicate test rows within a category: **0**
- Invalid or negative rates: **0**
- Numeric rate/display-rate mismatches: **0**
- Missing required fields: **0**

Run the repeatable validation with:

```powershell
npm.cmd run audit:sor
```

## Corrections made

1. Re-imported all 34 tables directly from `PTH_SOR_2026-27_Final_Complete.docx` instead of relying on the earlier generated data.
2. Repaired shifted columns in category 18, **AAC Blocks Lab**. The imported method, test description, and standard had been stored under the wrong fields.
3. Repaired shifted columns in category 22, **Chemical & Environmental Water Laboratory Testing**. Purpose, test description, and standard had been stored under the wrong fields.
4. Correctly interpreted vertically merged ₹4,000 cells as complete-package rates in categories 5, 8, and 12. Individual parameters are marked as included in the package rather than incorrectly priced or marked on request.
5. Restored `/ Point` billing units for the three priced field-density tests in category 33.
6. Normalized unspecified site quantities for categories 33 and 34 to **As per site scope**.
7. Recorded the approved tax basis: **all listed rates exclude GST**, and applicable GST is added extra.
8. Corrected objective text/OCR errors:
   - `Compete 3, 7 and 28 days` → `Complete 3, 7 and 28 days`
   - `R203` → `R2O3`
   - chemical symbol `CI` → `Cl` for chloride
   - clause marker `CI.10` → `Cl. 10`
   - `Sulphate (SO)` → `Sulphate (SO3)`
9. Added a reusable Word import utility and SOR audit command that checks counts, IDs, fields, rates, rate text, and exact duplicate rows.

## Items requiring the approved source document

The approved Word file is now present and was used as the data authority. The following still require management/technical confirmation because the Word file itself contains no further clarification:

- standard numbers and revision years that may be technically questionable;
- whether “On request” and “Rate on Demand” items should have minimum charges;
- sample quantities omitted by the source tables for AAC, water, geotechnical, and NDT entries.

The CRM now matches the supplied approved DOCX structurally. Commercial release should still receive final management approval, particularly for technical-standard references and demand-priced services.
