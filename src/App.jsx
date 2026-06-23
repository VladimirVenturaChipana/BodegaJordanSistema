import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { lightTheme, darkTheme } from './assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './screens/home';
import Category from './screens/category';
import Product from './screens/product';

import './App.css';


function App() {

  const [isLight, setIsLight] = useState(true);

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
