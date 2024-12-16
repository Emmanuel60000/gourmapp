'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const dishes = [
  { id: 1, name: 'Spaghetti Carbonara', image: '/placeholder.svg?height=300&width=400' },
  { id: 2, name: 'Steak Frites', image: '/placeholder.svg?height=300&width=400' },
  { id: 3, name: 'Sushi Platter', image: '/placeholder.svg?height=300&width=400' },
  { id: 4, name: 'Caesar Salad', image: '/placeholder.svg?height=300&width=400' },
  { id: 5, name: 'Margherita Pizza', image: '/placeholder.svg?height=300&width=400' },
]

export default function DishCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <Slider {...settings}>
        {dishes.map((dish) => (
          <div key={dish.id} className="px-2">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white text-xl font-semibold">{dish.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}