export function booleanToString(value) {
  return value ? "1": "0";
}

// eslint-disable-next-line no-unused-vars
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function minMax(value, min, max) {
  let result = value;
  if (max >= min) {
    if (result < min) {
      result = min;
    }
    if (result > max) {
      result = max;
    }
  }
  return result;
}

export function polar(x, y, angle, dist) {
  let result = { x: x, y: y };
  result.x = dist * Math.cos((angle / 180) * Math.PI) + x;
  result.y = dist * Math.sin((angle / 180) * Math.PI) + y;
  return result;
}

export function randomiseArray(arr) {
  let result = [];
  let used = [];

  while (result.length < arr.length) {
    let n = Math.trunc(Math.random() * arr.length);
    if (!used.includes(n)) {
      used.push(n);
      let item = arr[n];
      result.push(item);
    }
  }
  return result;
}

export function randomInt(min, max) {
  if (typeof min !== "number" || typeof max !== "number") {
    return null;
  }
  if (max < min) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}

export function stringToBoolean(value) {
  return value === "1" ? true: false;
}

export function tryParseInt(str, defaultValue) {
  let result = defaultValue;
  if (str !== null) {
    if (typeof str === "string") {
      str = str.trim();
      if (str.length > 0) {
        result = parseInt(str);
        if (isNaN(result)) {
          result = defaultValue;
        }
      }
    }
  }
  return result;
}


