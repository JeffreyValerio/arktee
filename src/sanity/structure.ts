import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Arktee Store")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("color").title("Colors"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("size").title("Sizes"),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["product", "color", "category", "size"].includes(item.getId()!)
      ),
    ]);
