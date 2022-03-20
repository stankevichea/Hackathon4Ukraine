import React from "react";
import Home from "./components/Home";
import Organization from "./components/organization"
import Login from "./components/Login";
import Declaration from "./components/Declaration";
import InqDec from "./components/InqDec";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/organization/:id' element={<Organization />} />
                <Route exact path='/' element={<Home />} />
                <Route exact path='/home/:categories/:cities' element={<Home />} />
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/deklaracja/:id' element={<Declaration />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/organization/:id/add_inq' element={<InqDec />} />
            </Routes>
        </Router>
    )
}

export default App;
