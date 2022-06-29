import type {Newsletter, NewsletterRepository} from '../../../../domain/newsletter';
import type {Random} from '../../../random';
import type {Timer} from '../../../time';

type Dependencies = {
  timer: Timer;
  random: Random;
};

export function buildInMemoryNewsletterRepository(dependencies: Dependencies): NewsletterRepository {
  const {timer, random} = dependencies;
  async function findOneById(newsletterId: string): Promise<Newsletter | undefined> {
    await timer.sleep(random.number(150));

    if ('recipe' === newsletterId) {
      return {
        id: 'newsletterid',
        parameters: ['firstname', 'lastname', 'favoriteMeal'],
        template: `Hello {{firstname}} {{lastname}}!
We heard that you like to eat some {{favoriteMeal}}.
That's awesome because we have exactly the right recipe for you!
Go to our website to discover more ;)

Bisou`,
      };
    }

    return undefined;
  }

  return {
    findOneById,
  };
}
