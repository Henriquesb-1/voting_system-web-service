import Option from "./Option";
import PollStatus from "./PollStatus";

export default class Poll {
    private _id: number;
    private _title: string;
    private _startDate: string;
    private _endDate: string;
    private _creatorCode: string;
    private _status: PollStatus;
    private _options: Option[];

    public constructor(id: number, title: string, startDate: string, endDate: string, creatorCode: string, options: Option[], status: PollStatus = PollStatus.IN_CURSE) {
        this._id = id;
        this._title = title;
        this._startDate = startDate;
        this._endDate = endDate;
        this._creatorCode = creatorCode;
        this._status = status;
        this._options = options;
    }

    public get id() {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get startDate() {
        return this._startDate;
    }
    
    public set startDate(startDate: string) {
        this._startDate = startDate;
    }

    public get endDate() {
        return this._endDate;
    }

    public set endDate(endDate: string) {
        this._endDate = endDate;
    }

    public get creatorCode() {
        return this._creatorCode;
    }

    public set creatorCode(creatorCode: string) {
        this._creatorCode = creatorCode;
    }

    public get status() {
        return this._status;
    }

    public set status(status: PollStatus) {
        this._status = status;
    }

    public get options() {
        return this._options;
    }

    public set options(options: Option[]) {
        this._options = options;
    }

}