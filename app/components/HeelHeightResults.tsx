'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  heelHeight: number;
  price: number;
  imageUrl: string;
}

export default function HeelHeightResults({ footLength, age, heelExperience, footPicture }: { footLength: string; age: string; heelExperience: string; footPicture?: File | null }) {
  // Calculate safe heel height based on inputs
  const calculateSafeHeelHeight = () => {
    let baseHeight = 5.0; // Default height if no inputs provided
    
    // Adjust based on foot length if provided
    if (footLength) {
      const length = parseFloat(footLength);
      if (!isNaN(length)) {
        baseHeight = length * 0.15; // Base on foot length
      }
    }
    
    // Adjust based on age if provided
    if (age) {
      const userAge = parseInt(age);
      if (!isNaN(userAge)) {
        if (userAge > 50) {
          baseHeight *= 0.8; // Reduce for older users
        } else if (userAge < 25) {
          baseHeight *= 0.9; // Slight reduction for younger users
        }
      }
    }
    
    // Adjust based on experience if provided
    if (heelExperience) {
      switch (heelExperience) {
        case 'beginner':
          baseHeight *= 0.7;
          break;
        case 'intermediate':
          baseHeight *= 0.85;
          break;
        case 'experienced':
          baseHeight *= 1.0;
          break;
        case 'none':
          baseHeight *= 0.6;
          break;
        default:
          baseHeight *= 0.7;
      }
    }
    
    return Math.max(1, Math.min(12, Math.round(baseHeight * 10) / 10)); // Between 1cm and 12cm
  };

  // Sample product data - in a real app this would come from an API
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "Classic Low Heel Pump",
      heelHeight: 3.5,
      price: 89.99,
      imageUrl: "/placeholder-shoe.jpg"
    },
    {
      id: 2,
      name: "Comfort Block Heel",
      heelHeight: 5.0,
      price: 129.99,
      imageUrl: "/placeholder-shoe.jpg"
    },
    {
      id: 3,
      name: "Stylish Mid Heel Sandal",
      heelHeight: 6.5,
      price: 99.99,
      imageUrl: "/placeholder-shoe.jpg"
    },
    {
      id: 4,
      name: "Elegant High Heel",
      heelHeight: 8.5,
      price: 149.99,
      imageUrl: "/placeholder-shoe.jpg"
    }
  ];

  const safeHeelHeight = calculateSafeHeelHeight();
  
  // Filter products based on safe heel height
  const recommendedProducts = sampleProducts.filter(
    product => product.heelHeight <= safeHeelHeight + 1.0
  );

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Results</h2>
      
      {/* Safe Heel Height Display */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-center mb-2">Safe Heel Height</h3>
        <div className="text-3xl font-bold text-center text-blue-600">{safeHeelHeight} cm</div>
        <p className="text-center text-sm text-gray-600 mt-2">
          {footLength && `Foot length: ${footLength} cm`}
          {age && `, Age: ${age}`}
          {heelExperience && `, Experience: ${heelExperience}`}
          {!footLength && !age && !heelExperience && 'Using default values'}
        </p>
        {footPicture && (
          <p className="text-center text-xs text-gray-500 mt-2">
            Foot length determined from uploaded image
          </p>
        )}
      </div>
      
      {/* Product Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Recommended Products</h3>
        {recommendedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">Heel Height: {product.heelHeight} cm</p>
                  <p className="font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products match your safe heel height criteria.</p>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Recalculate
        </button>
      </div>
    </div>
  );
}