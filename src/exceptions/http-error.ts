// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class HttpError extends Error {
    httpCode: number;
    constructor(httpCode: number, message: string) {
        super(message);
        this.httpCode = httpCode;
    }

    statusCode() {
        return this.statusCode;
    }
}
