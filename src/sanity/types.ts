/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Size = {
  _id: string;
  _type: "size";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  size?: string;
};

export type Product = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  price?: number;
  description?: string;
  colors?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "color";
  }>;
  sizes?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "size";
  }>;
  views?: number;
  category?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "category";
  };
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Color = {
  _id: string;
  _type: "color";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  color?: string;
  hex?: string;
};

export type Category = {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | Size | Product | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | Color | Category | Slug;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/sanity/lib/queries.ts
// Variable: PRODUCTS_QUERY
// Query: *[_type == "product" && defined(slug.current) &&     (!defined($search) || $search == "" || title match $search || description match $search || category->title match $search) ]     | order(_createdAt desc) {    _id,     title,      slug,     mainImage,     price,    description,    category -> {      title, slug    },    colors[]-> {      color, hex    },    sizes[]-> {       size    },    views  }
export type PRODUCTS_QUERYResult = Array<{
  _id: string;
  title: string | null;
  slug: Slug | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  price: number | null;
  description: string | null;
  category: {
    title: string | null;
    slug: Slug | null;
  } | null;
  colors: Array<{
    color: string | null;
    hex: string | null;
  }> | null;
  sizes: Array<{
    size: string | null;
  }> | null;
  views: number | null;
}>;
// Variable: RELATED_PRODUCTS_QUERY
// Query: *[_type == "product" && slug.current != $slug && category->title == $category] | order(views desc) {    _id,     title,       slug,     mainImage,     price,    description,    category -> {      title, slug    },    colors[]-> {      color, hex    },    sizes[]-> {       size    },    views  }
export type RELATED_PRODUCTS_QUERYResult = Array<{
  _id: string;
  title: string | null;
  slug: Slug | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  price: number | null;
  description: string | null;
  category: {
    title: string | null;
    slug: Slug | null;
  } | null;
  colors: Array<{
    color: string | null;
    hex: string | null;
  }> | null;
  sizes: Array<{
    size: string | null;
  }> | null;
  views: number | null;
}>;
// Variable: PRODUCT_BY_ID_QUERY
// Query: *[_type == "product" && slug.current == $slug][0] {    _id,     title,      slug,        mainImage,     price,     description,    category -> {      title, slug    },    colors[]-> {       color, hex    },    sizes[]-> {       size    },    views  }
export type PRODUCT_BY_ID_QUERYResult = {
  _id: string;
  title: string | null;
  slug: Slug | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  price: number | null;
  description: string | null;
  category: {
    title: string | null;
    slug: Slug | null;
  } | null;
  colors: Array<{
    color: string | null;
    hex: string | null;
  }> | null;
  sizes: Array<{
    size: string | null;
  }> | null;
  views: number | null;
} | null;
// Variable: CATEGORIES_QUERY
// Query: *[_type == "category" && defined(slug.current)] | order(title desc) {  _id,    title,    slug  }
export type CATEGORIES_QUERYResult = Array<{
  _id: string;
  title: string | null;
  slug: Slug | null;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[_type == \"product\" && defined(slug.current) && \n    (!defined($search) || $search == \"\" || title match $search || description match $search || category->title match $search) ] \n    | order(_createdAt desc) {\n    _id, \n    title,  \n    slug, \n    mainImage, \n    price,\n    description,\n    category -> {\n      title, slug\n    },\n    colors[]-> {\n      color, hex\n    },\n    sizes[]-> { \n      size\n    },\n    views\n  }\n": PRODUCTS_QUERYResult;
    "\n    *[_type == \"product\" && slug.current != $slug && category->title == $category] | order(views desc) {\n    _id, \n    title,   \n    slug, \n    mainImage, \n    price,\n    description,\n    category -> {\n      title, slug\n    },\n    colors[]-> {\n      color, hex\n    },\n    sizes[]-> { \n      size\n    },\n    views\n  }\n": RELATED_PRODUCTS_QUERYResult;
    "*[_type == \"product\" && slug.current == $slug][0] {\n    _id, \n    title,  \n    slug,    \n    mainImage, \n    price, \n    description,\n    category -> {\n      title, slug\n    },\n    colors[]-> { \n      color, hex\n    },\n    sizes[]-> { \n      size\n    },\n    views\n  }\n": PRODUCT_BY_ID_QUERYResult;
    "*[_type == \"category\" && defined(slug.current)] | order(title desc) {\n  _id,  \n  title,  \n  slug\n  }\n": CATEGORIES_QUERYResult;
  }
}
