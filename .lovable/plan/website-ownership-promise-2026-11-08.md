# Website Ownership Promise

## What you'll see
1. **Homepage — new "Why Choose ClickAdMedia?" section**, placed right below the main website offer. Headline "Your Website. Your Business. Your Ownership.", the short promise paragraph, and three cards:
   - 100% Website Ownership — your completed website belongs to you after payment.
   - Fully Managed Website Care — we handle hosting, maintenance, and minor updates.
   - No Vendor Lock-In — you're free to move your website whenever you choose.
   Small print: "Subject to any disclosed third-party licensing terms." Button: "Get my free website preview".
2. **"Website Ownership Guaranteed" badge** repeated as a recurring message: under the homepage hero buttons, on the Pricing page website card, and on the Website Design service page.
3. **"You Own It. We Manage It."** short block on the Pricing page and About page.
4. **Terms page — new "Website Ownership & Transfer" section**: ownership transfers once paid in full; third-party items (themes, fonts, stock photos, plugins, software subscriptions) stay under their own licenses; on cancellation we provide the website's source files on request so you can move hosts. Seller remains Jason R Szova Consulting.

## Notes
- No prices added; matches the existing dark navy style.
- The Terms wording is a starting point — please have your client agreement reviewed so it matches.

## Technical details
- Edit `src/routes/index.tsx` (new section after the package section ~line 110, badge in hero), `src/routes/pricing.tsx`, `src/routes/about.tsx`, `src/routes/services.website-design.tsx`, `src/routes/terms.tsx`.
- Optional small shared `OwnershipBadge` component in `src/components/cam/`.
