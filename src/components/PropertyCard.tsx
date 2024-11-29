import React from 'react';

interface PropertyCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  description,
  price,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out">
      <img src={image} alt={title} />
      <h3> {title} </h3>
      <p> {description} </p>
      <p className="font-bold text-gray-700"> {price} - Por Noche </p>
      <button className="block w-[calc(100%-2rem)] m-4 p-2 bg-purple-500 text-white border-none rounded-md text-base cursor-pointer transition-colors duration-300 ease-in-out">
        Reservar
      </button>
    </div>
  );
};
