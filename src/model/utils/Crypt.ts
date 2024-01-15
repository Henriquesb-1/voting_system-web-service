import bcript from "bcrypt";

export default abstract class Crypt {
    public static hash(value: string) {
        const salt = bcript.genSaltSync(10);
        const encriptedValue = bcript.hashSync(value, salt);
        return encriptedValue;
    }

    public static isCorrect(textValue: string, hashedValue: string) {
        const isMatch = bcript.compareSync(textValue, hashedValue);
        return isMatch;
    }
}