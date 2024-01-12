import Poll from "../entity/Poll";
import CrudRepository from "./CrudRepository";

export default interface PollRepository extends CrudRepository<Poll> {
    pollAlreadyExists(poll: Poll): Promise<boolean>;
    getPollByTitle(title: string): Promise<Poll>;
}