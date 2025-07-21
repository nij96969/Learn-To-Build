import { QueryBuilder } from "./builder/query-builder";

function main() {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setName("John");
    queryBuilder.setAge(20);
    queryBuilder.setCity("New York");
    queryBuilder.setCountry("USA");
    queryBuilder.setEmail("john@example.com");
    queryBuilder.setPhone("1234567890");
    const { query, values } = queryBuilder.build();

    queryBuilder.reset();

    console.log(query);
    console.log(values);
    console.log("--------------------------------");

    queryBuilder.setName("Jane");
    queryBuilder.setCity("Los Angeles");
    queryBuilder.setCountry("USA");
    queryBuilder.setPhone("0987654321");
    const { query: query2, values: values2 } = queryBuilder.build();

    queryBuilder.reset();

    console.log(query2);
    console.log(values2);
    console.log("--------------------------------");

    queryBuilder.setName("John");
    queryBuilder.setAge(20);
    queryBuilder.setCity("New York");
    const { query: query3, values: values3 } = queryBuilder.build();

    console.log(query3);
    console.log(values3);
    console.log("--------------------------------");
}

main();