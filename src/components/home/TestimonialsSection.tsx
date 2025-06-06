
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
    comment: 'The quality of their clothing is outstanding. Every piece I've purchased has exceeded my expectations in terms of fit and durability.'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4,
    comment: 'Fast shipping and the customer service team was incredibly helpful when I needed to exchange a size. Highly recommend!'
  },
  {
    id: 't3',
    name: 'Emma Davis',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    comment: 'I love the sustainable approach to fashion. The materials are high-quality and the designs are timeless. Will definitely shop here again.'
  }
];

const TestimonialsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? 'text-accent fill-accent' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border border-gray-200 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-dark">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
