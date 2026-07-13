import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { lightTheme, darkTheme } from './assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from './shared/themeContext';
import Home from './screens/customers/home/home';
import Category from './screens/customers/category';
import Product from './screens/customers/product/product';
import Profile from './screens/customers/profile';
import CheckOut from './screens/customers/checkout';
import RegisterCustomer from './screens/customers/register/register';
import Dashboard from './screens/admin/dashboard';

import './App.css';

function App() {
  const [isLight, setIsLight] = useState(true);

  // Esta función es la que cambiará el tema
  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/registerCustomer" element={<RegisterCustomer />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;