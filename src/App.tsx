import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import Episodes from './pages/Episodes/Episodes';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="characters" element={<Characters />} />
        <Route path="character/:id" element={<CharacterDetail />} />
        <Route path="episodes" element={<Episodes />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
