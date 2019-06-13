import routes from "./routes";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = 'wetube'
    res.locals.routes = routes
    next()
}
