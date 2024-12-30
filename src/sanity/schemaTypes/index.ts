import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { colorType } from "./colorType";
import { productType } from "./productType";
import { sizeType } from "./sizeType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, colorType, productType, sizeType],
};
