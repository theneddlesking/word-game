export const seededRandom = (max: number, seed: number) => {
  let res: number = (seed * 9301 + 49297) % 233280;
  return (res / 233280) * max;
};

export default function deterministicShuffle<T>(array: Array<T>, seed: number) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(i + 1, seed));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
