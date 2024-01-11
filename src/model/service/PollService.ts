import Option from "../entity/Option";
import Poll from "../entity/Poll";
import PollRepository from "../repository/PollRepository";
import getNecessariesPages from "../utils/Paginator";
import Connection from "./Connection";
import Transaction from "./Transaction";

export default class PollService implements PollRepository {

    private _limit: number = 10;

    public async get(page: number): Promise<{ data: Poll[], pages: number, total: number }> {
        try {
            const connection = new Connection();

            const totalQuery = await connection.query("SELECT COUNT(id) as total FROM poll");
            const [total] = totalQuery.map((poll: { total: number }) => poll.total);

            const polls = <Poll[]>await connection.query(`
                SELECT id, title, start_date as startDate, end_date as endDate
                FROM poll
                LIMIT ?
                OFFSET ?
            `, [this._limit, (page * this._limit - this._limit)]);

            const pages = getNecessariesPages(total, this._limit);

            for (let poll of polls) {
                const optionsQuery = <Option[]>await connection.query(`
                    SELECT id, content, vote_count, poll_id as pollId
                    FROM options
                    WHERE poll_id = ?                
                `, [poll.id]);

                poll.options = optionsQuery;
            }

            await connection.closeConnection();

            return {
                data: polls,
                pages,
                total
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
            const connection = new Connection();

            await connection.query(`
                UPDATE poll
                SET title = ?, end_date = ?
                WHERE id = ?
            `, [poll.title, poll.endDate, poll.id])

            await connection.closeConnection();

            return poll;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async delete(poll: Poll): Promise<Poll> {
        try {
            const connection = new Connection();

            await connection.query(`
                DELETE FROM poll
                WHERE id = ?
            `, [poll.id]);

            await connection.closeConnection();

            return poll;
        } catch (error) {
            throw error;
        }
    }

    public async pollAlreadyExists(poll: Poll): Promise<boolean> {
        try {
            const connection = new Connection();
            const polls = <Poll[]>await connection.query(`SELECT title FROM poll WHERE title = ?`, [poll.title]);
            await connection.closeConnection();
            
            return polls.length > 0;
        } catch (error) {
            throw error;
        }
    }
}