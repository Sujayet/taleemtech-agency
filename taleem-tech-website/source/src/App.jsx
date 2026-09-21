import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import { scrollToId } from './lib/utils';
import About from './sections/About';
import Contact from './sections/Contact';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import Marketplace from './sections/Marketplace';
import Process from './sections/Process';
import Services from './sections/Services';
import Strip from './sections/Strip';
import Why from './sections/Why';
import Work from './sections/Work';

export default function App() {
  // "Enquire" buttons anywhere prefill the contact form, then scroll to it.
  const [draft, setDraft] = useState(null);
  const onEnquire = useCallback((d) => {
    setDraft({ ...d, at: Date.now() });
    scrollToId('contact');
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Strip />
        <Services onEnquire={onEnquire} />
        <Marketplace onEnquire={onEnquire} />
        <Why />
        <Work />
        <Process />
        <About />
        <CTA />
        <Contact draft={draft} />
      </main>
      <Footer />
    </>
  );
}
