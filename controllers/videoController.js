import { routes } from '../routes';
import Video from "../models/Video";

export const home = async(req, res) => {
    try{
        const videos = await Video.find({});
        res.render("home", { pageTitle: "home", videos })
    } catch(error) {
        console.log(error);
        res.render("home", { pageTitle: "home", videos: [] })
    }
};

export const search = async(req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    let videos = [];
    try {
        videos = await video.find({title: {$regex: searchingBy, $options: "i"}});
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "search", searchingBy: searchingBy })
}

export const videos = (req, res) => res.render("videos", { pageTitle: "videos" })
export const getUpload = (req, res) => {
    
    res.render("upload", { pageTitle: "upload" })
}
export const postUpload = async(req, res) => {
    const {
        body: {
            title, description
        },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    res.redirect(routes.videoDetail(newVideo.id));
    // TODO upload and save video
}
export const videoDetail = async(req, res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
    } catch(error) {
        console.log(error);
        res.rediret(routes.home);
    }
    res.render("videoDetail", { pageTitle: "videoDetail", video });
}
export const getEditVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", {pagetitle: `Edit ${video.title}`})
    } catch (error) {
        res.redirect(routes.home);
    }
    res.render("editVideo", { pageTitle: "editVideo" }) 
}

export const postEditVideo = async (req, res) => {
    const {
        params: {id },
        body: { title, description }
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        await Video.findOneAndRemove({ _id: id});
    } catch (error) {
    }
    res.redirect(routes.home);
    res.render("deleteVideo", { pageTitle: "deleteVideo" })
}
