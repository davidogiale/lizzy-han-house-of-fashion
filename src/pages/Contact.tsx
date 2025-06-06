
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this to your email service
    // For now, we'll just show a success toast
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Layout>
      <div 
        className="h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/placeholder.svg')" }}
      >
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white">Contact Us</h1>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-6">Get In Touch</h2>
            <p className="text-dark mb-8">
              We'd love to hear from you! Whether you have a question about our products, a return request, or just want to say hello, we're here to help.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-accent rounded-full p-3 mr-4">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-dark">
                    <a href="mailto:info@vogueclothing.com" className="hover:text-accent transition-colors">
                      info@vogueclothing.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent rounded-full p-3 mr-4">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <p className="text-dark">
                    <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                      +1 (234) 567-890
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent rounded-full p-3 mr-4">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Address</h3>
                  <p className="text-dark">
                    123 Fashion Avenue<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"></path></svg>
                </a>
                <a href="#" className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 6.50005C8.9104 6.50005 6.50098 8.90948 6.50098 12C6.50098 15.0906 8.9104 17.5 12.001 17.5C15.0915 17.5 17.501 15.0906 17.501 12C17.501 8.90948 15.0915 6.50005 12.001 6.50005ZM12.001 15.6667C9.9104 15.6667 8.33431 14.0906 8.33431 12C8.33431 9.90942 9.9104 8.33334 12.001 8.33334C14.0915 8.33334 15.6676 9.90942 15.6676 12C15.6676 14.0906 14.0915 15.6667 12.001 15.6667Z"></path><path d="M17.6699 7.66671C18.4022 7.66671 18.9949 7.07399 18.9949 6.34171C18.9949 5.60943 18.4022 5.01671 17.6699 5.01671C16.9376 5.01671 16.3449 5.60943 16.3449 6.34171C16.3449 7.07399 16.9376 7.66671 17.6699 7.66671Z"></path><path d="M21.6676 5C21.6676 4.08334 20.9176 3.33334 20.001 3.33334H4.00098C3.08431 3.33334 2.33431 4.08334 2.33431 5V20C2.33431 20.9167 3.08431 21.6667 4.00098 21.6667H20.001C20.9176 21.6667 21.6676 20.9167 21.6676 20V5ZM19.8343 14.8333C19.8343 17.5833 17.6676 19.75 14.9176 19.75H9.08431C6.33431 19.75 4.16764 17.5833 4.16764 14.8333V9.16667C4.16764 6.41667 6.33431 4.25 9.08431 4.25H14.9176C17.6676 4.25 19.8343 6.41667 19.8343 9.16667V14.8333Z"></path></svg>
                </a>
                <a href="#" className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.5566 6.69205C18.9254 6.99223 18.2471 7.2013 17.5266 7.29597C18.2643 6.8677 18.8237 6.19286 19.0909 5.375C18.4096 5.77751 17.6562 6.06809 16.8566 6.22166C16.2165 5.5571 15.3099 5.12866 14.2857 5.12866C12.3338 5.12866 10.7446 6.71812 10.7446 8.66989C10.7446 8.95944 10.7772 9.24128 10.8392 9.51055C7.90786 9.35774 5.28269 7.94204 3.50862 5.82373C3.19126 6.37359 3.01303 7.00875 3.01303 7.68364C3.01303 8.96297 3.65824 10.0957 4.64311 10.7474C4.07507 10.7301 3.5408 10.5722 3.07382 10.3154C3.07331 10.3305 3.07331 10.3456 3.07331 10.3606C3.07331 12.0743 4.30072 13.5066 5.94557 13.8443C5.64005 13.9274 5.31725 13.9721 4.9836 13.9721C4.74445 13.9721 4.51229 13.9497 4.28603 13.9081C4.75832 15.3168 6.06474 16.3371 7.61036 16.3662C6.39884 17.3104 4.88509 17.8761 3.24155 17.8761C2.94644 17.8761 2.65527 17.8593 2.36914 17.8267C3.93149 18.8264 5.76992 19.412 7.74129 19.412C14.2767 19.412 17.8279 14.0297 17.8279 9.34111C17.8279 9.18262 17.8242 9.02413 17.8169 8.86696C18.5073 8.37311 19.0929 7.76161 19.5566 7.06382V6.69205Z"></path></svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-playfair font-bold mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-dark font-medium mb-2">
                  Name
                </label>
                <Input 
                  id="name"
                  name="name"
                  type="text" 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-dark font-medium mb-2">
                  Email
                </label>
                <Input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="Your email address" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-dark font-medium mb-2">
                  Subject
                </label>
                <Input 
                  id="subject"
                  name="subject"
                  type="text" 
                  placeholder="Subject of your message" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-dark font-medium mb-2">
                  Message
                </label>
                <Textarea 
                  id="message"
                  name="message"
                  placeholder="Your message" 
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
        
        {/* FAQ Link */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-playfair font-bold mb-4">Have Questions?</h3>
          <p className="text-dark mb-6">
            Check out our frequently asked questions for quick answers.
          </p>
          <Link to="/faqs" className="btn-outline inline-block">
            Browse FAQs
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
