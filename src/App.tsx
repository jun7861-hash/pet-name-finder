import { FiltersSection } from './components/header/FiltersSection';
import { Header } from './components/header/Header';
import { PetNamesContent } from './components/content/PetNamesContent';

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pb-8">
        <FiltersSection />
        <div className="mx-auto w-fit">
          <PetNamesContent />
        </div>
      </main>
    </div>
  );
}

export default App;
