export class ResponseObject {
  data: any;
  constructor(body: any, message = "Success") {
    this.data = {
      success: message === "Success",
      result: body,
      message: message,
    };
  }
}
