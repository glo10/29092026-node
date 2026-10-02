const getParamLoginMiddleware = (req, res, next) => {
    req.login = req.params.login
    next()
}

module.exports = {
    getParamLoginMiddleware
}