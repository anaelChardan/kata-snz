export function formatMessage(parametersName: string[], values: object, message: string): string {
  return parametersName.reduce<string>(
    (message: string, parameter: string) => message.replaceAll(`{{${parameter}}}`, values[parameter]),
    message
  );
}
