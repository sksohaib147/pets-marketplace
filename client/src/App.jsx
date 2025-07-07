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
// Import category pages
import DogFoodDropdown from './pages/DogFoodDropdown';
import CatFoodDropdown from './pages/CatFoodDropdown';
import RabbitFoodDropdown from './pages/RabbitFoodDropdown';
import ToysDropdown from './pages/ToysDropdown';
import BeltsAndCagesDropdown from './pages/BeltsAndCagesDropdown';
// Import user pages
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Search from './pages/Search';
import PetDetail from './pages/PetDetail';
import ProductDetail from './pages/ProductDetail';
import OrderHistory from './pages/OrderHistory';
import OrderSuccess from './pages/OrderSuccess';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// Import admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ListingsManagement from './pages/admin/ListingsManagement';
import Reports from './pages/admin/Reports';
import AboutManagement from './pages/admin/AboutManagement';
// Import dashboard pages
import AdminDashboardHome from './pages/dashboard/AdminDashboardHome';
import SellerDashboardHome from './pages/dashboard/SellerDashboardHome';
import BuyerDashboardHome from './pages/dashboard/BuyerDashboardHome';

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
          {/* Removed Tailwind test box */}
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
                  {/* Main Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/pets" element={<Pets />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  
                  {/* Category Routes */}
                  <Route path="/dog-food" element={<DogFoodDropdown />} />
                  <Route path="/cat-food" element={<CatFoodDropdown />} />
                  <Route path="/rabbit-food" element={<RabbitFoodDropdown />} />
                  <Route path="/toys" element={<ToysDropdown />} />
                  <Route path="/belts-and-cages" element={<BeltsAndCagesDropdown />} />
                  
                  {/* User Pages */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/pet/:id" element={<PetDetail />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                  <Route path="/admin/listings" element={<ListingsManagement />} />
                  <Route path="/admin/reports" element={<Reports />} />
                  <Route path="/admin/about" element={<AboutManagement />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/dashboard/admin" element={<AdminDashboardHome />} />
                  <Route path="/dashboard/seller" element={<SellerDashboardHome />} />
                  <Route path="/dashboard/buyer" element={<BuyerDashboardHome />} />

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
