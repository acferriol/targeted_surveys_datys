import {IUser} from "../interfaces";

export class userEntity implements IUser {
    provincia: string | null;
    municipio: string | null;
    sex: string | null;
    age: number;
    educational_level: string | null;

    constructor(provincia: string | null, municipio: string | null, sex: string | null, age: number, educational_level: string | null) {

        this.provincia = provincia;
        this.municipio = municipio;
        this.sex = sex;
        this.age = age;
        this.educational_level = educational_level;

    }
    isValid(): boolean {
        return (
            this.provincia !== null && this.provincia?.length > 0 &&
            this.municipio !== null && this.municipio?.length > 0 &&
            this.sex !== null && this.sex?.length > 0 &&
            this.age !== null  && this.age > 0 &&
            this.educational_level !== null && this.educational_level?.length > 0

        );

    }

}