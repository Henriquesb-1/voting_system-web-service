import { Request, Response } from "express";
import OptionRepository from "../model/repository/OptionRepository";
import OptionService from "../model/service/OptionService";

export default class PollController {
    private _optionsRepository: OptionRepository;

    public constructor(pollRepository: OptionRepository) {
        this._optionsRepository = new OptionService();
    }

    public async get(req: Request, res: Response) {
        try {
            
        } catch (error) {
            res.status(500).send();
        }
    }

    public async save(req: Request, res: Response) {
        try {
            if(req.method === "POST") {

            } else if (req.method === "PUT") {

            }
        } catch (error) {
            res.status(500).send();
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            
        } catch (error) {
            res.status(500).send();
        }
    }
}