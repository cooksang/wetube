import routes from "./routes";
import multer from "multer";

export const multerVideo = multer({dest: "uploads/videos/"});

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = 'wetube'
    res.locals.routes = routes
    res.locals.user = {
        isAuthenticated: false,
        id: 1
    }
    next()
}

export const uploadVideo = multerVideo.single('videoFile');