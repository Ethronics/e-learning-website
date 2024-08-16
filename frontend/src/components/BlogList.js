
import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch data from the  API
        axios.get('/api.json')
            .then(response => {
                setBlogs(response.data.blogs);
            })
            .catch(error => {
                console.error("There was an error fetching the blog data!", error);
            });
    }, []);

    return (
        <div>
            <Navigation />
        <div className="container mt-5">
            <h1 className="mb-4">Latest Robotics Blogs</h1>
            <div className="row">
                {blogs.map(blog => (
                    <div key={blog.id} className="col-md-4">
                        <BlogCard 
                            title={blog.title}
                            excerpt={blog.excerpt}
                            imageUrl={blog.imageUrl}
                            blogId={blog.id}
                        />
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default BlogList;
