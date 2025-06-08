
import React from 'react';
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

const instagramPosts = [
  {
    id: 'ig1',
    image: '/placeholder.svg',
    link: '#'
  },
  {
    id: 'ig2',
    image: '/placeholder.svg',
    link: '#'
  },
  {
    id: 'ig3',
    image: '/placeholder.svg',
    link: '#'
  },
  {
    id: 'ig4',
    image: '/placeholder.svg',
    link: '#'
  },
  {
    id: 'ig5',
    image: '/placeholder.svg',
    link: '#'
  },
  {
    id: 'ig6',
    image: '/placeholder.svg',
    link: '#'
  }
];

const InstagramFeed: React.FC = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4">Style Inspiration</h2>
          <p className="text-muted-foreground mb-6">
            See how our customers style their favorite pieces
          </p>
          <div className="flex justify-center items-center gap-4 mb-8">
            <Button variant="outline" className="flex items-center gap-2">
              <Instagram size={18} />
              Follow @voguestyle
            </Button>
            <span className="text-accent font-semibold">#WearYourWay</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id}
              href={post.link}
              className="group relative aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={post.image} 
                alt="Instagram post" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                <Instagram 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="#" 
            className="text-primary hover:text-accent underline font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            View more on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
