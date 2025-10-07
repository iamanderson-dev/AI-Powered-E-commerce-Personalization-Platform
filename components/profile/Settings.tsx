'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Settings component - User account settings and preferences
 * Features: Privacy settings, notifications, account management
 */
export default function Settings() {
  const { logout } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      productRecommendations: false,
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analytics: true,
    },
    preferences: {
      currency: 'USD',
      language: 'en',
      timezone: 'America/New_York',
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password change
    console.log('Password change submitted');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      console.log('Account deletion confirmed');
      logout();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>

      {/* Email Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">
                  {key === 'orderUpdates' && 'Order Updates'}
                  {key === 'promotions' && 'Promotions & Deals'}
                  {key === 'newsletter' && 'Newsletter'}
                  {key === 'productRecommendations' && 'Product Recommendations'}
                </label>
                <p className="text-sm text-gray-600">
                  {key === 'orderUpdates' && 'Get notified about your order status and shipping updates'}
                  {key === 'promotions' && 'Receive emails about special offers and promotions'}
                  {key === 'newsletter' && 'Stay updated with our latest news and features'}
                  {key === 'productRecommendations' && 'Get personalized product suggestions'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('emailNotifications', key, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full ${value ? 'bg-primary-600' : 'bg-gray-200'} transition-colors duration-200`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy & Security</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              className="input w-full max-w-xs"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
            <p className="text-sm text-gray-600 mt-1">
              Control who can see your profile information
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Data Sharing</label>
              <p className="text-sm text-gray-600">
                Allow us to share anonymized data with partners for analytics
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.dataSharing}
                onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${settings.privacy.dataSharing ? 'bg-primary-600' : 'bg-gray-200'} transition-colors duration-200`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${settings.privacy.dataSharing ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Analytics & Performance</label>
              <p className="text-sm text-gray-600">
                Help us improve our service by sharing usage analytics
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.analytics}
                onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${settings.privacy.analytics ? 'bg-primary-600' : 'bg-gray-200'} transition-colors duration-200`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${settings.privacy.analytics ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
              className="input w-full"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              className="input w-full"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
              className="input w-full"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">GMT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="input w-full"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>
      </div>

      {/* Account Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h4 className="font-medium text-gray-900">Export Data</h4>
              <p className="text-sm text-gray-600">
                Download a copy of all your account data
              </p>
            </div>
            <button className="btn btn-outline">
              Export Data
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
            <button className="btn btn-outline">
              Enable 2FA
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-red-600">Delete Account</h4>
              <p className="text-sm text-gray-600">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button
              onClick={() => setShowDeleteAccount(true)}
              className="btn btn-outline text-red-600 hover:text-red-700 border-red-600 hover:border-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Account
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, including:
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-1">
              <li>• Order history</li>
              <li>• Saved addresses</li>
              <li>• Payment methods</li>
              <li>• Wishlist items</li>
              <li>• Reviews and ratings</li>
            </ul>
            <div className="flex space-x-4">
              <button
                onClick={handleDeleteAccount}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete Account
              </button>
              <button
                onClick={() => setShowDeleteAccount(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Settings Button */}
      <div className="flex justify-end">
        <button className="btn-primary">
          Save All Settings
        </button>
      </div>
    </div>
  );
}

