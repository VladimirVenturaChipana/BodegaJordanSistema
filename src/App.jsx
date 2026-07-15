import { useEffect } from 'react';
import { useAuthStore } from './hooks/servicesStore';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Confirmation from './screens/customers/confirmation/confirmation';
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
  const login = useAuthStore((state) => state.login);
  const [isLight, setIsLight] = useState(true);
  const toggleTheme = () => {
    setIsLight(!isLight);
  };  //->FUNCINCION QUE CAMBIA EL TEMA

  useEffect(() => {
    const cliente = localStorage.getItem('cliente');
    if (cliente) {
      login(JSON.parse(cliente));
    }
  }, []);

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
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;