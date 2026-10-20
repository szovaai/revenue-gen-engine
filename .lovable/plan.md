# Add "AI Receptionist" Service

## What gets built

1. **New page: /services/ai-receptionist**
   - Headline: "Stop Losing Jobs Because You Missed a Call."
   - The sales pitch you gave, word for word.
   - Price card: $299 CAD one-time setup + $199 CAD/month.
   - "What's included" list (all 8 items you gave).
   - "Who it's for": plumbers, electricians, HVAC, renovation companies, other home service businesses.
   - Small note: "AI software subscription and usage fees are billed separately by the provider."
   - Two buttons: "Get Started" (online checkout) and "Book a Call" (your Cal.com page).
   - Same dark navy / electric blue look as the rest of the site.

2. **Linked from the rest of the site**
   - New card on the Services page.
   - New link in the Services menu and the footer.
   - New row/section on the Pricing page.
   - Added to the sitemap and AI-search summary file.

3. **Online checkout (Stripe)**
   - New product "AI Receptionist" with two prices in CAD: $299 one-time setup and $199/month.
   - One checkout charges the $299 setup today and starts the $199/month subscription.
   - After paying: same thank-you page, your owner email and the customer welcome email, and it shows on the customer's dashboard with the Manage Billing button.

## Assumptions (tell me if any are wrong)
- The customer pays the AI software provider directly (your recommendation), so no usage fees are charged by us.
- Prices shown in CAD on this page only; your website packages stay as they are.
- The $997 website offer stays the main offer on the homepage; the AI receptionist is an add-on service, not on the homepage hero. A short teaser section can be added to the homepage if you want.

## Technical details
- Route `src/routes/services.ai-receptionist.tsx` with its own head() metadata.
- Stripe: `payments--create_product` (ai_receptionist, price `ai_receptionist_monthly`, 19900 CAD, month, qty 1) + `payments--create_price` (`ai_receptionist_setup`, 29900 CAD one-time).
- Extend `createCheckoutSession` to accept an optional `setupPriceId`, added as a second line item in subscription mode.
- Existing webhook already records subscriptions; verify it handles the extra line item and the email template names the plan.
- Update services index, CamLayout nav/footer, pricing page, sitemap, llms.txt.
