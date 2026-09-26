// diff.js：对称差（基线：一律给空表）
import { buildSet } from "./sets.js";

export function symmetricDiff(left, right) {
  const leftSet = buildSet(left);
  const rightSet = buildSet(right);

  let both = 0;
  const symmetric = [];
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

  return {
    symmetric: symmetric,
    count: symmetric.length,
    both: both,
    union: leftSet.size + rightSet.size - both
  };
}
