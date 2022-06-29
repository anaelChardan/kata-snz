import { buildInMemoryNewsletterRepository } from ".."

describe("InMemoryNewsletterRepository", () => {
  const timer = {
    sleep: async () => {}
  }
  const random = {
    number: () => 0
  }

  const newsletterRepository = buildInMemoryNewsletterRepository({timer, random});

  describe("findOneById", () => {
    it("returns a result if the newsletter exists", async () => {
      const result = await newsletterRepository.findOneById('recipe');

      const expected = {
        id: 'newsletterid',
        parameters: ['firstname', 'lastname', 'favoriteMeal'],
        template: `Hello {{firstname}} {{lastname}}!
We heard that you like to eat some {{favoriteMeal}}.
That's awesome because we have exactly the right recipe for you!
Go to our website to discover more ;)

Bisou`,
      };

      expect(result).toEqual(expected);
    })
    it("returns nothing if the newsletter does not exists", async () => {
      const result = await newsletterRepository.findOneById('conemara');

      expect(result).toBeUndefined();
    })
  })
})