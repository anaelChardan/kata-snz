import {sendNewsletter} from './index';
import {promises as fs} from 'fs';

describe('MyApp', () => {
  it('sends a newsletter', async () => {
    await sendNewsletter('michel', 'recipe');

    const email = (await fs.readFile(`./artifacts/mail/michel@francetv.fr`)).toString('utf8');
    expect(email).toEqual(`Hello Michel Drucker!
We heard that you like to eat some blanquette de veau.
That's awesome because we have exactly the right recipe for you!
Go to our website to discover more ;)

Bisou`);
  });
});
