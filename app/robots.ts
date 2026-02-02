import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    //   disallow: '/private/', // Keep your admin or private routes hidden
    },
    sitemap: 'https://shrideapp.com/sitemap.xml',
  };
}