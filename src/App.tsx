import React from 'react';
import styles from "./App.module.css";
import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners } from "./components";
import {Row, Col, Typography} from 'antd'
import {productList1, productList2, productList3} from "./pages/home/mockups"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {HomePage, NotFound, Sign, Register, Detail} from './pages'
import {createStore} from 'redux'



function App() {
  return (
    <div className={styles.App}>
     <BrowserRouter>
     <Routes>
       <Route path='/' element={<HomePage/>}/>
       <Route path='/sign' element={<Sign/>}></Route>
       <Route path='/register' element={<Register/>}></Route>
       <Route path='/detail/:touristRouteID' element={<Detail/>}></Route>
       <Route path='*' element={<NotFound/>}/>
     </Routes>
     
     </BrowserRouter>

    </div>
  );
}

export default App;
