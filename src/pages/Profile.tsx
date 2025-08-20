import React, { useState } from 'react';

interface ProfileProps {
  searchTerm: string;
}

const Profile: React.FC<ProfileProps> = ({ searchTerm }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    department: 'Management',
    joinDate: '2023-01-15',
    avatar: 'AU'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setProfileData({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      phone: '+91 98765 43210',
      role: 'Administrator',
      department: 'Management',
      joinDate: '2023-01-15',
      avatar: 'AU'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600 text-base sm:text-lg">Manage your personal information and account settings</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
              >
                Save Changes
              </button>
              <button 
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm font-medium"
            >
              <i className="fas fa-edit"></i>
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-card border border-gray-200 shadow-card p-4 sm:p-6">
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-4">
                {profileData.avatar}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">{profileData.role}</p>
              <p className="text-xs sm:text-sm text-gray-500">{profileData.department}</p>
            </div>
            
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3 text-xs sm:text-sm">
                <i className="fas fa-calendar text-gray-400 w-4 flex-shrink-0"></i>
                <span className="text-gray-600">Joined: {profileData.joinDate}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm">
                <i className="fas fa-shield-alt text-gray-400 w-4 flex-shrink-0"></i>
                <span className="text-gray-600">Account Status: Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-card border border-gray-200 shadow-card">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">Personal Information</h4>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 py-2.5 text-sm">{profileData.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 py-2.5 text-sm">{profileData.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 py-2.5 text-sm">{profileData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 py-2.5 text-sm">{profileData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <p className="text-gray-900 py-2.5 text-sm">{profileData.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <p className="text-gray-900 py-2.5 text-sm">{profileData.department}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-card border border-gray-200 shadow-card">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">Security Settings</h4>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <h6 className="font-medium text-gray-900 text-sm sm:text-base">Change Password</h6>
                    <p className="text-xs sm:text-sm text-gray-500">Update your password regularly for security</p>
                  </div>
                  <button className="w-full sm:w-auto px-4 py-2.5 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium">
                    Change
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <h6 className="font-medium text-gray-900 text-sm sm:text-base">Two-Factor Authentication</h6>
                    <p className="text-xs sm:text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Enable
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <h6 className="font-medium text-gray-900 text-sm sm:text-base">Login History</h6>
                    <p className="text-xs sm:text-sm text-gray-500">View your recent login activities</p>
                  </div>
                  <button className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
