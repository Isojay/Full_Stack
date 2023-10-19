import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import  Navbar  from './NavbarAndFooter/navbar'
import { Explore } from './Components/Homepage/ExploreBooks'
import { Carousel } from './Components/Homepage/Carousel'
import { Heros } from './Components/Homepage/heros'
import { ContactAd } from './Components/Homepage/ContactAd'
import { Footer } from './NavbarAndFooter/footer'
import { Homepage } from './Components/homepage'
import { SearchPage } from './Components/SearchBooksPage'


function App() {
  return (
    <>
      <Navbar/>
      {/* <Homepage/> */}
      <SearchPage/>
      <Footer/>
    </>
  )
}

export default App
