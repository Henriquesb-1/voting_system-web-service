import { Request, Response } from "express";
import VoteListener from "../model/VoteListener";
import Option from "../model/entity/Option";
import Poll from "../model/entity/Poll";

export default class UpdateVote implements VoteListener {
    #optionUpdated: Option;
    #blankOption: Option =  new Option(0, "", 0, new Poll(0, "", "", "", "", []));
    #hasUpdated: boolean = false;

    public constructor() {
        this.#optionUpdated = this.#blankOption;
    }

    public get blankOption() {
        return this.#blankOption;
    }

    public async voteEventHasHappened(option: Option): Promise<void> {
        try {
            const { poll } = option;

            this.#optionUpdated = new Option(0, "", 0, poll);
        } catch (error) {
            throw error;
        }
    }

    public async voteCountHasUpdated(req?: Request, res?: Response) {
        try {
            const pollTitle = <string> req?.query.pollTitle;

            if(pollTitle === this.#optionUpdated.poll.title) this.#hasUpdated = true;

            res?.send(this.#hasUpdated); 

            this.#optionUpdated = this.#blankOption;
            this.#hasUpdated = false;
        } catch (error) {
            throw error;
        }
    }
}