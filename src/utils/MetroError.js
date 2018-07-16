function MetroError(message) {
    this.name = "MetroError";
    this.message = message;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack;
    }
}

MetroError.prototype = Object.create(Error.prototype);
MetroError.prototype.constructor = MetroError;

export default MetroError;