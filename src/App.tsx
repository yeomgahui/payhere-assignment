import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Header from './layout/Header';
import SiteRegisterPage from './views/SiteRegisterPage';
import SiteDetailPage from './views/SiteDetailPage';

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Header />
        <Routes>
          <Route path="/" element={<SiteRegisterPage />} />
          <Route path="/detail/:id" element={<SiteDetailPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
