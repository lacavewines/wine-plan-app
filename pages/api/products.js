export default async function handler(req, res) {
  // Get credentials from environment variables
  const appId = process.env.C7_APP_ID;
  const appSecret = process.env.C7_APP_SECRET;
  const tenant = process.env.C7_TENANT;

  // Create Basic Auth token
  const authToken = Buffer.from(`${appId}:${appSecret}`).toString('base64');

  try {
    // Fetch products from Commerce7
    const response = await fetch('https://api.commerce7.com/v1/product', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authToken}`,
        'tenant': tenant,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Commerce7 API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the products
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching from Commerce7:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
