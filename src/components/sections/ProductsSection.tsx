'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Product {
  name: string;
  ingredients: string[];
  instructions: string[];
}

const products: Product[] = [
  {
    name: "All-Purpose Cleaner",
    ingredients: [
      "1 cup white vinegar",
      "1 cup water",
      "10–20 drops of essential oil (e.g., tea tree, lemon, or lavender)"
    ],
    instructions: [
      "Combine vinegar and water in a spray bottle",
      "Add essential oil for a pleasant scent and antibacterial properties",
      "Shake well and use on countertops, windows, and other surfaces (avoid on granite or marble)"
    ]
  },
  {
    name: "Glass Cleaner",
    ingredients: [
      "1 cup water",
      "1 cup rubbing alcohol (70% concentration)",
      "1 tablespoon white vinegar"
    ],
    instructions: [
      "Mix all ingredients in a spray bottle",
      "Shake and spray on glass or mirrors",
      "Wipe with a lint-free cloth or newspaper for streak-free shine"
    ]
  },
  {
    name: "Natural Floor Cleaner",
    ingredients: [
      "1 gallon warm water",
      "1/4 cup white vinegar",
      "1/4 cup castile soap (optional)",
      "5-10 drops essential oil"
    ],
    instructions: [
      "Mix ingredients in a bucket",
      "Use with a mop for wood, tile, or laminate floors",
      "Avoid using vinegar on unsealed wood"
    ]
  }
];

export default function ProductsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Natural Cleaning Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We take pride in using handmade, all-natural cleaning products that are safe for your home and the environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-green-600 mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {product.ingredients.map((ingredient, i) => (
                        <li key={i} className="text-gray-600">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {product.instructions.map((instruction, i) => (
                        <li key={i} className="text-gray-600">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
