const success = (msg, result = null) => {
    return { msg, result }
}
const error = (msg) => {
    return { msg };
}

export {success, error}