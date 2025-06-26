import React from 'react';
import { Calendar, Folder, ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const posts = [
    {
      id: 1,
      title: "Top 10 casual look ideas to dress up your kids",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...",
      date: "22 Aug 2021",
      category: "tips & tricks",
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      id: 2,
      title: "Latest trends of wearing street wears supremely",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...",
      date: "25 Aug 2021",
      category: "trending",
      image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      id: 3,
      title: "10 Different Types of comfortable clothes ideas for women",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...",
      date: "28 Aug 2021",
      category: "inspiration",
      image: "https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark">Our Recent Blog</h2>
          <a href="#" className="flex items-center text-gray-600 hover:text-primary transition-colors font-medium">
            Read All Articles <ArrowRight className="ml-2" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-500 uppercase tracking-wide">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Folder size={14} />
                    {post.category}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-dark group-hover:text-primary transition-colors leading-tight">
                  <a href="#" className="hover:underline">
                    {post.title}
                  </a>
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;