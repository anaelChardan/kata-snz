export interface Timer {
  sleep: (ms: number) => Promise<void>
}


export function buildTimer(): Timer {
  async function sleep(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  return {
    sleep
  }
}