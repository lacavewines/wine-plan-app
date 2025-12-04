import { useState, useEffect } from 'react';

export default function WinePlan() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('timeline');
  const [clubSettings, setClubSettings] = useState({
    explorer: { members: 47, bottles: 3, price: 99 },
    host: { members: 32, bottles: 6, price: 149 },
    champagne: { members: 19, bottles: 2, price: 275 }
  });

  useEffect(() => {
    const auth = localStorage.getItem('wineplan_auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
      loadProducts();
    }
  }, []);

  const handleLogin = () => {
    if (password === 'wineplan2025') {
      localStorage.setItem('wineplan_auth', 'authenticated');
      setIsAuthenticated(true);
      loadProducts();
    } else {
      alert('Incorrect password');
    }
  };

  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        { producer: 'Dosnon', wine: 'Blanc de Blancs Brut', stock: 23, burn: 8, status: 'low', price: 34 },
        { producer: 'Château de Brézé', wine: 'Saumur Blanc', stock: 47, burn: 12, status: 'medium', price: 32 },
        { producer: 'Domaine Huet', wine: 'Vouvray Sec', stock: 156, burn: 15, status: 'good', price: 37 }
      ]);
      setLoading(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">🍷 Wine Plan</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-4"
              placeholder="Enter password"
            />
            <button onClick={handleLogin} className="w-full bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition">
              Login
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">Demo password: wineplan2025</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-purple-700">🍷 Wine Plan</h1>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            <span>Synced with Commerce7</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
          <strong>⚠️ Low Stock Alert:</strong> Champagne Dosnon Blanc de Blancs below minimum threshold (23 bottles remaining)
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {['timeline', 'inventory', 'suggestions'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 font-medium text-sm border-b-2 transition ${
                  activeTab === tab ? 'text-purple-700 border-purple-700' : 'text-gray-500 border-transparent hover:text-purple-700'
                }`}
              >
                {tab === 'timeline' ? 'Forecast Timeline' : tab === 'inventory' ? 'Current Inventory' : 'Suggested Selections'}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 italic mb-6">💡 Click "Customize Selection" on any shipment to open the wine selection interface</p>

          {activeTab === 'timeline' && (
            <div className="pl-10">
              {[
                { date: 'February 2025', title: 'Q1 Explorer Shipment', desc: '141 bottles needed • Selection ready', actions: true },
                { date: 'March 2025', title: '🔔 Place France Order', desc: 'Recommended reorder window opens', actions: false },
                { date: 'April 2025', title: 'Q2 Host & Champagne Shipment', desc: '230 bottles needed • 3 SKUs below threshold', actions: true },
                { date: 'May 2025', title: 'Container Arrival Expected', desc: '60-day lead time from March order', actions: false }
              ].map((item, idx) => (
                <div key={idx} className="relative pb-8">
                  <div className="absolute left-[-33px] top-1.5 w-3 h-3 bg-purple-700 rounded-full" />
                  {idx < 3 && <div className="absolute left-[-28px] top-5 w-0.5 h-full bg-gray-200" />}
                  <div className="text-xs text-gray-500 mb-1">{item.date}</div>
                  <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                  {item.actions && (
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1.5 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
                        View Inventory Position
                      </button>
                      <button className="px-3 py-1.5 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
                        Customize Selection
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab !== 'timeline' && (
            <div className="text-gray-600 text-center py-8">Coming in Phase 2</div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold mb-6">
            Club Settings <span className="text-xs text-gray-500 font-normal">(Synced from Commerce7)</span>
          </h2>

          {Object.entries(clubSettings).map(([club, settings]) => (
            <div key={club} className="grid grid-cols-5 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{club} Members</label>
                <input
                  type="number"
                  value={settings.members}
                  onChange={(e) => setClubSettings({ ...clubSettings, [club]: { ...settings, members: parseInt(e.target.value) || 0 }})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input type="text" value={club === 'champagne' ? 'May 1' : 'February 15'} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <input type="text" value={club === 'champagne' ? 'Bi-Annual' : 'Quarterly'} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bottles/Shipment</label>
                <input
                  type="number"
                  value={settings.bottles}
                  onChange={(e) => setClubSettings({ ...clubSettings, [club]: { ...settings, bottles: parseInt(e.target.value) || 0 }})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Price</label>
                <input
                  type="text"
                  value={`$${settings.price}.00`}
                  onChange={(e) => setClubSettings({ ...clubSettings, [club]: { ...settings, price: parseInt(e.target.value.replace(/\D/g, '')) || 0 }})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          ))}

          <button className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition">Update Projections</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-4">Total Inventory</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-6 text-sm text-gray-600">
              <span><strong className="text-gray-900">2,847</strong> bottles</span>
              <span><strong className="text-gray-900">42</strong> SKUs</span>
              <span><strong className="text-gray-900">18</strong> producers</span>
              <span><strong className="text-gray-900">$38,420</strong> COGS value</span>
            </div>
            <input type="text" placeholder="Search products..." className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-purple-600" />
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading products...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase">Producer</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase">Wine</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase">Current Stock</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase">Monthly Burn</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 px-3">{product.producer}</td>
                    <td className="py-3 px-3">{product.wine}</td>
                    <td className={`py-3 px-3 font-semibold ${product.status === 'low' ? 'text-red-600' : product.status === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {product.stock}
                    </td>
                    <td className="py-3 px-3 text-gray-600">{product.burn} bottles/mo</td>
                    <td className={`py-3 px-3 font-semibold ${product.status === 'low' ? 'text-red-600' : product.status === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {product.status === 'low' ? '⚠️ Low' : product.status === 'medium' ? '⚡ Monitor' : '✓ Good'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}