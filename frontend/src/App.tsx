import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import Hero from './components/common/Hero';
import OrderForm from './pages/OrderForm';
import Home from './pages/Home';
import ClientPortal from './pages/ClientPortal';
import Help from './pages/Help';
import Profile from './pages/Profile';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} cta={t('hero.cta')} />
      <main className="flex flex-1 container mx-auto px-4 py-8">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/portal" element={<ClientPortal />} />
            <Route path="/help" element={<Help />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};

export default App;