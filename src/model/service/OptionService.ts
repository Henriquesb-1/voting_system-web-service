import VoteListener from "../VoteListener";
import Option from "../entity/Option";
import Poll from "../entity/Poll";
import OptionRepository from "../repository/OptionRepository";
import Connection from "./Connection";

export default class OptionService implements OptionRepository {
    #voteListeners: VoteListener[] = [];

    public addVoteListener(voteListener: VoteListener) {
        this.#voteListeners.push(voteListener);
    }

    //Options will be get along with polls
    public async get(page: number): Promise<{ data: Option[], pages: number, total: number }> {
        try {
            const options = [new Option(0, "", 0, new Poll(0, "", "", "", "", []))];

            return {
                data: options,
                pages: 0,
                total: 0
            }
        } catch (error) {
            throw error;
        }
    }

    public async save(option: Option): Promise<Option> {
        try {
            const connection = new Connection();

            const savedOptions = await connection.query(`
                INSERT INTO options (content, poll_id)
                VALUES (?, ?)
            `, [option.content, option.poll.id]);

            await connection.closeConnection();

            option.id = savedOptions.insertId;

            return option;
        } catch (error) {
            throw error;
        }
    }

    public async update(option: Option, willUpdateVoteCount: boolean): Promise<Option> {
        try {
            const connection = new Connection();
            
            await connection.query(`
                UPDATE options
                SET content = ?, vote_count = ?
                WHERE id = ?
            `, [option.content, option.voteCount, option.id]);

            await connection.closeConnection();

            if(willUpdateVoteCount) this.#voteListeners.forEach(listener => listener.voteEventHasHappened(option));

            return option;
        } catch (error) {
            throw error;
        }
    }

    public async delete(option: Option): Promise<Option> {
        try {
            const connection = new Connection();

            await connection.query(`
                DELETE FROM options
                WHERE id = ?
            `, [option.id]);

            return option;
        } catch (error) {
            throw error;
        }
    }

    public async getTotalOptionsRegistered(option: Option): Promise<number> {
        try {
            const connection = new Connection();

            const optionsRegisteredQuery = await connection.query(`
                SELECT COUNT(id) as total 
                FROM options
                WHERE poll_id = ?
            `, [option.poll.id]);

            const [optionsRegistered] = optionsRegisteredQuery.map((options: {total: number}) => options.total);

            return optionsRegistered;
        } catch (error) {
            throw error;
        }
    }

    public async getOptionById(id: number): Promise<Option> {
        try {
            const connection = new Connection();

            const optionsQuery = <Option[]>await connection.query(`
                SELECT id, content, vote_count as voteCount, poll_id as pollId
                FROM options
                WHERE id = ?
            `, [id]);

            const [options] = optionsQuery.map(option => option);

            await connection.closeConnection();

            return options;
        } catch (error) {
            throw error;
        }
    }
}