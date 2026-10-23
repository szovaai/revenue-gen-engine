import { test } from "node:test";
import assert from "node:assert/strict";
import { PACKAGES } from "./packages";

test("website project prices vary by scope rather than a fixed checkout price", () => {
  assert.equal(PACKAGES.website.amountCad, null);
  assert.equal(PACKAGES.website.priceId, null);
  assert.equal(PACKAGES.website.cadence, "quoted");
});

test("complete digital setup is quoted individually", () => {
  assert.equal(PACKAGES.whiteGlove.amountCad, null);
  assert.equal(PACKAGES.whiteGlove.priceId, null);
  assert.equal(PACKAGES.whiteGlove.cadence, "quoted");
});