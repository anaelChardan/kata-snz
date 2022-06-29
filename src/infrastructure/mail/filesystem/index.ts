import type {EmailClient, SendEmailResult} from '../../../utils';
import type {Random} from '../../random';
import type {Timer} from '../../time';
import {promises as fs} from 'fs';

type Dependencies = {
  timer: Timer;
  random: Random;
  writeFile: typeof fs['writeFile']
};

export function buildFileSystemEmailClient(dependencies: Dependencies): EmailClient {
  const {timer, random, writeFile} = dependencies;

  async function sendEmail(email: string, message: string): Promise<SendEmailResult> {
    await timer.sleep(random.number(150));

    try {
      await writeFile(`./artifacts/mail/${email}`, message);
    } catch (error) {
      return {
        outcome: 'failure',
        reason: 'technicalReason',
        error
      }
    }

    return {
      outcome: 'success'
    }
  }

  return {
    sendEmail,
  };
}
