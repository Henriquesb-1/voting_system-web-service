import Poll from "../entity/Poll";
import PollRepository from "../repository/PollRepository";
import Connection from "./Connection";

export default class PollService implements PollRepository {

    public async get(page: number): Promise<{data: Poll[], pages: number, total: number}> {
        try {
            const polls = [new Poll(0, "", "", "")];

            return {
                data: polls,
                pages: 0,
                total: 0
            }
        } catch (error) {
            throw error;
        }
    }

    public async save(poll: Poll): Promise<Poll> {
        try {
            return poll;
        } catch (error) {
            throw error;
        }
    }

    public async update(poll: Poll): Promise<Poll> {
        try {
            return poll;
        } catch (error) {
            throw error;
        }
    }

    public async delete(poll: Poll): Promise<Poll> {
        try {
            return poll;
        } catch (error) {
            throw error;
        }
    }
}