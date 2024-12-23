'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const dishes = [
  { id: 1, image: '/plat1.jpg' },
  { id: 2, image: '/plat2.jpg' },
  { id: 3, image: '/plat3.jpg' },
  { id: 4, image: '/plat4.jpg' },
  { id: 5, image: '/plat5.jpg' },
];

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
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden ">
      {/* Conteneur principal avec largeur maximale */}
      <div className="max-w-6xl mx-auto my-8 px-4">
        {/* Titre ajouté */}
        <h2 className="text-3xl font-bold text-center text-customError mb-6 font-inknut">
          Offres et Promos
        </h2>
        <Slider {...settings}>
          {dishes.map((dish) => (
            <div key={dish.id}>
              {/* Maintenir les ratios d'aspect carrés ou vidéos */}
              <div className="relative w-full aspect-square sm:aspect-video">
                <Image
                  src={dish.image}
                  alt={`Dish ${dish.id}`}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
