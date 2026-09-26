// sets.js：建集合（键去首尾空白；空键或组内重复报 E_BAD_KEY）
export function badKeyError(message) {
  const error = new Error(message);
  error.code = "E_BAD_KEY";
  return error;
}

export function buildSet(keys) {
  const set = new Set();
  for (const raw of keys) {
    const key = String(raw).trim();
    if (key === "") {
      throw badKeyError("empty key after trim");
    }
    if (set.has(key)) {
      throw badKeyError("duplicate key: " + key);
    }
    set.add(key);
  }
  return set;
}
