import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/footer/Footer'
import MainTranslate from '../components/Translate/MainTranslate'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div>
          <MainTranslate/>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage
