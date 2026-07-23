import "dotenv/config"
import axios from "axios";
import { generateFakeUsers } from "./users.js";

//I did the first four agents or thru this one whatever this one is.
const numberOfUsers = 10
const users = generateFakeUsers(numberOfUsers);


let interval = null;
let i = 0;

const createUser = async () => {
    if( i < numberOfUsers) {
        // console.log(users[i])
        const createUser = await axios.post(`${process.env.SERVER_URL}/users`, users[i]);
        console.log("createUser", createUser.data);
        i++
    }else {
        clearInterval(interval)
    }
};
interval = setInterval(createUser, 300);
