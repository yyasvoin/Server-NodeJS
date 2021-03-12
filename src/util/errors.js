class NotFoundError extends Error {
    constructor() {
        super(`Not Found`)
    }
}

export { NotFoundError }
