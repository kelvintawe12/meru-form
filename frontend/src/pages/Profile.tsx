import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, Lock, Mail, Phone, Globe, Shield, 
  CheckCircle2, Briefcase, Building, CreditCard,
  Calendar, Clock, Key, Download, Edit, Save,
  File, XCircle, Smartphone, MapPin, IdCard
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ClientProfile {
  personal: {
    avatar: string;
    fullName: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    lastLogin: string;
  };
  company: {
    name: string;
    industry: string;
    address: string;
    taxId: string;
    clientSince: string;
    accountManager: string;
    contractType: string;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    activeSessions: Array<{
      device: string;
      location: string;
      ip: string;
      lastActive: string;
    }>;
  };
  documents: {
    contract: string;
    nda: string;
    latestInvoice: string;
  };
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<ClientProfile>({
    personal: {
      avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
      fullName: 'Sarah Johnson',
      email: 'sarah@merusoyco.com',
      phone: '+250 788 123 456',
      position: 'Procurement Manager',
      department: 'Operations',
      lastLogin: '2024-05-20 14:30:00'
    },
    company: {
      name: 'Kigali Agro Industries Ltd',
      industry: 'Agricultural Processing',
      address: 'KN 45 St, Kigali Heights, Rwanda',
      taxId: 'TAX-0456-2024',
      clientSince: '2021-03-15',
      accountManager: 'James Mugabo',
      contractType: 'Enterprise'
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-04-01',
      activeSessions: [
        {
          device: 'MacBook Pro 16"',
          location: 'Kigali, RW',
          ip: '196.223.34.12',
          lastActive: '2 hours ago'
        }
      ]
    },
    documents: {
      contract: 'MeruSoyCo_Contract_2024.pdf',
      nda: 'NDA_Agreement_v3.pdf',
      latestInvoice: 'Invoice_0456_May2024.pdf'
    }
  });

  const handleSave = () => {
    setEditMode(false);
    // Add API call to save changes
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8 mt-8"
    >
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profile.personal.avatar}
              alt="Profile"
              className="h-24 w-24 rounded-full border-4 border-blue-100"
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.personal.fullName}</h1>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <Briefcase className="h-4 w-4" />
              {profile.personal.position}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {t('profile.lastActive')}: {profile.personal.lastLogin}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          {editMode ? (
            <>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {t('profile.saveChanges')}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                {t('profile.cancel')}
              </button>
            </>
          ) : (
            <button 
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              {t('profile.editProfile')}
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap border-b border-gray-200 mb-8">
        {['overview', 'company', 'security', 'documents'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 flex items-center gap-2 ${
              activeTab === tab 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'overview' && <User className="h-4 w-4" />}
            {tab === 'company' && <Building className="h-4 w-4" />}
            {tab === 'security' && <Shield className="h-4 w-4" />}
            {tab === 'documents' && <File className="h-4 w-4" />}
            {t(`profile.${tab}`)}
          </button>
        ))}
      </nav>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('profile.personalInfo')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  {t('profile.fullName')}
                </label>
                <input
                  value={profile.personal.fullName}
                  onChange={(e) => setProfile({
                    ...profile,
                    personal: {...profile.personal, fullName: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  {t('profile.email')}
                </label>
                <input
                  value={profile.personal.email}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  {t('profile.phone')}
                </label>
                <input
                  value={profile.personal.phone}
                  onChange={(e) => setProfile({
                    ...profile,
                    personal: {...profile.personal, phone: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  {t('profile.department')}
                </label>
                <input
                  value={profile.personal.department}
                  onChange={(e) => setProfile({
                    ...profile,
                    personal: {...profile.personal, department: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">{t('profile.accountOverview')}</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t('profile.clientSince')}</span>
                <span className="font-medium">{profile.company.clientSince}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t('profile.contractType')}</span>
                <span className="font-medium text-blue-600">{profile.company.contractType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t('profile.accountManager')}</span>
                <span className="font-medium">{profile.company.accountManager}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Tab */}
      {activeTab === 'company' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Building className="h-5 w-5" />
              {t('profile.companyInfo')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  {t('profile.companyName')}
                </label>
                <input
                  value={profile.company.name}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  {t('profile.industry')}
                </label>
                <input
                  value={profile.company.industry}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  {t('profile.address')}
                </label>
                <input
                  value={profile.company.address}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  {t('profile.taxId')}
                </label>
                <input
                  value={profile.company.taxId}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">{t('profile.billingInfo')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <CreditCard className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="font-medium">Visa •••• 4512</p>
                  <p className="text-sm text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="font-medium">{t('profile.nextPayment')}</p>
                  <p className="text-sm text-gray-500">2024-06-01</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <IdCard className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="font-medium">{t('profile.billingAddress')}</p>
                  <p className="text-sm text-gray-500">{profile.company.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-8">
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t('profile.twoFactorAuth')}
                </h3>
                <p className="text-gray-600 mt-2">
                  {t('profile.twoFactorStatus')}:{' '}
                  <span className={profile.security.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}>
                    {profile.security.twoFactorEnabled ? t('profile.active') : t('profile.inactive')}
                  </span>
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {profile.security.twoFactorEnabled ? t('profile.disable') : t('profile.enable')}
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t('profile.activeSessions')}
            </h3>
            <div className="space-y-4">
              {profile.security.activeSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-gray-500">{session.location} ({session.ip})</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{session.lastActive}</p>
                    <button className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      {t('profile.revoke')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Key className="h-5 w-5" />
              {t('profile.passwordManagement')}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t('profile.lastPasswordChange')}</p>
                  <p className="text-sm text-gray-500">{profile.security.lastPasswordChange}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {t('profile.changePassword')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <File className="h-6 w-6 text-blue-600" />
                <h4 className="font-semibold">{t('profile.contract')}</h4>
              </div>
              <p className="text-sm text-gray-500 mb-4">{profile.documents.contract}</p>
              <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t('profile.download')}
              </button>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <File className="h-6 w-6 text-green-600" />
                <h4 className="font-semibold">{t('profile.nda')}</h4>
              </div>
              <p className="text-sm text-gray-500 mb-4">{profile.documents.nda}</p>
              <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t('profile.download')}
              </button>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <File className="h-6 w-6 text-purple-600" />
                <h4 className="font-semibold">{t('profile.latestInvoice')}</h4>
              </div>
              <p className="text-sm text-gray-500 mb-4">{profile.documents.latestInvoice}</p>
              <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t('download')}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;