import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Minus, Plus, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BestSellers from '@/components/home/BestSellers';

// Mock product data (in a real app, this would come from an API)
const product = {
  id: 'p1',
  name: 'Velvet Touch Button-Up',
  price: 120.99,
  rating: 4.5,
  reviews: 24,
  description: 'A modern take on the classic button-up shirt. Made with our signature velvet touch fabric that feels as good as it looks. Perfect for both casual and formal occasions. Features a slim fit cut, premium pearl buttons, and reinforced stitching for durability.',
  features: [
    'Slim fit',
    'Premium pearl buttons',
    'Reinforced stitching',
    '100% sustainable cotton',
    'Machine washable'
  ],
  colors: [
    { id: 'brown', name: 'Brown', value: '#A52A2A' },
    { id: 'black', name: 'Black', value: '#000000' },
    { id: 'white', name: 'White', value: '#FFFFFF' }
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  images: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ],
  material: 'Our velvet touch fabric is a premium blend of 95% cotton and 5% elastane, providing both comfort and flexibility. The cotton is ethically sourced and sustainable.',
  care: 'Machine wash cold on gentle cycle with similar colors. Tumble dry low. Do not bleach. Iron on low if needed.',
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0].id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  
  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedSize}, ${product.colors.find(c => c.id === selectedColor)?.name}) x ${quantity} has been added to your cart.`,
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const filled = index < Math.floor(rating);
      const half = index === Math.floor(rating) && rating % 1 !== 0;
      
      return (
        <Star 
          key={index} 
          size={16} 
          className={`
            ${filled ? 'text-accent fill-accent' : half ? 'text-accent' : 'text-gray-300'}
          `} 
        />
      );
    });
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-8">
          <Link to="/" className="text-dark hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">•</span>
          <Link to="/shop" className="text-dark hover:text-accent transition-colors">
            Shop
          </Link>
          <span className="mx-2">•</span>
          <span className="text-dark/60">
            {product.name}
          </span>
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden mb-4">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-[600px] object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`border-2 ${mainImage === image ? 'border-accent' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-24 object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-playfair font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-dark/60 text-sm">({product.reviews} reviews)</span>
            </div>
            
            <p className="text-2xl font-bold mb-6">${product.price}</p>
            
            <p className="text-dark mb-6">{product.description}</p>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button 
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`
                      w-8 h-8 rounded-full 
                      ${selectedColor === color.id ? 'ring-2 ring-accent ring-offset-2' : ''}
                    `}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Size</h3>
                <Link 
                  to="/size-guide" 
                  className="text-sm text-dark hover:text-accent underline transition-colors"
                >
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-10 h-10 flex items-center justify-center border
                      ${selectedSize === size 
                        ? 'border-accent bg-accent/10 text-primary' 
                        : 'border-gray-300 hover:border-gray-400'}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={decreaseQuantity}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                  {quantity}
                </span>
                <button 
                  onClick={increaseQuantity}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <ShoppingCart size={16} />
                Add to Cart
              </Button>
              <Button onClick={handleAddToWishlist} variant="outline" className="btn-outline flex items-center justify-center gap-2">
                <Heart size={16} />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Product Details Tabs */}
            <Tabs defaultValue="description">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="text-dark">
                <p className="mb-4">{product.description}</p>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="text-dark">
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="font-semibold">{product.rating.toFixed(1)} out of 5</span>
                  </div>
                  <p>{product.reviews} customer ratings</p>
                </div>
                
                <Link to="#write-review" className="btn-primary inline-block mb-6">
                  Write a Review
                </Link>
                
                {/* Sample reviews would go here */}
                <div className="border-t pt-4">
                  <p className="text-center text-dark/60">
                    Be the first to review this product
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* You May Also Like Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-playfair font-bold text-center mb-8">You May Also Like</h2>
          <BestSellers />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
