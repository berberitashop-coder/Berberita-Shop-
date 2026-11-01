import { LanguageProvider } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PriceEstimator from '@/components/PriceEstimator';
import OrderForm from '@/components/OrderForm';
import FAQ from '@/components/FAQ';
import OrderTracking from '@/components/OrderTracking';
import Footer from '@/components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-slate-900 antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Aller au contenu</a>
        <Header />
        <main id="main-content">
          <Hero />
          <PriceEstimator />
          <OrderForm />
        <FAQ />
        <OrderTracking />
      </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
