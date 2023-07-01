export class CustomErrorApi extends Error {
  constructor(message: string) {
    super(message);
  }
}
