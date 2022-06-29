import { Newsletter } from "./type";

export interface NewsletterRepository {
  findOneById: (newsletterId: string) => Promise<Newsletter | undefined>;
}