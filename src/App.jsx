// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Intro from './Components/Intro/Intro';
import HomePage from './Components/HomePage/HomePage';
import Kishore from './Components/Kishore/Kishore';
import NoOne from './Components/NoOne/NoOne';
import Carousel from './Components/Carousel/Carousel';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/HomePage" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/kishore" element={
          <Layout>
            <Kishore />
          </Layout>
        } />
        <Route path="/no-one" element={
          <Layout>
            <NoOne />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;