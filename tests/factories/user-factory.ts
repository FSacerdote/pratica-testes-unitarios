import { User } from "@prisma/client"
import { faker } from '@faker-js/faker';

export function createUser(maxAge: number, minAge: number): User{
    const user: User = {
        id: faker.number.int(),
        birthDate: faker.date.birthdate({max: maxAge, min: minAge, mode: "age"}),
        cpf: faker.string.numeric(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
    }
    return user
}