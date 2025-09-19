import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Top 10 Things to Check When Buying a Used Car",
      excerpt: "A comprehensive guide to help you make an informed decision when purchasing a pre-owned vehicle.",
      author: "John Doe",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Buying Guide",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Electric Vehicles in Rwanda: The Future is Here",
      excerpt: "Exploring the growing trend of electric vehicles and what it means for Rwandan car buyers.",
      author: "Jane Smith",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Industry News",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "How to Maintain Your Car During Rainy Season",
      excerpt: "Essential tips to keep your vehicle in top condition during Rwanda's rainy seasons.",
      author: "Mike Johnson",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Maintenance",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Understanding Car Insurance in Rwanda",
      excerpt: "Everything you need to know about car insurance requirements and options in Rwanda.",
      author: "Sarah Wilson",
      date: "2024-01-01",
      readTime: "7 min read",
      category: "Finance",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">CarConnect Blog</h1>
          <p className="text-xl max-w-2xl mx-auto animate-slide-up">
            Stay updated with the latest automotive news, tips, and insights from Rwanda's car experts.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-zoom-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter and get the latest automotive news and tips delivered to your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;