import { Background } from '@/components/Layout/Background';
import { AppGrid } from '@/components/Apps/AppGrid';
import { appCategories } from '@/data/apps';

function App() {
  return (
    <Background>
      <AppGrid categories={appCategories} />
    </Background>
  );
}

export default App;
