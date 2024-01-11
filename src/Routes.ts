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
            .post((req, res) => pollController.save(req, res));
    }

    public createRoutes() {
        this.PollRoutes();
    }
}