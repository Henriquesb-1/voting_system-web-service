export default class Poll {
    private _id: number;
    private _title: string;
    private _startDate: string;
    private _endDate: string;

    public constructor(id: number, title: string, startDate: string, endDate: string) {
        this._id = id;
        this._title = title;
        this._startDate = startDate;
        this._endDate = endDate;
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

}