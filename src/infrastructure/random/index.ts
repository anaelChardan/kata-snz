export interface Random {
  number: (variation: number) => number
}

export function buildRandom(): Random {
  function number(variation: number): number {
    return Math.random() * variation;
  }

  return {
    number
  }
}