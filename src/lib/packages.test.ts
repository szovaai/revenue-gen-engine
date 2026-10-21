import { describe, expect, it } from "vitest";
import { PACKAGES } from "./packages";

describe("package pricing", () => {
  it("premium website is $997 CAD one-time", () => {
    expect(PACKAGES.website.amountCad).toBe(997);
    expect(PACKAGES.website.cadence).toBe("one-time");
  });
  it("website care is $49 CAD/month", () => {
    expect(PACKAGES.care.amountCad).toBe(49);
  });
  it("website + CRM starts at $99 CAD/month", () => {
    expect(PACKAGES.crm.amountCad).toBe(99);
  });
  it("white-glove starts at $1,497 CAD and is quoted, not sold online", () => {
    expect(PACKAGES.whiteGlove.amountCad).toBe(1497);
    expect(PACKAGES.whiteGlove.priceId).toBeNull();
  });
});
