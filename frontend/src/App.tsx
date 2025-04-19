import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from './pages/Home';
import OrderForm from './pages/OrderForm';
import ClientPortal from './pages/ClientPortal';
import Help from './pages/Help';
import Success from './pages/Success';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order-form" element={<OrderForm />} />
                <Route path="/client-portal" element={<ClientPortal />} />
                <Route path="/help" element={<Help />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </I18nextProvider>
  );
};

export default App;