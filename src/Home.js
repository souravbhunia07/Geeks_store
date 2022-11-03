import React from 'react';
import './Home.css';
import pic from './images/geeks-banner.png';
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className='home_container'>
            <img className='home_image'
            src={pic} 
            alt='geeks banner'>
            </img>

            <div className='home_row'>
                <Product 
                    id = "32"
                    title = "MSI GeForce RTX 3090 Ventus 3X 24G OC Graphics Card - Ampere Architecture, 24GB GDDR6X, 384-bit, PCIe Gen 4, Overclocked" 
                    image = 'https://picsum.photos/200'
                    price = {289900.00} 
                    rating = {10}
                />
                <Product 
                    id = "09"
                    title = "xyz" 
                    image = 'https://picsum.photos/200'
                    price = {300000.00} 
                    rating = {9}
                />
            </div>

            <div className='home_row'>
                <Product 
                    id = "45"
                    title = "xyz" 
                    image = 'https://picsum.photos/200'
                    price = {300000.00} 
                    rating = {9}
                />
                <Product 
                    id = "5"
                    title = "xyz" 
                    image = 'https://picsum.photos/200'
                    price = {310000.00} 
                    rating = {6}
                />
                <Product 
                    id = "45"
                    title = "xyz" 
                    image = 'https://picsum.photos/200'
                    price = {300000.00} 
                    rating = {9}
                />
                {/* product */}
                {/* product */}
                {/* product */}
            </div>

            <div className='home_row'>
                <Product 
                    id = "45"
                    title = "xyz" 
                    image = 'https://picsum.photos/200'
                    price = {300000.00} 
                    rating = {9}
                />
                {/* product */}
            </div>
        </div>
    </div>
  )
}

export default Home;