export enum SERVICE_ERRORS_CODE {
    UKNOWN,
    CONFLICT,
    NOT_FOUND,
}

interface ServiceErrorPayload {
    message: string;
    code?: SERVICE_ERRORS_CODE;
}

type ServiceErrorType<T extends object = ServiceErrorPayload> =
    T extends ServiceErrorPayload
        ? ServiceErrorPayload
        : T & ServiceErrorPayload;

export class ServiceError<
    T extends object = ServiceErrorPayload
> extends Error {
    #payload: ServiceErrorType<T>;

    constructor(payload: string | ServiceErrorType<T>) {
        super(typeof payload === "string" ? payload : payload.message);
        if (typeof payload === "object") this.#payload = payload;
        else
            this.#payload = {
                message: payload,
                code: SERVICE_ERRORS_CODE.UKNOWN,
            } as ServiceErrorType<T>;
    }

    get payload() {
        return this.#payload;
    }

    get code() {
        return this.payload.code
    }

}

const createServiceError = <T extends object = ServiceErrorPayload>(
    payload: string | ServiceErrorType<T>
) => new ServiceError(payload);

export default createServiceError;
