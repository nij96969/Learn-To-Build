import { IQueryBuilder } from "../interfaces/IQueryBuilder";
import { QUERY } from "../query/query";

export class QueryBuilder implements IQueryBuilder {
    private name!: string;
    private age!: number;
    private city!: string;
    private country!: string;
    private email!: string;
    private phone!: string;


    setName(name: string): QueryBuilder {
        this.name = name;
        return this;
    }

    setAge(age: number): QueryBuilder {
        this.age = age;
        return this; 
    }

    setCity(city: string): QueryBuilder {
        this.city = city;
        return this;
    }

    setCountry(country: string): QueryBuilder {
        this.country = country;
        return this;
    }

    setEmail(email: string): QueryBuilder {
        this.email = email;
        return this;
    }

    setPhone(phone: string): QueryBuilder {
        this.phone = phone;
        return this;
    }

    reset(): QueryBuilder {
        this.name = undefined!;
        this.age = undefined!;
        this.city = undefined!;
        this.country = undefined!;
        this.email = undefined!;
        this.phone = undefined!;
        return this;
    }

    build(): { query: string, values: (string | number)[] } {
        let query = QUERY.BASE_QUERY;
        let values: (string | number)[] = [];
        let index = values.length + 1;

        if (this.name) {
            query += ` ${QUERY.NAME_CONDITION}`.replace("$1", `$${index}`);
            values.push(this.name);
            index++;
        }

        if (this.age) {
            query += ` ${QUERY.AGE_CONDITION}`.replace("$2", `$${index}`);
            values.push(this.age);
            index++;
        }

        if (this.city) {
            query += ` ${QUERY.CITY_CONDITION}`.replace("$3", `$${index}`);
            values.push(this.city);
            index++;
        }

        if (this.country) {
            query += ` ${QUERY.COUNTRY_CONDITION}`.replace("$4", `$${index}`);
            values.push(this.country);
            index++;
        }

        if (this.email) {
            query += ` ${QUERY.EMAIL_CONDITION}`.replace("$5", `$${index}`);
            values.push(this.email);
            index++;
        }

        if (this.phone) {
            query += ` ${QUERY.PHONE_CONDITION}`.replace("$6", `$${index}`);
            values.push(this.phone);
            index++;
        }
        
        return { query, values };
    }
}