import { NextFunction, Request, Response } from "express";
import PollRepository from "../model/repository/PollRepository";
import PollService from "../model/service/PollService";
import Poll from "../model/entity/Poll";
import Crypt from "../model/utils/Crypt";
import LogError from "../model/utils/LogError";

export default class PollController {
    private _pollRepository: PollRepository;

    public constructor() {
        this._pollRepository = new PollService();
    }

    public async get(req: Request, res: Response) {
        try {
            const page = Number.parseInt(<string>req.query.page || "1");
            const { data, pages, total } = await this._pollRepository.get(page);
            res.status(200).json({ data, pages, total })
        } catch (error) {
            LogError(error);
            res.status(500).send();
        }
    }

    public async save(req: Request, res: Response) {
        try {
            const poll: Poll = req.body;

            if (req.method === "POST") {
                const isPollOptionsContentEmpty = poll.options.filter(option => option.content === "");

                if (!poll.title) {
                    res.status(400).send("Titulo precisa ser informado");
                } else if (!poll.endDate || !poll.startDate) {
                    res.status(400).send("Data final e inicial precisa ser informada");
                } else if (!poll.creatorCode) {
                    res.status(400).send("Código pessoal precisa ser informado");
                } else if (await this._pollRepository.pollAlreadyExists(poll)) {
                    res.status(400).send("Enquete já cadastrada");
                } else if (poll.options.length < 3) {
                    res.status(400).send("São necessárias pelos menos 3 opções");
                } else if (isPollOptionsContentEmpty.length > 0) {
                    res.status(400).send("Opções não podem ficar vazias");
                } else {
                    poll.creatorCode = Crypt.hash(poll.creatorCode);
                    await this._pollRepository.save(poll);
                    res.status(200).json(poll);
                }

            } else if (req.method === "PUT") {
                if (!poll.id) {
                    res.status(400).send("Id precisa ser informado");
                } else if (!poll.title) {
                    res.status(400).send("Titulo precisa ser informado");
                } else if (!poll.endDate) {
                    res.status(400).send("Data final precisa ser informada");
                } else {
                    await this._pollRepository.update(poll);
                    res.status(200).json(poll);
                }
            }
        } catch (error) {
            LogError(error);
            res.status(500).send();
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const poll: Poll = req.body;

            await this._pollRepository.delete(new Poll(poll.id, "", "", "", "", []));
            res.status(204).send();
        } catch (error) {
            LogError(error);
            res.status(500).send();
        }
    }

    public async getByTitle(req: Request, res: Response) {
        try {
            const title = <string>req.query.t;

            if (!title) {
                res.status(400).send("Titulo precisa ser informado");
            } else {
                const poll = await this._pollRepository.getPollByTitle(title);
                res.status(200).json(poll);
            }
        } catch (error) {
            LogError(error);
            res.status(500).send();
        }
    }

    public async isOnwerCodeCorrect(req: Request, res: Response, next?: NextFunction) {
        try {
            const poll: Poll = req.body;

            const { creatorCode } = await this._pollRepository.isPollOwner(poll);
            const isCorrect = Crypt.isCorrect(poll.creatorCode, creatorCode);

            if (isCorrect) next ? next() : res.status(204).send();
            else res.status(401).send();
        } catch (error) {
            LogError(error);
            res.status(500).send();
        }
    }
}