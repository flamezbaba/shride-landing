import { apiUrl } from '@/lib/utils';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shrideapp.com";

  // 1. Fetch all store IDs from your Laravel API
  const response = await fetch(`${apiUrl}/web/stores-list`);
  const stores = await response.json();

  // 2. Map the stores to sitemap format
  const storeEntries = stores.data.map((store: any) => ({
    url: `${baseUrl}/store/${store?.id}`,
    // lastModified: new Date(store?.updated_at),
    lastModified: store?.updated_at,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  console.log("storeEntries", storeEntries[0]);

  // 3. Add your static pages (Home, About, etc.)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...storeEntries,
  ];
}