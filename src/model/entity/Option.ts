import Poll from "./Poll";

export default class Option {
    private _id: number;
    private _content: string;
    private _voteCount: string;
    private _poll: Poll;

    public constructor(id: number, content: string, voteCount: string, poll: Poll) {
        this._id = id;
        this._content = content;
        this._voteCount = voteCount;
        this._poll = poll;
    }

    public get id() {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get content() {
        return this._content;
    }

    public set content(content: string) {
        this._content = content;
    }

    public get voteCount() {
        return this._voteCount;
    }
    
    public set voteCount(voteCount: string) {
        this._voteCount = voteCount;
    }

    public get poll() {
        return this._poll;
    }

    public set poll(poll: Poll) {
        this._poll = poll;
    }

}