// diff.js：对称差（只在一边出现的键，去重后按字典序排列）
import { buildSet } from "./sets.js";

export function symmetricDiff(left, right) {
  const leftSet = buildSet(left);
  const rightSet = buildSet(right);
  const symmetric = [];
  let both = 0;
  for (const key of leftSet) {
    if (rightSet.has(key)) {
      both += 1;
    } else {
      symmetric.push(key);
    }
  }
  for (const key of rightSet) {
    if (!leftSet.has(key)) {
      symmetric.push(key);
    }
  }
  symmetric.sort();
  const union = leftSet.size + rightSet.size - both;
  return { symmetric: symmetric, both: both, union: union };
}
