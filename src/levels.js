async function loadFromFile(n) {
  let data = [];
  const fn = `/Levels/${n}.dat`;
  try {
    const response = await fetch(fn);
    if (!response.ok) throw new Error(`Failed to load file: ${fn}`);
    
    const d = await response.text();
    data = d.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    
    const lineLength = data[0].length;
    if (!data.every(line => line.length === lineLength)) {
      throw new Error("Inconsistent line lengths");
    }
  } catch (err) {
    console.error(err);
    data = [
      "11111111111111111111111111111111111111111",
      "1                                       1",
      "1   55555  5555   5555    555   5555    1",
      "1   5      5   5  5   5  5   5  5   5   1",
      "1   555    5555   5555   5   5  5555    1",
      "1   5      5  5   5  5   5   5  5  5    1",
      "1   55555  5   5  5   5   555   5   5  31",
      "1 2                                     1",
      "11111111111111111111111111111111111111111"
    ];
  }
  return data;
}

async function getLevel(n) {
  let data = [];

  if ((n >= 200 && n <= 219) || (n >= 700 && n <= 717) || (n >= 750 && n <= 760) || (n >= 990 && n <= 990)) {
    data = await loadFromFile(n);
  } else {
    data = await loadFromFile(1000);
  }
  return data;
}

export { getLevel };
