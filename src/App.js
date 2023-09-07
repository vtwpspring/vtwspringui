import './App.css';
import {BrowserRouter, Routes, Route, Link, NavLink, Router} from "react-router-dom";
import {createStore} from 'redux'
import React, {useState} from 'react';
import MainIndex from "./common/MainIndex";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Signup from "./member/Signup";

function App() {
  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path={"/"} element={<MainIndex />}></Route>
              <Route path={"/signup"} element={<Signup />}></Route>
          </Routes>
          <Footer />
      </BrowserRouter>
  );
}

export default App;