import Option from "../entity/Option";
import Poll from "../entity/Poll";
import PollStatus from "../entity/PollStatus";
import PollRepository from "../repository/PollRepository";
import getNecessariesPages from "../utils/Paginator";
import ParseDate from "../utils/ParseDate";
import Connection from "./Connection";
import Transaction from "./Transaction";

export default class PollService implements PollRepository {

    private _limit: number = 10;

    private fixDateToAlwaysGetTwoDigits(date: string) {
        const dateSplited = date.split("-");

        if(dateSplited[1].length === 1) dateSplited[1] = `0${dateSplited[1]}`;
        if(dateSplited[2].length === 1) dateSplited[2] = `0${dateSplited[2]}`;

        return dateSplited;
    }

    private getPoolStatus(startDate: string, endDate: string): PollStatus {
        const date = new Date();

        const convertDateToNumber = (dateToConvert: string) => {
            const date = new Date(dateToConvert);
            const dateConverted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

            const dateSplited = dateConverted.split("-");

            if(dateSplited[1].length === 1) dateSplited[1] = `0${dateSplited[1]}`;

            if(dateSplited[2].length === 1) dateSplited[2] = `0${dateSplited[2]}`;

            return Number.parseInt(this.fixDateToAlwaysGetTwoDigits(dateConverted).join(""))
        };

        const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (convertDateToNumber(today) < convertDateToNumber(startDate)) {
            return PollStatus.WILL_START;
        } else if (convertDateToNumber(today) > convertDateToNumber(endDate)) {
            return PollStatus.EXPIRED;
        } else {
            return PollStatus.IN_CURSE;
        }

    }

    public async get(page: number): Promise<{ data: Poll[], pages: number, total: number }> {
        try {
            const connection = new Connection();

            const totalQuery = await connection.query("SELECT COUNT(id) as total FROM poll");
            const [total] = totalQuery.map((poll: { total: number }) => poll.total);

            const pollsQuery = <Poll[]>await connection.query(`
                SELECT id, title, start_date as startDate, end_date as endDate
                FROM poll
                LIMIT ?
                OFFSET ?
            `, [this._limit, (page * this._limit - this._limit)]);

            const pages = getNecessariesPages(total, this._limit);

            const polls: Poll[] = pollsQuery.map(poll => new Poll(poll.id, poll.title, ParseDate(poll.startDate), ParseDate(poll.endDate), [], this.getPoolStatus(poll.startDate, poll.endDate)));

            for (let poll of polls) {
                const optionsQuery = <Option[]>await connection.query(`
                    SELECT id, content, vote_count as voteCount, poll_id as pollId
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

    public async getPollByTitle(title: string): Promise<Poll> {
        try {
            const connection = new Connection();

            const pollQuery = <Poll[]> await connection.query(`
                SELECT id, title, start_date as startDate, end_date as endDate
                FROM poll
                WHERE title = ?
            `, [title]);

            const [poll] = pollQuery.map(poll => new Poll(poll.id, poll.title, ParseDate(poll.startDate), ParseDate(poll.endDate), [], this.getPoolStatus(poll.startDate, poll.endDate)));

            const optionsQuery = <Option[]>await connection.query(`
                SELECT id, content, vote_count as voteCount, poll_id as pollId
                FROM options
                WHERE poll_id = ?                
            `, [poll.id]);

            await connection.closeConnection();

            poll.options = optionsQuery;

            return poll;
        } catch (error) {
            throw error;
        }
    }
}