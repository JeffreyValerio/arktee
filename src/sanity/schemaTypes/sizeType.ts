import { defineField, defineType } from "sanity";
import { TiersIcon } from "@sanity/icons";

export const sizeType = defineType({
  name: "size",
  title: "Size",
  type: "document",
  icon: TiersIcon,
  fields: [
    defineField({
      name: "size",
      type: "string",
    }),
  ],
});
