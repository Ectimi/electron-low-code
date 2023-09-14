export function roundToNearest(value: number) {
  const roundingUnits = [1, 100, 1000, 10000];

  const sign = Math.sign(value);
  const absValue = Math.abs(value);

  let roundedValue = absValue;
  let roundingIndex = 0;

  while (roundedValue % roundingUnits[roundingIndex + 1] !== 0) {
    roundedValue +=
      roundingUnits[roundingIndex + 1] -
      (roundedValue % roundingUnits[roundingIndex + 1]);
    roundingIndex++;
  }

  roundedValue *= sign;

  return roundedValue;
}
