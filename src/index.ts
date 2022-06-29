import {buildSendNewsletterHandler} from './application/write/sendNewsletter';
import type {SendNewsletterHandlerResult} from './application/write/sendNewsletter/types';
import {buildInMemoryNewsletterRepository} from './infrastructure/database/newsletter/inMemory';
import {buildInMemoryUserRepository} from './infrastructure/database/user/inMemory';
import {buildConsoleLogger} from './infrastructure/logger/console';
import {buildFileSystemEmailClient} from './infrastructure/mail/filesystem';
import {buildRandom} from './infrastructure/random';
import {buildTimer} from './infrastructure/time';
import {promises as fs} from 'fs'

const random = buildRandom();
const timer = buildTimer();
const emailClient = buildFileSystemEmailClient({random, timer, writeFile: fs.writeFile});
const userRepository = buildInMemoryUserRepository({random, timer});
const newsletterRepository = buildInMemoryNewsletterRepository({random, timer});
const logger = buildConsoleLogger();

const sendNewsletterHandler = buildSendNewsletterHandler({
  logger,
  userRepository,
  newsletterRepository,
  emailClient,
});

export async function sendNewsletter(username: string, newsletterId: string): Promise<SendNewsletterHandlerResult> {
  return sendNewsletterHandler.handle({username, newsletterId});
}

if (process.argv[2] === 'sendNewsletter') {
  (async () => await sendNewsletterHandler.handle({username: 'michel', newsletterId: 'recipe'}))();
}
