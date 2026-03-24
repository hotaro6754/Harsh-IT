import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConsolePage from './pages/ConsolePage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/console" element={<ConsolePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
