import type {EmailClient, Logger, SendEmailResult} from '../../../utils';
import type {Random} from '../../random';
import type {Timer} from '../../time';

type Dependencies = {
  timer: Timer;
  random: Random;
  logger: Logger;
};

export function buildInMemoryEmailClient(dependencies: Dependencies): EmailClient {
  const {timer, random, logger} = dependencies;

  async function sendEmail(email: string, message: string): Promise<SendEmailResult> {
    await timer.sleep(random.number(150));

    if (email === 'julien.sanchez@akeneo.com') {
      return {
        outcome: 'failure',
        reason: 'technicalReason',
        error: 'email does not exists'
      }
    }

    logger.log('info', `Sending ${message} to ${email}`);

    return {
      outcome: 'success'
    }
  }

  return {
    sendEmail,
  };
}
