export default class ResponseModel {
  error: boolean;
  message: string;
  results: any;

  constructor(error: boolean, message: string, results: any) {
    this.error = error;
    this.message = message;
    this.results = results;
  }

  static success(results: any) {
    return new ResponseModel(false, '', results);
  }

  static error(message) {
    return new ResponseModel(true, message, null);
  }
}
