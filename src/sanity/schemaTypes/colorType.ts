import { ColorWheelIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const colorType = defineType({
  name: "color",
  title: "Color",
  type: "document",
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: "color",
      type: "string",
    }),
    defineField({
      name: "hex",
      title: "Hex Code",
      type: "string",
      description: "Hexadecimal color value (e.g., #FFFFFF)",
    }),
  ],
});
