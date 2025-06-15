import { moveElevators } from "./elevators.js";

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

}

test();
