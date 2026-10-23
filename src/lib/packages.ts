// Website projects are quoted individually. Monthly plan IDs match Stripe lookup keys.
export const PACKAGES = {
  website: {
    name: "Premium Trade Website",
    priceId: null,
    amountCad: null,
    priceLabel: "Custom quote",
    cadence: "quoted",
  },
  care: {
    name: "Website Care",
    priceId: "website_care_monthly",
    amountCad: 49,
    priceLabel: "$49 CAD/month",
    cadence: "monthly",
  },
  crm: {
    name: "Website + CRM",
    priceId: "website_crm_monthly",
    amountCad: 99,
    priceLabel: "from $99 CAD/month",
    cadence: "monthly",
  },
  whiteGlove: {
    name: "White-Glove Digital Setup",
    priceId: null,
    amountCad: null,
    priceLabel: "Custom quote",
    cadence: "quoted",
  },
} as const;

export const INQUIRY_PACKAGE_OPTIONS = [
  "Premium Trade Website",
  "Website + CRM",
  "White-Glove Digital Setup",
  "Website Care",
  "Custom Project",
] as const;

export const PRICE_LABELS: Record<string, string> = {
  premium_website_onetime: "Premium Trade Website",
  website_care_monthly: "Website Care ($49 CAD/mo)",
  website_crm_monthly: "Website + CRM ($99 CAD/mo)",
  // legacy plans
  starter_onetime: "Website Build (legacy)",
  growth_monthly: "Growth Plan (legacy)",
  dominate_monthly: "Dominate Plan (legacy)",
};
