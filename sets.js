// sets.js：建集合（去首尾空白；空键或组内重复一律报 E_BAD_KEY）
export function buildSet(keys) {
  const set = new Set();
  for (const raw of keys) {
    const key = String(raw).trim();
    if (key === "") {
      throw badKey("键去空白后为空");
    }
    if (set.has(key)) {
      throw badKey("组内重复键：" + key);
    }
    set.add(key);
  }
  return set;
}

function badKey(message) {
  const error = new Error(message);
  error.code = "E_BAD_KEY";
  return error;
}
