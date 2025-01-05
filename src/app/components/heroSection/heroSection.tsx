'use client'
import * as React from "react";
import { useEffect, useState } from "react";
import { heroImages, Category, fetchCategories } from "./heroImages";
const NavigationItemComponent: React.FC<Category> = ({ id, name }) => {


  const handleClick = (id: number) => {
    console.log("Selected Category ID:", id); 
    window.location.href = `/pages/sellProduct/?id=${id}`;
  }
  //   try {
  //     const response = await fetch(`https://api.example.com/products/${id}`);
  //     const productData = await response.json();
  //     console.log("Product Data:", productData);
      
  //     // You can update state or perform other actions with the product data
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //   }
  // };

  return (
    <div
      className="flex gap-10 items-center px-4 h-full hover:bg-gray-100 cursor-pointer transition-colors"
      role="menuitem"
      tabIndex={0}
      onClick={() => handleClick(id)} // Trigger handleClick on click
    >
      <span className="text-sm">{name}</span>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSlideChange(index);
    }
  };

  return (
    <div
      className="relative w-full h-[400px] overflow-hidden"
      aria-label="Hero slideshow"
      role="region"
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            aria-hidden={currentSlide !== index}
          />
        ))}
      </div>

      <div
        className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex gap-3"
        role="tablist"
        aria-label="Slideshow navigation"
      >
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${currentSlide === index
                ? "bg-white"
                : "bg-white bg-opacity-50"
              }`}
            role="tab"
            aria-selected={currentSlide === index}
            aria-label={`Slide ${index + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
};

export const MainHero: React.FC = () => {
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  const itemCount = categoryItems.length;
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories(); 
        setCategoryItems(categories.data);
      } catch (err) {
        setError("Error fetching categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <main className="flex h-[400px] max-w-[1380px] mx-auto bg-white shadow-lg">
      <nav
        className="w-[21%] border-r border-gray-200"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="h-full grid" style={{ gridTemplateRows: `repeat(${itemCount}, 1fr)` }}>
          {categoryItems.map((item, index) => (
            <div key={index} className="relative">
              <NavigationItemComponent
                id={item.id}
                name={item.name}
              />
            </div>
          ))}
        </div>
      </nav>

      <section className="w-[79%]">
        <HeroSection />
      </section>
    </main>
  );
};