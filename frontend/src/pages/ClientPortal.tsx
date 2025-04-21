// src/pages/ClientPortal.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  LayoutDashboard,
  FileText,
  Menu,
  Upload,
  Users,
  Clock,
  File,
  CheckCircle2,
  AlertCircle,
  Info,
  Globe,
  Bell,
  User,
  LogOut,
} from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  role: string;
  lastLogin: string;
}

const ClientPortal: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData] = useState<UserData>({
    name: 'Sarah Johnson',
    email: 'sarah@merusoyco.com',
    phone: '+250 788 123 456',
    location: 'Kigali, Rwanda',
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
    role: 'Account Manager',
    lastLogin: '2 hours ago',
  });

  const stats = [
    { title: t('portal.activeProjects'), value: '12', icon: <FileText />, trend: '+2.1%' },
    { title: t('portal.totalStorage'), value: '45GB', icon: <Upload />, trend: '65% used' },
    { title: t('portal.teamMembers'), value: '8', icon: <Users />, trend: '+1 new' },
    { title: t('portal.weeklyHours'), value: '38.5h', icon: <Clock />, trend: '+4.2h' },
  ];

  const documents = [
    { name: 'Project Plan.pdf', date: '2024-05-01', size: '2.4 MB', type: 'pdf' },
    { name: 'Financial Report.xlsx', date: '2024-05-03', size: '1.8 MB', type: 'sheet' },
    { name: 'Design Specs.docx', date: '2024-05-05', size: '3.2 MB', type: 'doc' },
  ];

  const activities = [
    { id: 1, title: t('portal.activity1'), time: '15 mins ago', icon: <CheckCircle2 /> },
    { id: 2, title: t('portal.activity2'), time: '45 mins ago', icon: <AlertCircle /> },
    { id: 3, title: t('portal.activity3'), time: '2 hours ago', icon: <Info /> },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleLanguageChange = () => {
    const newLang = currentLanguage === 'en' ? 'rw' : 'en';
    changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                <span className="text-blue-600">Meru</span>SoyCo
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLanguageChange}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                aria-label={t('nav.toggleLanguage')}
              >
                <Globe className="h-5 w-5" />
                <span className="font-medium">{currentLanguage?.toUpperCase() || 'EN'}</span>
              </button>
              <button className="p-2 relative text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative group">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 top-12 hidden group-hover:block w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="py-2">
                    <NavLink
                      to="/portal/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-5 w-5 mr-2" />
                      {t('portal.profile')}
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      {t('portal.logout')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl md:hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{t('portal.navigation')}</h2>
            </div>
            <div className="p-2">
              <NavLink
                to="/portal"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50"
              >
                <LayoutDashboard className="h-5 w-5 mr-2" />
                {t('nav.dashboard')}
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="pt-16 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('portal.welcomeBack')}, {userData.name}
            </h2>
            <p className="text-gray-500 mt-2">
              {t('portal.lastLogin')}: {userData.lastLogin}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <span className="text-sm text-green-600">{stat.trend}</span>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    {React.cloneElement(stat.icon, { className: 'h-6 w-6 text-blue-600' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">{t('portal.recentActivities')}</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">{activity.icon}</div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">{t('portal.quickActions')}</h3>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg"
                >
                  <span>{t('portal.uploadFile')}</span>
                  <Upload className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold">{t('portal.recentDocuments')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">{t('portal.name')}</th>
                    <th className="px-6 py-3 text-left">{t('portal.date')}</th>
                    <th className="px-6 py-3 text-left">{t('portal.size')}</th>
                    <th className="px-6 py-3 text-left">{t('portal.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documents.map((doc, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-gray-400 mr-3" />
                          {doc.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">{doc.date}</td>
                      <td className="px-6 py-4">{doc.size}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-700">
                          {t('portal.download')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Meru SoyCo</h3>
              <p className="text-sm">{t('footer.companyDesc')}</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} Meru SoyCo. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientPortal;