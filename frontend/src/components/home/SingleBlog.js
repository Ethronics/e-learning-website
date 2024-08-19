import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const SingleBlog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Fetch the specific blog data from the local API
        axios.get('/api.json')
            .then(response => {
                const blogData = response.data.blogs.find(blog => blog.id === parseInt(blogId));
                setBlog(blogData);
            })
            .catch(error => {
                console.error("There was an error fetching the blog data!", error);
            });
    }, [blogId]);

    if (!blog) return <div className="text-center my-5">Loading...</div>;

    return (
        <div>
            <Navigation />
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header text-white bg-dark">
                    <h1 className="mb-0">{blog.title}</h1>
                </div>
                <div className="card-body">
                    <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="img-fluid rounded mb-4" 
                        style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                    />
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                <div className="card-footer text-muted text-center">
                    <span>Published on: {new Date(blog.date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default SingleBlog;
