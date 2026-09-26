import assert from "node:assert";
import { buildSet } from "../sets.js";
import { symmetricDiff } from "../diff.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("buildSet returns a set", () => {
  assert.ok(buildSet(["a"]) instanceof Set);
});

check("symmetricDiff returns a list", () => {
  assert.ok(Array.isArray(symmetricDiff(["a"], ["b"]).symmetric));
});

check("symmetricDiff returns numbers", () => {
  assert.strictEqual(typeof symmetricDiff(["a"], ["b"]).both, "number");
});

check("render counts symmetric", () => {
  assert.strictEqual(typeof render({ left: ["a"], right: ["b"] }).count, "number");
});

check("render exposes sizes", () => {
  assert.strictEqual(typeof render({ left: ["a"], right: ["b"] }).left_size, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
