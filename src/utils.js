export function booleanToInt(value) {
  return value ? 1: 0;
}

export function booleanToString(value) {
  return value ? "1": "0";
}

// eslint-disable-next-line no-unused-vars
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function copy2dArray(arr) {
  return arr.map(row => [...row]);
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

export function reverseString(s) {
  let result = "";
  for (let i = 0; i < s.length; i++) {
    result = s[i] + result;
  }
  return result;
}

/**
 * Rotate an array of points around a base point by an angle (degrees).
 * @param {Array<{x:number,y:number}>} points - array of points to rotate
 * @param {{x:number,y:number}} basePoint - center of rotation
 * @param {number} angle - degrees (can be negative; values outside [-360,360] are supported)
 * @returns {Array<{x:number,y:number}>} new array with rotated points
 */
export function rotatePoints(points, basePoint, angle) {
  if (!Array.isArray(points)) throw new TypeError('points must be an array');
  if (typeof basePoint !== 'object' || basePoint === null
      || typeof basePoint.x !== 'number' || typeof basePoint.y !== 'number') {
    throw new TypeError('basePoint must be an object with numeric x and y');
  }
  if (typeof angle !== 'number' || !isFinite(angle)) {
    throw new TypeError('angle must be a finite number (degrees)');
  }

  const rad = angle * Math.PI / 180;       // degrees -> radians
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return points.map(p => {
    if (typeof p !== 'object' || p === null || typeof p.x !== 'number' || typeof p.y !== 'number') {
      throw new TypeError('each point must be an object with numeric x and y');
    }
    const dx = p.x - basePoint.x;
    const dy = p.y - basePoint.y;
    const rx = cos * dx - sin * dy + basePoint.x;
    const ry = sin * dx + cos * dy + basePoint.y;
    return { x: rx, y: ry };
  });
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


