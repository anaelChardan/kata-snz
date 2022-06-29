import type {User, UserRepository} from '../../../../domain/user';
import type {Random} from '../../../random';
import type {Timer} from '../../../time';

type Dependencies = {
  timer: Timer;
  random: Random;
};

export function buildInMemoryUserRepository(dependencies: Dependencies): UserRepository {
  const {timer, random} = dependencies;

  async function findOneByUsername(username: string): Promise<User | undefined> {
    await timer.sleep(random.number(150));

    if (username === 'michel') {
      return {
        id: 'userid',
        firstname: 'Michel',
        lastname: 'Drucker',
        email: 'michel@francetv.fr',
        favoriteMeal: 'blanquette de veau',
      };
    }

    if (username === 'julien') {
      return {
        id: 'julienId',
        firstname: 'Julien',
        lastname: 'Sanchez',
        email: 'julien.sanchez@akeneo.com',
        favoriteMeal: 'prefou',
      };
    }

    return undefined;
  }

  return {
    findOneByUsername,
  };
}
