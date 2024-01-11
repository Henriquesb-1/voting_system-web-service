import { Application } from "express";
import PollController from "./controller/PollController";
import OptionsController from "./controller/OptionController";

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
        
        app.route("/poll/:id")
            .delete((req, res) => pollController.delete(req, res));
    }

    private OptionsRoutes() {
        const app = this._app;

        const optionsController = new OptionsController();

        app.route("/options")
            .post((req, res) => optionsController.save(req, res))
            .put((req, res) => optionsController.save(req, res));

        app.route("/options/:id/:poll_id")
            .delete((req, res) => optionsController.delete(req, res));
    }

    public createRoutes() {
        this.PollRoutes();
        this.OptionsRoutes();
    }
}