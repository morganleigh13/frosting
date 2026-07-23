import "dotenv/config"
import axios from "axios";
import { generateFakeProducts } from "./generateProducts.js";

//I did the first four agents or thru this one whatever this one is.
const numberOfProducts = 20
const products = generateFakeProducts(numberOfProducts);


let interval = null;
let i = 0;

const createProduct = async () => {
    if( i < numberOfProducts) {
        // console.log(products[i])
        const createProduct = await axios.post(`${process.env.SERVER_URL}/products`, products[i]);
        console.log("createProduct", createProduct.data);
        i++
    }else {
        clearInterval(interval)
    }
};
interval = setInterval(createProduct, 300);
