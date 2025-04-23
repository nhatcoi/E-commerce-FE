import React from 'react';
import { Slider } from 'src/components/ui/slider';

export default function SlideProduct({ products }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Related Products</h2>
      <Slider className="w-full">
        {products.map((product) => (
          <div key={product.id} className="p-2">
            {/* Your product card component here */}
            <div className="border rounded-lg p-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
