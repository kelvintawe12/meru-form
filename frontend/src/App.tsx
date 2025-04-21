import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import Hero from './components/common/Hero';
import Home from './components/common/Home';
import OrderForm from './pages/OrderForm';
import ClientPortal from './pages/ClientPortal';
import Help from './pages/Help';
import Profile from './pages/Profile';
import { LanguageProvider } from './contexts/LanguageContext';

// Enhanced ErrorBoundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; errorInfo: React.ErrorInfo | null }
> {
  state = {
    hasError: false,
    error: null as Error | null,
    errorInfo: null as React.ErrorInfo | null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-red-600">
          <h1>Something went wrong. Please try again.</h1>
          {this.state.error && <p>Error: {this.state.error.message}</p>}
          {this.state.errorInfo && (
            <details>
              <summary>Stack Trace</summary>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const { t, ready } = useTranslation('translation');

  if (!ready) {
    return <div className="text-center py-8">Loading translations...</div>;
  }

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} cta={t('hero.cta')} />
        <main className="flex flex-1 container mx-auto px-4 py-8">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
              <Route path="/order" element={<ErrorBoundary><OrderForm /></ErrorBoundary>} />
              <Route path="/portal" element={<ErrorBoundary><ClientPortal /></ErrorBoundary>} />
              <Route path="/help" element={<ErrorBoundary><Help /></ErrorBoundary>} />
              <Route path="/profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
            </Routes>
          </div>
          <Sidebar />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;