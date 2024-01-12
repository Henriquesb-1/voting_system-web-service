import Option from "../entity/Option";
import CrudRepository from "./CrudRepository";

export default interface OptionRepository extends CrudRepository<Option> {
    getTotalOptionsRegistered(option: Option): Promise<number>;
    getOptionById(id: number): Promise<Option>;
}