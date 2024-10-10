import React from 'react';
import { Link } from 'react-router-dom';
import blog1 from '../assest/Blog/blog-1.jpg';
import blog2 from '../assest/Blog/blog-2.jpg';
import blog3 from '../assest/Blog/blog-3.jpg';
import blog4 from '../assest/Blog/blog-4.jpg';
import blog5 from '../assest/Blog/blog-5.jpg';
import blog6 from '../assest/Blog/blog-6.jpg';

const BlogPage = () => {
    const posts = [
        {
            id: 1,
            title: "Next Gen TV",
            category: "ELDA EDITION",
            excerpt: "Next Gen TV, also known as ATSC 3.0, is the latest version of television broadcasting...",
            image: blog1,
        },
        {
            id: 2,
            title: "7 RSN Why LED TV is the Ultimate Home Entertainment Experience",
            category: "ELDA EDITION",
            excerpt: "LED TVs have become a popular choice for home entertainment setups. With advanced...",
            image: blog2,
        },
        {
          id: 3,
          title: "The 13 Benefits of Watching TV",
          category: "ELDA EDITION",
          excerpt: "According to the Globe and Mail, Canadians watched an average of 30 hours of TV in 2017. Not surprising considering we are in the ‘golden age of TV’. But is all that TV watching good for us? Well, like most things, it’s all about balance....",
          image: blog3,
        },
        {
          id: 4,
          title: "A Comprehensive Guide to OTT Advertising",
          category: "ELDA EDITION",
          excerpt: "OTT is ushering in a new era of awareness marketing. In the past, it required millions of dollars to run a TV commercial that would reach a wide range of audiences. ‘Over-the-top’ platforms remove the barrier of entry for growing brands into TV advertising....",
          image: blog4,
        },
        {
          id: 5,
          title: "A Smart Way To Save Your Money",
          category: "ELDA EDITION",
          excerpt: "Television has evolved from a passive experience of entertainment to a very dynamic one. Yes, not long ago, the TV just sat in the corner of the room, and every night it was used for an hour or two....",
          image: blog5,
        },
        {
          id: 6,
          title: "The History of LED",
          category: "ELDA EDITION",
          excerpt: "LED stands for Light Emitting Diode, and an LED display is a kind of monitor display where the light source comprises light emitting diodes....",
          image: blog6,
        },
        
        // Add more posts as needed
    ];

    return (
        <div className="bg-black text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">BLOGS</h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div key={post.id} className="border-b pb-4 mb-6">
                          <Link to={`/blog-post/${post.id}`} className="text-white mt-2 block">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover mb-4" />
                            <h2 className="text-2xl font-bold">{post.title}</h2>
                            <p className="text-sm text-gray-400"> | {post.category}</p>
                            <p className="mt-4">{post.excerpt}<p className='text-white font-semibold italic'>Continue Reading</p></p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
