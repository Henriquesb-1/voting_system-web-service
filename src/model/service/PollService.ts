import Poll from "../entity/Poll";
import OptionRepository from "../repository/OptionRepository";
import PollRepository from "../repository/PollRepository";
import Connection from "./Connection";
import OptionService from "./OptionService";
import Transaction from "./Transaction";

export default class PollService implements PollRepository {

    private _optionRepository: OptionRepository;

    public constructor() {
        this._optionRepository = new OptionService();
    }

    public async get(page: number): Promise<{ data: Poll[], pages: number, total: number }> {
        try {
            const polls = [new Poll(0, "", "", "", [])];

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
            const connection = new Connection();

            await connection.transaction(Transaction.BEGIN);

            try {
                const pollSaved = await connection.query(`
                INSERT INTO poll (title, start_date, end_date)
                VALUES(?, ?, ?)
            `, [poll.title, poll.startDate, poll.endDate]);

                poll.options.forEach(async option => {
                    await connection.query(`
                        INSERT INTO options (content, poll_id)
                        VALUES (?, ?)
                    `, [option.content, pollSaved.insertId]);
                });

                await connection.transaction(Transaction.COMMIT);

                await connection.closeConnection();

                return poll;
            } catch (error) {
                await connection.transaction(Transaction.ROLLBACK);

                await connection.closeConnection();
                throw error;
            }
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

    public async pollAlreadyExists(poll: Poll): Promise<boolean> {
        try {
            const connection = new Connection();
            const polls = <Poll[]>await connection.query(`SELECT title FROM poll WHERE title = ?`, [poll.title]);
            return polls.length > 0;
        } catch (error) {
            throw error;
        }
    }
}