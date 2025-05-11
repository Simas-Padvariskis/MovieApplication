import './styles/base/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import { CategoryProvider } from './context/CategoryContext';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Movies from "./pages/Movies"
import Categories from "./pages/Categories"

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <MovieProvider>
          <CategoryProvider>
            <Router>
              <div className="app-container">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/categories" element={<Categories />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </CategoryProvider>
          </MovieProvider>
        </AuthProvider>
      </LoadingProvider>
  );
}

export default App;
