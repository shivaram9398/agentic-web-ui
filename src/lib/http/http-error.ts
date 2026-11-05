export class HttpError extends Error {
    readonly status: number

    constructor(status: number) {
        super(`HTTP request failed with status ${status}`)

        this.name = 'HttpError'
        this.status = status
    }
}