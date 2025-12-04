export default async function handler(req, res) {
  // Get credentials from environment variables
  const appId = process.env.C7_APP_ID;
  const appSecret = process.env.C7_APP_SECRET;
  const tenant = process.env.C7_TENANT;

  // Log what we're using (for debugging)
  console.log('Attempting C7 connection with tenant:', tenant);
  console.log('App ID exists:', !!appId);
  console.log('App Secret exists:', !!appSecret);

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

    console.log('C7 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('C7 Error response:', errorText);
      throw new Error(`Commerce7 API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched products:', data.products?.length || 0);
    
    // Return the products
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching from Commerce7:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: error.message 
    });
  }
}
