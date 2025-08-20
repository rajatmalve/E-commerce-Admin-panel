import React, { useState } from 'react';

interface MarketingProps {
  searchTerm: string;
}

interface Campaign {
  name: string;
  type: string;
  status: string;
  reach: string;
  conversion: string;
  budget: string;
  endDate: string;
}

interface Recommendation {
  product: string;
  category: string;
  price: string;
  performance: string;
}

const Marketing: React.FC<MarketingProps> = ({ searchTerm }) => {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  const campaignStats = [
    {
      count: '12',
      label: 'Active Campaigns',
      icon: 'fas fa-bullhorn',
      iconClass: 'campaigns'
    },
    {
      count: '8.5%',
      label: 'Conversion Rate',
      icon: 'fas fa-chart-line',
      iconClass: 'conversion'
    },
    {
      count: '2.4M',
      label: 'Total Reach',
      icon: 'fas fa-users',
      iconClass: 'reach'
    },
    {
      count: '₹45K',
      label: 'Spent This Month',
      icon: 'fas fa-wallet',
      iconClass: 'revenue'
    }
  ];

  const activeCampaigns: Campaign[] = [
    {
      name: 'Summer Sale 2024',
      type: 'Discount',
      status: 'Active',
      reach: '125K',
      conversion: '12.5%',
      budget: '₹15,000',
      endDate: '2024-02-15'
    }
  ];

  const recommendations: Recommendation[] = [
    {
      product: 'Premium Cotton T-Shirt',
      category: 'Clothing',
      price: '₹599',
      performance: 'High'
    }
  ];

  const filteredCampaigns = activeCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecommendations = recommendations.filter(rec =>
    rec.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing & Promotions</h1>
          <p className="text-gray-600 text-lg">Create campaigns, track performance, and boost sales</p>
        </div>
        <button 
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          onClick={() => setShowCreateCampaign(true)}
        >
          <i className="fas fa-plus"></i>
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campaignStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-card p-6 border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="flex items-center space-x-4">
              <div className={`stat-icon ${stat.iconClass}`}>
                <i className={stat.icon}></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 m-0">{stat.count}</h3>
                <h6 className="text-sm font-medium text-gray-500 m-0">{stat.label}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Campaigns */}
        <div className="bg-white rounded-card border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="p-5 border-b border-gray-200">
            <h5 className="text-lg font-semibold text-gray-900 m-0">Active Campaigns</h5>
          </div>
          <div className="p-5">
            {filteredCampaigns.map((campaign, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg mb-3 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <h6 className="font-semibold text-gray-900 m-0">{campaign.name}</h6>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium badge-${campaign.status.toLowerCase()}`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-2 text-gray-900">{campaign.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <span className="ml-2 text-gray-900">{campaign.budget}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Reach:</span>
                    <span className="ml-2 text-gray-900">{campaign.reach}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Conversion:</span>
                    <span className="ml-2 text-gray-900">{campaign.conversion}</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">Ends: {campaign.endDate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Recommendations */}
        <div className="bg-white rounded-card border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="p-5 border-b border-gray-200">
            <h5 className="text-lg font-semibold text-gray-900 m-0">Product Recommendations</h5>
          </div>
          <div className="p-5">
            {filteredRecommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg mb-3 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <h6 className="font-semibold text-gray-900 m-0">{rec.product}</h6>
                  <span className="text-sm text-gray-500">{rec.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{rec.price}</span>
                  <span className="text-sm text-green-600 font-medium">{rec.performance} Performance</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">Create New Campaign</h5>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl" 
                onClick={() => setShowCreateCampaign(false)}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    placeholder="Enter campaign name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>Select Type</option>
                      <option>Discount</option>
                      <option>Free Shipping</option>
                      <option>Buy One Get One</option>
                      <option>Flash Sale</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    rows={3} 
                    placeholder="Enter campaign description"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                onClick={() => setShowCreateCampaign(false)}
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;