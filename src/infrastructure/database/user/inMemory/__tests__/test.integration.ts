import { buildInMemoryUserRepository } from ".."

describe("InMemoryUserRepository", () => {
  const timer = {
    sleep: async () => {}
  }
  const random = {
    number: () => 0
  }

  const userRepository = buildInMemoryUserRepository({timer, random});

  describe("findOneById", () => {
    it("returns a result if the User exists", async () => {
      const result = await userRepository.findOneByUsername('michel');

      const expected = {
        id: 'userid',
        firstname: 'Michel',
        lastname: 'Drucker',
        email: 'michel@francetv.fr',
        favoriteMeal: 'blanquette de veau',
      };

      expect(result).toEqual(expected);
    })
    it("returns nothing if the User does not exists", async () => {
      const result = await userRepository.findOneByUsername('sardou');

      expect(result).toBeUndefined();
    })
  })
})