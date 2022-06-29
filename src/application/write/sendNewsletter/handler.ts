import type {NewsletterRepository} from '../../../domain/newsletter';
import type {UserRepository} from '../../../domain/user';
import type {Logger} from '../../../utils';
import type {EmailClient} from '../../../utils/mailer';
import {formatMessage} from './formatMessage';
import type {SendNewsletter, SendNewsletterHandler, SendNewsletterHandlerResult} from './types';

type Dependencies = {
  userRepository: UserRepository;
  newsletterRepository: NewsletterRepository;
  emailClient: EmailClient;
  logger: Logger;
};

export function buildSendNewsletterHandler(dependencies: Dependencies): SendNewsletterHandler {
  const {userRepository, newsletterRepository, emailClient, logger} = dependencies;
  async function handle(command: SendNewsletter): Promise<SendNewsletterHandlerResult> {
    const {username, newsletterId} = command;

    const user = await userRepository.findOneByUsername(username);

    if (undefined === user) {
      logger.log('error', `User with username ${username} not found`);

      return {
        outcome: 'failure',
        reason: 'missingUser',
      };
    }

    const newsletter = await newsletterRepository.findOneById(newsletterId);

    if (undefined === newsletter) {
      logger.log('error', `Newsletter with id ${newsletterId} not found`);

      return {
        outcome: 'failure',
        reason: 'missingNewsletter',
      };
    }

    const messageBody = formatMessage(newsletter.parameters, user, newsletter.template);

    const result = await emailClient.sendEmail(user.email, messageBody);

    if (result.outcome === 'failure') {
      return {
        outcome: 'failure',
        reason: 'cannotSendMail',
        error: result.error,
      };
    }

    return {outcome: 'success'};
  }

  return {
    handle,
  };
}
