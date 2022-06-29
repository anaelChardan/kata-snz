import {buildInMemoryNewsletterRepository} from '../../../../infrastructure/database/newsletter/inMemory';
import {buildInMemoryUserRepository} from '../../../../infrastructure/database/user/inMemory';
import {buildInMemoryEmailClient} from '../../../../infrastructure/mail/inMemory';
import {buildSendNewsletterHandler} from '../handler';

describe('sendNewsletterHandler', () => {
  const timer = {sleep: async () => {}};
  const random = {number: () => 0};

  const userRepository = buildInMemoryUserRepository({timer, random});
  const newsletterRepository = buildInMemoryNewsletterRepository({timer, random});
  const logger = {log: () => {}};
  const emailClient = buildInMemoryEmailClient({timer, random, logger});
  const handler = buildSendNewsletterHandler({logger, userRepository, emailClient, newsletterRepository});

  describe('given an existing user, newsletter, email', () => {
    it('returns a success result', async () => {
      const expected = {
        outcome: 'success',
      };

      const result = await handler.handle({username: 'michel', newsletterId: 'recipe'});

      expect(result).toEqual(expected);
    });
  });

  describe('given a non existing user', () => {
    it('returns a failure result', async () => {
      const expected = {
        outcome: 'failure',
        reason: 'missingUser',
      };

      const result = await handler.handle({username: 'anael', newsletterId: 'recipe'});

      expect(result).toEqual(expected);
    });
  });

  describe('given a non existing newsletter', () => {
    it('returns a failure result', async () => {
      const expected = {
        outcome: 'failure',
        reason: 'missingNewsletter',
      };

      const result = await handler.handle({username: 'julien', newsletterId: 'news'});

      expect(result).toEqual(expected);
    });
  });

  describe('given an email failure', () => {
    it('returns a failure result', async () => {
      const expected = {
        outcome: 'failure',
        reason: 'cannotSendMail',
        error: expect.anything(),
      };

      const result = await handler.handle({username: 'julien', newsletterId: 'recipe'});

      expect(result).toEqual(expected);
    });
  });
});
