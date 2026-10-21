import { LanguageProvider } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OrderForm from '@/components/OrderForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-slate-900 antialiased">
        <Header />
        <main>
          <Hero />
          <OrderForm />
          <FAQ />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
