import "dotenv/config";
import { faker } from "@faker-js/faker";


//To use these name to create other data
const generateFakeUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = faker.person.fullName({ firstName: 'Morgan', lastName: 'Adams'})
  const provider = 'yoga.org'

  return {
    firstName,
    lastName,
    email: `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}@${provider}` ,
    username: `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`,
    password: "love",
    roles: [ faker.helpers.arrayElement([ "Admin", "User" ])],
    answer:[ "pink"],
    // avatar: faker.helpers.arrayElement([ "morgan-bot.jpg" ]),
    phone: faker.phone.number({ style: "national" }),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zip: faker.number.int({ min: 10000, max: 99999 }),
    },
   
    
  };
};

export const generateFakeUsers = (length) => {
  const users = []
  for(let i = 0; i < length; i++) {
    users.push(generateFakeUser())
  }
  return users
}

faker.internet.emoji()