"use client";

import React, { useState } from "react";
import { ProductImage } from "./ProductImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: { url: string; alt?: string }[];
};

export const Gallery = ({ images }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Main Image Display */}
      <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[4/3] max-h-[600px] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 group">
        <ProductImage
          src={selectedImage.url}
          alt={selectedImage.alt ?? "Imagen principal"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={800}
          height={600}
        />
        
        {/* Navigation Arrows for Mobile */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors md:hidden z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={18} className="text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors md:hidden z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={18} className="text-gray-700 dark:text-gray-300" />
            </button>
          </>
        )}

        {/* Navigation Arrows for Desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 hidden md:block z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 hidden md:block z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/70 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid - Horizontal Scroll on Mobile, Grid on Desktop */}
      {images.length > 1 && (
        <div className="relative">
          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-4 gap-2 lg:gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-md transition-all duration-200 ${
                  selectedImageIndex === index
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-105'
                    : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 hover:scale-105'
                }`}
              >
                <ProductImage
                  src={img.url}
                  alt={img.alt ?? `Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
                {selectedImageIndex === index && (
                  <div className="absolute inset-0 bg-primary/20" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-1 px-1 pb-2">
            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 overflow-hidden rounded-md transition-all duration-200 ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <ProductImage
                    src={img.url}
                    alt={img.alt ?? `Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={80}
                    height={80}
                  />
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-primary/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Image Dots */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2 md:hidden pt-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                selectedImageIndex === index
                  ? 'bg-primary w-6'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
