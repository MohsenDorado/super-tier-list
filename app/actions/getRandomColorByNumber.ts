export default function getRandomColorByNumber(seed: number): string {
    // Seed the random number generator with the provided number
    const rng = (seed: number) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Generate random values for R, G, and B
    const r = Math.floor(rng(seed) * 256);
    const g = Math.floor(rng(seed * 2) * 256);
    const b = Math.floor(rng(seed * 3) * 256);

    // Convert the values to a hexadecimal color string
    const color = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;

    return color;
  }