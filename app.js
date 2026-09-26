// app.js：渲染结果
import { buildSet } from "./sets.js";
import { symmetricDiff } from "./diff.js";

export function render(spec) {
  const left = spec.left || [];
  const right = spec.right || [];
  const sets = [buildSet(left), buildSet(right)];
  const view = symmetricDiff(left, right);
  const symmetric = view.symmetric || [];
  return { symmetric: symmetric, count: symmetric.length, both: view.both || 0,
           union: view.union || 0, left_size: sets[0].size, right_size: sets[1].size,
           left_count: left.length };
}
