import "dotenv/config";
import { faker } from "@faker-js/faker";
import {
  purseImages,
  jewelryImages,
  brands,
  madeOf,
  purseDescriptions,
  jewelryDescriptions,
  jewelryReviews,
  purseReviews,
} from "./fakerData.js";

const createSlug = (productName, type, material) => {
  // “Cuyana‑purse‑leather‑4231”
  const base = faker.helpers.slugify(`${productName}-${type}-${material}`, {
    lower: true,
  });

  const suffix = faker.number.int({ min: 100, max: 10000000000 });

  return `${base}-${suffix}`;
};

const usedSlugs = new Set();

function generateUniqueSlug(productName, type, material) {
  let slug;
  do {
    slug = createSlug(productName, type, material);
  } while (usedSlugs.has(slug)); // repeat if we already used it

  usedSlugs.add(slug);
  return slug;
}

const generateProducts = () => {
  // Make sure to change productName and material based on jewelry and purse
  const productName = faker.helpers.arrayElement(brands);

  const material = faker.helpers.arrayElement(madeOf);

  // return {
  //   productName,
  //   description: faker.helpers.arrayElement(jewelryDescriptions),
  //   images: faker.helpers.arrayElement(jewelryImages),
  //   thumbnail: "",
  //   price: faker.commerce.price({ min: 700, max: 25000 }),
  //   type: "jewelry",
  //   material,
  //   reviews: faker.helpers.arrayElements(jewelryReviews, { min: 1, max: 7 }),
  //   slug: generateUniqueSlug(productName.toLowerCase(), "jewelry", material),
  // };

  return {
    productName,
    description: faker.helpers.arrayElement(purseDescriptions),
    images: faker.helpers.arrayElement(purseImages),
    thumbnail: "",
    price: faker.commerce.price({ min: 500, max: 7500 }),
    type: "purse",
    material,
    reviews: faker.helpers.arrayElements(purseReviews, { min: 1, max: 7 }),
    slug:  generateUniqueSlug(productName.toLowerCase(), 'purse', material),
  };
};

export const generateFakeProducts = (length) => {
  const products = [];
  for (let i = 0; i < length; i++) {
    products.push(generateProducts());
  }
  return products;
};
