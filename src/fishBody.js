import { quadControlFromChordPosition, quadControlFromMid } from "./graphicUtils.js";

/**
 * Build the four main body curves using midpoint-perpendicular quadratic bending.
 * This replaces the old frontCurve / rearCurve system completely.
 *
 * Curve order matches the legacy system so existing fins keep working.
 */
export function buildBodyCurves(geom, options = {}) {
  const {
    midX,
    bodyLeft,
    bodyRight,
    headRight,
    headTopY,
    headBottomY,
    top,
    bottom,
    yc,
    connectionHeight,
    isTang
  } = geom;
  const topFrontBodyCpPos = options.topFrontBodyCpPos ?? 0.5;
  const topFrontBodyCpDist = options.topFrontBodyCpDist ?? 0;
  const topRearBodyCpPos = options.topRearBodyCpPos ?? 0.5;
  const topRearBodyCpDist = options.topRearBodyCpDist ?? 0;
  const bottomFrontBodyCpPos = options.bottomFrontBodyCpPos ?? 0.5;
  const bottomFrontBodyCpDist = options.bottomFrontBodyCpDist ?? 0;
  const bottomRearBodyCpPos = options.bottomRearBodyCpPos ?? 0.5;
  const bottomRearBodyCpDist = options.bottomRearBodyCpDist ?? 0;

  // -------- FRONT ENDPOINTS (depend on isTang) --------
  const frontTopEnd = isTang
    ? { x: headRight, y: headTopY }
    : { x: bodyRight, y: yc };

  const frontBottomEnd = isTang
    ? { x: headRight, y: headBottomY }
    : { x: bodyRight, y: yc };

  // -------- topFront (front → mid top) --------
  const topFrontP0 = frontTopEnd;
  const topFrontP2 = { x: midX, y: top };
  const topFrontP1 = quadControlFromChordPosition(
    topFrontP0,
    topFrontP2,
    topFrontBodyCpDist,
    +1,
    topFrontBodyCpPos,
    true
  );

  // -------- topRear (mid top → tail) --------
  const topRearP0 = { x: midX, y: top };
  const topRearP2 = { x: bodyLeft, y: yc - connectionHeight / 2 };
  const topRearP1 = quadControlFromChordPosition(
    topRearP0,
    topRearP2,
    topRearBodyCpDist,
    +1,
    topRearBodyCpPos,
    true
  );

  // -------- bottomRear (tail → mid bottom) --------
  const bottomRearP0 = { x: bodyLeft, y: yc + connectionHeight / 2 };
  const bottomRearP2 = { x: midX, y: bottom };
  const bottomRearP1 = quadControlFromChordPosition(
    bottomRearP0,
    bottomRearP2,
    bottomRearBodyCpDist,
    +1,
    bottomRearBodyCpPos,
    false
  );

  // -------- bottomFront (mid bottom → front) --------
  const bottomFrontP0 = { x: midX, y: bottom };
  const bottomFrontP2 = frontBottomEnd;
  const bottomFrontP1 = quadControlFromChordPosition(
    bottomFrontP0,
    bottomFrontP2,
    bottomFrontBodyCpDist,
    +1,
    bottomFrontBodyCpPos,
    false
  );

  return {
    topFront: {
      p0: topFrontP0,
      p1: topFrontP1,
      p2: topFrontP2
    },
    topRear: {
      p0: topRearP0,
      p1: topRearP1,
      p2: topRearP2
    },
    bottomRear: {
      p0: bottomRearP0,
      p1: bottomRearP1,
      p2: bottomRearP2
    },
    bottomFront: {
      p0: bottomFrontP0,
      p1: bottomFrontP1,
      p2: bottomFrontP2
    }
  };
}



export function buildBodyPath(
  ctx,
  bodyLeft,
  bodyRight,
  top,
  bottom,
  connectionHeight,
  yc,
  {
    isTang = false,
    noseLength = (bodyRight - bodyLeft) * 0.18,
    noseTipYOffset = (bottom - top) * 0.15,
    headTopYOffset = (bottom - top) * 0.06,
    headBottomYOffset = (bottom - top) * 0.08,
    noseCurvature = 0.10,
    topFrontBodyCpPos = 0.5,
    topFrontBodyCpDist = 0.08,
    topRearBodyCpPos = 0.5,
    topRearBodyCpDist = 0.08,
    bottomFrontBodyCpPos = 0.5,
    bottomFrontBodyCpDist = 0.08,
    bottomRearBodyCpPos = 0.5,
    bottomRearBodyCpDist = 0.08,
  } = {}
) {
  const headRight = isTang ? bodyRight - noseLength : bodyRight;
  const midX = (bodyLeft + headRight) / 2;

  const headTopY = isTang ? top + headTopYOffset : yc;
  const headBottomY = isTang ? bottom - headBottomYOffset : yc;

  const noseTip = {
    x: bodyRight,
    y: isTang ? yc + noseTipYOffset : yc
  };

  ctx.beginPath();

  // -------- Nose curves --------
  const topNoseCtrl = quadControlFromMid(noseTip, { x: headRight, y: headTopY }, noseCurvature, -1);
  const bottomNoseCtrl = quadControlFromMid({ x: headRight, y: headBottomY }, noseTip, noseCurvature, -1);

  // -------- Front body curves (mid → headRight) --------
  const topFrontCtrl = quadControlFromChordPosition({ x: midX, y: top }, { x: headRight, y: headTopY }, topFrontBodyCpDist, -1, topFrontBodyCpPos, false);
  const bottomFrontCtrl = quadControlFromChordPosition({ x: midX, y: bottom }, { x: headRight, y: headBottomY }, bottomFrontBodyCpDist, +1, bottomFrontBodyCpPos, false);

  // -------- Rear curves (mid → bodyLeft) --------
  const topRearCtrl = quadControlFromChordPosition({ x: midX, y: top }, { x: bodyLeft, y: yc - connectionHeight / 2 }, topRearBodyCpDist, +1, topRearBodyCpPos, true);
  const bottomRearCtrl = quadControlFromChordPosition({ x: bodyLeft, y: yc + connectionHeight / 2 }, { x: midX, y: bottom }, bottomRearBodyCpDist, +1, bottomRearBodyCpPos, false);

  // -------- draw path --------
  ctx.moveTo(noseTip.x, noseTip.y);

  // top side
  ctx.quadraticCurveTo(topNoseCtrl.x, topNoseCtrl.y, headRight, headTopY);
  ctx.quadraticCurveTo(topFrontCtrl.x, topFrontCtrl.y, midX, top);
  ctx.quadraticCurveTo(topRearCtrl.x, topRearCtrl.y, bodyLeft, yc - connectionHeight / 2);

  // bottom side
  ctx.lineTo(bodyLeft, yc + connectionHeight / 2);
  ctx.quadraticCurveTo(bottomRearCtrl.x, bottomRearCtrl.y, midX, bottom);
  ctx.quadraticCurveTo(bottomFrontCtrl.x, bottomFrontCtrl.y, headRight, headBottomY);
  ctx.quadraticCurveTo(bottomNoseCtrl.x, bottomNoseCtrl.y, noseTip.x, noseTip.y);

  ctx.closePath();

  return { midX, headRight, headTopY, headBottomY };
}

function quadBezierPoint(p0, p1, p2, t) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y
  };
}

function quadBezierTangent(p0, p1, p2, t) {
  return {
    x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
    y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y)
  };
}

function normalize(v) {
  const len = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / len, y: v.y / len };
}

export function getBodyBottomFrame(bodyCurves, t) {
  let curve, lt;

  if (t < 0.5) {
    curve = bodyCurves.bottomRear;
    lt = t * 2;
  } else {
    curve = bodyCurves.bottomFront;
    lt = (t - 0.5) * 2;
  }

  const p = quadBezierPoint(curve.p0, curve.p1, curve.p2, lt);
  const tan = normalize(
    quadBezierTangent(curve.p0, curve.p1, curve.p2, lt)
  );

  const normal = { x: -tan.y, y: tan.x };

  return { p, tan, normal };
}

export function getBodyTopFrame(bodyCurves, t) {
  let curve, lt;

  if (t < 0.5) {
    curve = bodyCurves.topFront;
    lt = t * 2;
  } else {
    curve = bodyCurves.topRear;
    lt = (t - 0.5) * 2;
  }

  const p = quadBezierPoint(curve.p0, curve.p1, curve.p2, lt);
  const tan = normalize(
    quadBezierTangent(curve.p0, curve.p1, curve.p2, lt)
  );

  const normal = { x: -tan.y, y: tan.x };

  return { p, tan, normal };
}

export function fillUpperBody(ctx, bodyLeft, bodyRight, bodyTop, bodyBottom, yc, connectionHeight, colors, bodyOptions) {
  const bodyHeight = bodyBottom - bodyTop;
  const overlap = bodyHeight * 0.1;

  if (colors.upperBody === null) {
    return;
  }

  ctx.save();
  // Clip to body shape
  buildBodyPath(ctx, bodyLeft, bodyRight, bodyTop, bodyBottom, connectionHeight, yc, bodyOptions);
  ctx.clip();

  ctx.lineWidth = 1;
  ctx.strokeStyle = colors.upperBody;
  ctx.fillStyle = colors.upperBody;
  ctx.beginPath();
  ctx.moveTo(bodyLeft - overlap, bodyTop - overlap);
  ctx.lineTo(bodyRight + overlap, bodyTop - overlap);
  ctx.lineTo(bodyRight + overlap, yc);
  ctx.lineTo(bodyLeft - overlap, yc);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

