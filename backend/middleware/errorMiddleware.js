const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        error: true,
        code: 422,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}
module.exports = { notFound, errorHandler };