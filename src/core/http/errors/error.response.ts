export default class ErrorResponse {

    public static genericError(code: number, message: string): any {
        return {
            code,
            message
        };
    }
}