import type {Logger} from '../../../utils';

export function buildConsoleLogger(): Logger {
  const log = (level: string, message: string) => {
    console.log(`[${level}]: ${message}`);
  };

  return {
    log,
  };
}
