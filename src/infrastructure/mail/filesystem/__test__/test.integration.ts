import { buildFileSystemEmailClient } from ".."
import {promises as fs} from 'fs';

describe('Filesystem email client', () => {
  const timer = {
    sleep: async () => {}
  }
  const random = {
    number: () => 0
  }

  const writeFileWithError = async () => {
    throw new Error("cannot write file")
  }

  const writeFileSuccess = fs.writeFile;

  describe("given a fs error", () => {
    const emailClient = buildFileSystemEmailClient({
      timer, random, writeFile: writeFileWithError
    })

    it("returns a failure outcome", async () => {
      const result = await emailClient.sendEmail('michel@gmail.com', 'toto');

      const expected = {
        outcome: 'failure',
        reason: 'technicalReason',
        error: expect.any(Error)
      }

      expect(result).toEqual(expected);
    })
  })

  describe("given a good email and message", () => {
    const emailClient = buildFileSystemEmailClient({
      timer, random, writeFile: writeFileSuccess
    })

    it("returns a success and write the message", async () => {
      const result = await emailClient.sendEmail('anael.chardan@gmail.com', 'toto');

      const expected = {
        outcome: 'success'
      };

      expect(result).toEqual(expected);

      const email = (await fs.readFile(`./artifacts/mail/anael.chardan@gmail.com`)).toString('utf8');
      expect(email).toEqual(`toto`);
    })
  })
})