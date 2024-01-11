import { Application } from "express";
import PollController from "./controller/PollController";

export default class Routes {
    private _app: Application;

    constructor(app: Application) {
        this._app = app;
    }

    private PollRoutes() {
        const app = this._app;

        const pollController = new PollController();

        app.route("/poll")
            .get((req, res) => pollController.get(req, res))
            .post((req, res) => pollController.save(req, res))
            .put((req, res) => pollController.save(req, res));
    }

    public createRoutes() {
        this.PollRoutes();
    }
}