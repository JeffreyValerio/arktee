import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://arktee.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/cart',
          '/cart-empty',
          '/favorites',
          '/compare',
          '/login',
          '/register',
          '/forgot-password',
          '/*?*sort=*',
          '/*?*page=*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/cart',
          '/cart-empty',
          '/favorites',
          '/compare',
          '/login',
          '/register',
          '/forgot-password',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

