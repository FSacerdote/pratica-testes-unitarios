import { Rental } from "@prisma/client"
import { faker } from '@faker-js/faker';

export function createRental(): Rental{
    const rental: Rental = {
        id: faker.number.int(),
        closed: faker.datatype.boolean(),
        date: new Date(),
        endDate: faker.date.future(),
        userId: faker.number.int()
    }
    return rental
}