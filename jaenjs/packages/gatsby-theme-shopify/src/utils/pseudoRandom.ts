var modulus = 2 ** 32
var a = 1664525
var c = 1013904223

export const getPseudoRandom = (seed: number) => {
  const nseed = (a * seed + c) % modulus

  return nseed / modulus
}
