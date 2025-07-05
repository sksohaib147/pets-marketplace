import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Pets from './pages/Pets';
import Products from './pages/Products';
import About from './pages/About';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#E64A4A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4ECDC4',
      light: '#71D7D0',
      dark: '#2BB3A9',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F7F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Tailwind test box */}
          <div className="bg-red-500 text-white p-4">If this is red, Tailwind is working!</div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/pets" element={<Pets />}></Route>
                  <Route path="/products" element={<Products />}></Route>
                  <Route path="/about" element={<About />}></Route>

                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}

export default App;
