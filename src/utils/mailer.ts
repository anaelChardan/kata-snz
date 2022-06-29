export type SendEmailResult = {
  outcome: 'success'
} | {
  outcome: 'failure',
  reason: 'technicalReason',
  error: any,
}

export interface EmailClient {
  sendEmail: (email: string, message: string) => Promise<SendEmailResult>;
}