import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    // Enable CORS for flexibility if needed (optional for same-origin)
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');

    try {
        if (request.method === 'GET') {
            // Read content from KV
            const content = await kv.get('mawj_site_content');
            return response.status(200).json(content || {});
        }

        if (request.method === 'POST') {
            // Save content to KV
            const body = request.body;
            await kv.set('mawj_site_content', body);
            return response.status(200).json({ success: true });
        }

        return response.status(405).json({ error: 'Method Not Allowed' });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
