import { MetadataRoute } from 'next';

// URL de base - doit correspondre à metadataBase dans layout.tsx
const baseUrl = 'https://lessuitesducygne.fr';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
