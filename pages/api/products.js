export default async function handler(req, res) {
  const appId = process.env.C7_APP_ID;
  const appSecret = process.env.C7_APP_SECRET;
  const tenant = process.env.C7_TENANT;

  const authToken = Buffer.from(`${appId}:${appSecret}`).toString('base64');

  try {
    let allProducts = [];
    let page = 1;
    let totalPages = 1;

    // Fetch products using page-based pagination
    while (page <= totalPages) {
      const url = `https://api.commerce7.com/v1/product?limit=50&page=${page}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authToken}`,
          'tenant': tenant,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('C7 Error response:', errorText);
        throw new Error(`Commerce7 API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        allProducts = allProducts.concat(data.products);
      }

      // Calculate total pages from the 'total' count
      if (page === 1 && data.total) {
        totalPages = Math.ceil(data.total / 50);
        console.log(`Total products: ${data.total}, Total pages: ${totalPages}`);
      }

      console.log(`Fetched page ${page} of ${totalPages}`);
      page++;
    }

    console.log('Total products fetched:', allProducts.length);
    
    // Return all products
    res.status(200).json({ products: allProducts });
    
  } catch (error) {
    console.error('Error fetching from Commerce7:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: error.message 
    });
  }
}
