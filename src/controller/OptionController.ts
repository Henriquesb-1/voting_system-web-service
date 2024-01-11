import { Request, Response } from "express";
import OptionRepository from "../model/repository/OptionRepository";
import OptionService from "../model/service/OptionService";
import Option from "../model/entity/Option";

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

            }
        } catch (error) {
            console.log(error)
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