
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this to your newsletter service
    // For now, we'll just show a success toast
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for signing up to our newsletter.",
    });
    
    setEmail('');
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container-custom max-w-4xl text-center">
        <h2 className="text-3xl font-playfair font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-dark mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new collections, special offers and exclusive events.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input 
            type="email" 
            placeholder="Your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit" className="btn-primary whitespace-nowrap">
            Subscribe
          </Button>
        </form>
        
        <p className="text-sm text-muted-foreground mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
