import { defineQuery } from "next-sanity";

// export const PRODUCTS_QUERY =
//   defineQuery(`*[_type == "product" && defined(slug.current) && 
//     (!defined($search) || $search == "" || title match $search || description match $search || category->title match $search)
//   ] 
//   | order(_createdAt desc) {
//     _id, 
//     title,  
//     slug, 
//     mainImage, 
//     price,
//     description,
//     category -> {
//       title, slug
//     },
//     colors[]-> {
//       color, hex
//     },
//     sizes[]-> { 
//       size
//     },
//     views
//   }
// `);
export const PRODUCTS_QUERY =
  defineQuery(`*[_type == "product" && defined(slug.current) && 
    (!defined($search) || $search == "" || title match $search || description match $search || category->title match $search)
  ] 
  | order(_createdAt desc) {
    _id, 
    title,  
    slug, 
    mainImage, 
    price,
    description,
    category -> {
      title, slug
    },
    colors[]-> {
      color, hex
    },
    sizes[]-> { 
      size
    },
    views
  }
`);
export const RELATED_PRODUCTS_QUERY =
  defineQuery(`
    *[_type == "product" && slug.current != $slug && category->title == $category] | order(views desc) {
    _id, 
    title,   
    slug, 
    mainImage, 
    price,
    description,
    category -> {
      title, slug
    },
    colors[]-> {
      color, hex
    },
    sizes[]-> { 
      size
    },
    views
  }
`);

export const PRODUCT_BY_ID_QUERY =
  defineQuery(`*[_type == "product" && slug.current == $slug][0] {
    _id, 
    title,  
    slug,    
    mainImage, 
    price,
    description,
    category -> {
      title, slug
    },
    colors[]-> { 
      color, hex
    },
    sizes[]-> { 
      size
    },
    views
  }`);

export const CATEGORIES_QUERY =
  defineQuery(`*[_type == "category" && defined(slug.current)] | order(title desc) {
  _id,  
  title,  
  slug
}`);
