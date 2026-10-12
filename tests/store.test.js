import test from "node:test";
import assert from "node:assert/strict";
import { products, cartTotals } from "../src/products.js";
import { createAccount, signIn } from "../src/accounts.js";
test("catalogue IDs are unique", () =>
  assert.equal(
    new Set(products.map((product) => product.id)).size,
    products.length,
  ));
test("cart calculates quantity and shipping correctly", () => {
  assert.deepEqual(cartTotals([{ id: "ceramic-mug", quantity: 2 }]), {
    subtotal: 3600,
    shipping: 250,
    total: 3850,
  });
  assert.equal(
    cartTotals([{ id: "wireless-headphones", quantity: 1 }]).shipping,
    0,
  );
  assert.equal(cartTotals([]).total, 0);
});
test("demo signup and login hash passwords and reject incorrect credentials", async () => {
  const data = new Map();
  globalThis.localStorage = {
    getItem: (key) => data.get(key) || null,
    setItem: (key, value) => data.set(key, value),
  };
  const profile = await createAccount("Test", "test@example.com", "sample123");
  assert.equal(profile.name, "Test");
  assert.equal(
    (await signIn("TEST@example.com", "sample123")).email,
    "test@example.com",
  );
  await assert.rejects(signIn("test@example.com", "wrong"));
  await assert.rejects(createAccount("Test", "test@example.com", "sample123"));
  assert.equal(data.get("my-store-accounts").includes("sample123"), false);
});
