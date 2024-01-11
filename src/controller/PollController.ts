import { Request, Response } from "express";
import PollRepository from "../model/repository/PollRepository";
import PollService from "../model/service/PollService";

export default class PollController {
    private _pollRepository: PollRepository;

    public constructor(pollRepository: PollRepository) {
        this._pollRepository = new PollService();
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