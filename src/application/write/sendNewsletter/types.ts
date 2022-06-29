export type SendNewsletter = {
  username: string;
  newsletterId: string;
}

export type SendNewsletterHandlerResult = {
  outcome: 'success'
} | {
  outcome: 'failure',
  reason: 'missingUser'
} | {
  outcome: 'failure'
  reason: 'missingNewsletter'
} | {
  outcome: 'failure',
  reason: 'cannotSendMail'
  error: any
}

export interface SendNewsletterHandler {
  handle: (command: SendNewsletter) => Promise<SendNewsletterHandlerResult>
}