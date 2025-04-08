import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import PopularInMen from '../Components/popularmen/PopularInMen'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <NewCollections/>
      <Offers/>
      <Popular/>
      <PopularInMen/>

    </div>
  )
}

export default Shop
