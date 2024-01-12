import { Request, Response } from "express";
import OptionRepository from "../model/repository/OptionRepository";
import OptionService from "../model/service/OptionService";
import Option from "../model/entity/Option";
import Poll from "../model/entity/Poll";

export default class OptionsController {
    private _optionsRepository: OptionRepository;

    public constructor(optionRepository?: OptionRepository) {
        this._optionsRepository = optionRepository ||  new OptionService();
    }

    public async get(req: Request, res: Response) {
        try {
            
        } catch (error) {
            res.status(500).send();
        }
    }

    public async save(req: Request, res: Response) {
        try {
            const option: Option = req.body;

            if(req.method === "POST") {
                if(!option.content) {
                    res.status(400).send("Conteudo precisa ser informado");
                } else if(!option.poll || !option.poll.id) {
                    res.status(400).send("Enquete precisa ser definida")
                } else {
                    await this._optionsRepository.save(option);
                    res.status(200).json(option);
                }
            } else if (req.method === "PUT") {
                if(!option.id) {
                    res.status(400).send("Id precisa ser informado");
                } else if(!option.content) {
                    res.status(400).send("Conteudo precisa ser informado");
                } else if(!option.voteCount && option.voteCount !== 0 || option.voteCount < 0) {
                    res.status(400).send("Número de votos invalido")
                } else {
                    await this._optionsRepository.update(option);
                    res.status(200).json(option);
                }
            }
        } catch (error) {
            res.status(500).send();
        }
    }

    public async delete(req: Request, res: Response) {
        const optionId = Number.parseInt(<string> req.params.id);
        const pollId = Number.parseInt(<string> req.params.poll_id);

        const option = new Option(optionId, "", 0, new Poll(pollId, "", "" , "", []));
        
        try {
            const totalOptionsRegistered = await this._optionsRepository.getTotalOptionsRegistered(option);

            if(totalOptionsRegistered < 3) {
                res.status(400).send("Enquetes precisam ter no mínimo 3 opções");
            } else {
                await this._optionsRepository.delete(option);
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).send();
        }
    }
}