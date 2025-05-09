import {
  stringArrayToNumberArray,
  checkFalling,
  moveLeft,
  moveRight,
  jump,
  jumpLeft,
  jumpRight,
  getGameInfo,
  checkRed,
  moveElevators,
  moveHorizontalElevators,
  zeroArray,
} from "./balUtils.js";

function checkResult(testName, expected, result) {
  if (result !== expected) {
    console.log(`*** ${testName} failed!!! ***`);
    console.log(`Expected : ${expected}`);
    console.log(`Result   : ${result}`);
  }
}

function test() {
  // ***** MOVE ELEVATORS *****

  let input11a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 6, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 0, 1],
    [1, 0, 0, 106, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput11a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 6, 1],
    [1, 0, 0, 106, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let info11a = moveElevators(
    input11a,
    [
      { x: 6, y: 2, up: false },
      { x: 3, y: 5, up: true },
    ],
    []
  );
  checkResult(
    "moveElevators A",
    JSON.stringify(expectedOutput11a),
    JSON.stringify(input11a)
  );
  checkResult(
    "moveElevators A player",
    JSON.stringify({ playerX: 3, playerY: 2 }),
    JSON.stringify(info11a)
  );

  let input12c = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 8, 0, 0, 0, 4, 0, 1],
    [1, 107, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 5, 2, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 7, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 107, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput12c = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 8, 0, 0, 4, 0, 1],
    [1, 0, 107, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 5, 2, 0, 1],
    [1, 0, 0, 0, 4, 0, 0, 1],
    [1, 0, 0, 0, 7, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 7, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let elevatorsInput12c = [
    { x: 1, y: 3, right: true },
    { x: 5, y: 6, right: false },
    { x: 6, y: 8, right: true },
  ];
  let elevatorsExpected12c = [
    { x: 2, y: 3, right: true },
    { x: 4, y: 6, right: false },
    { x: 6, y: 8, right: false },
  ];
  let redInput12c = [{ x: 1, y: 2 }];
  let info12c = moveHorizontalElevators(
    input12c,
    elevatorsInput12c,
    redInput12c
  );

  checkResult(
    "moveHorizontalElevators C red",
    JSON.stringify([{ x: 2, y: 2 }]),
    JSON.stringify(redInput12c)
  );

  checkResult(
    "zeroArray",
    JSON.stringify([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]),
    JSON.stringify(zeroArray(3, 4))
  );
}

test();
