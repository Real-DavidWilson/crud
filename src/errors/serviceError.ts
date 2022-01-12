export enum SERVICE_ERRORS_CODE {
    UKNOWN,
    CONFLICT,
    NOT_FOUND,
}

interface ServiceErrordata {
    message: string;
    code?: SERVICE_ERRORS_CODE;
}

type ServiceErrorType<T extends object = ServiceErrordata> =
    T extends ServiceErrordata
        ? ServiceErrordata
        : T & ServiceErrordata;

export class ServiceError<
    T extends object = ServiceErrordata
> extends Error {
    #data: ServiceErrorType<T>;

    constructor(data: string | ServiceErrorType<T>) {
        super(typeof data === "string" ? data : data.message);
        if (typeof data === "object") this.#data = data;
        else
            this.#data = {
                message: data,
                code: SERVICE_ERRORS_CODE.UKNOWN,
            } as ServiceErrorType<T>;
    }

    get data() {
        return this.#data;
    }

    get code() {
        return this.data.code
    }

}

const createServiceError = <T extends object = ServiceErrordata>(
    data: string | ServiceErrorType<T>
) => new ServiceError(data);

export default createServiceError;
