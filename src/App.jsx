import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SearchArea from "./SearchArea";
import { Route, Routes } from "react-router-dom";
import Details from "./Details";
import BackToTop from "./BackToTop";

const App = () => {
  const [theme, setTheme] = useState(null)

  useEffect(() =>{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setTheme('dark')
    }else{
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    if(theme === 'dark'){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleSwitchTheme = () => {
    setTheme(theme === 'dark'? 'light': 'dark')
  }
  return (
    <div className="bg-[#fafafa] dark:bg-[#202c37]">
      <Navbar theme={theme} handleSwitchTheme={handleSwitchTheme}/>
      <Routes>
        <Route path="/Country-Search/" element={<SearchArea />} />
        <Route path="/Country-Search/details/:id" element={<Details />} />
      </Routes>
      <BackToTop />
    </div>
  );
};

export default App;
