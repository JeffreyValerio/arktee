import { faker } from "@faker-js/faker";
import prisma from "../lib/prisma";

export type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidTypes = "croptops" | "oversize" | "delantales" | "sudaderas";
export type ValidColors = "red" | "blue" | "black" | "white" | "green";

interface SeedProduct {
  description: string;
  images: string[];
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "men" | "women" | "kid" | "unisex";
  stock: number;
  color: ValidColors;
}

interface SeedData {
  categories: string[];
  colors: { name: ValidColors; hex: string }[];
  products: SeedProduct[];
}

const validSizes: ValidSizes[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const validTypes: ValidTypes[] = ["croptops", "oversize", "delantales", "sudaderas"];
const genders = ["men", "women", "kid", "unisex"] as const;
const validColors: ValidColors[] = ["red", "blue", "black", "white", "green"];

const colorsWithHex: { name: ValidColors; hex: string }[] = [
  { name: "red", hex: "#ff0000" },
  { name: "blue", hex: "#0000ff" },
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "green", hex: "#00ff00" },
];

const getRandomImages = (): string[] => [
  faker.image.urlPicsumPhotos({ width: 1000, height: 1000 }),
  faker.image.urlPicsumPhotos({ width: 1000, height: 1000 }),
  faker.image.urlPicsumPhotos({ width: 1000, height: 1000 }),
];

const initialData: SeedData = {
  categories: ["Croptops", "Oversize", "Delantales", "Sudaderas"],
  colors: colorsWithHex,
  products: Array.from({ length: 20 }).map(() => {
    const title = faker.commerce.productName();
    const type = faker.helpers.arrayElement(validTypes);
    const slug =
      faker.helpers.slugify(title.toLowerCase()) +
      "-" +
      faker.string.alphanumeric(6).toLowerCase();

    return {
      title,
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 8000, max: 17500 })),
      images: getRandomImages(),
      sizes: faker.helpers.arrayElements(validSizes, { min: 2, max: 5 }), // <-- CAMBIO AQUÍ
      stock: faker.number.int({ min: 5, max: 100 }),
      slug,
      tags: faker.helpers.arrayElements(
        ["eco", "nuevo", "exclusivo", "rebaja", "premium"],
        2
      ),
      gender: faker.helpers.arrayElement(genders),
      type,
      color: faker.helpers.arrayElement(validColors),
    };
  }),
};

async function main() {
  console.log("Eliminando datos previos...");
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.color.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: initialData.categories.map((name) => ({ name })),
  });

  await prisma.color.createMany({ data: initialData.colors });

  const categoriesDB = await prisma.category.findMany();
  const colorsDB = await prisma.color.findMany();

  const categoriesMap = Object.fromEntries(
    categoriesDB.map((cat) => [cat.name.toLowerCase(), cat.id])
  );
  const colorsMap = Object.fromEntries(
    colorsDB.map((color) => [color.name, color.id])
  );

  for (const product of initialData.products) {
    const { images, type, color, ...rest } = product;

    const productDB = await prisma.product.create({
      data: {
        ...rest,
        colorId: colorsMap[color],
        categoryId: categoriesMap[type.toLowerCase()],
      },
    });

    await prisma.productImage.createMany({
      data: images.map((url) => ({
        url,
        productId: productDB.id,
      })),
    });
  }

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
