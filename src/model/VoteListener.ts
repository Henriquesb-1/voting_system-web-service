import Option from "./entity/Option";

export default interface VoteListener {
    voteEventHasHappened(option: Option): Promise<void>;
}