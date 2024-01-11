import Option from "../entity/Option";
import Poll from "../entity/Poll";
import OptionRepository from "../repository/OptionRepository";
import Connection from "./Connection";

export default class OptionService implements OptionRepository {

    //Options will be get along with polls
    public async get(page: number): Promise<{data: Option[], pages: number, total: number}> {
        try {
            const options = [new Option(0, "", "", new Poll(0, "", "", "", []))];

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

            await connection.query(`
                INSERT INTO options (content, poll_id)
                VALUES (?, ?)
            `, [option.content, option.poll.id]);

            await connection.closeConnection();

            return option;
        } catch (error) {
            throw error;
        }
    }

    public async update(option: Option): Promise<Option> {
        try {
            return option;
        } catch (error) {
            throw error;
        }
    }

    public async delete(option: Option): Promise<Option> {
        try {
            return option;
        } catch (error) {
            throw error;
        }
    }
}