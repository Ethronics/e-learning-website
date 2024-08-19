
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import Navigation from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('/api.json')
            .then(response => {
                setBlogs(response.data.blogs);
            })
            .catch(error => {
                console.error("There was an error fetching the blog data!", error);
            });
    }, []);

    const filterBlogs = (blogs) => {
        const now = new Date();
        return blogs.filter(blog => {
            const blogDate = new Date(blog.date);
            switch (filter) {
                case 'week':
                    return (now - blogDate) / (1000 * 60 * 60 * 24) <= 7;
                case 'month':
                    return (now - blogDate) / (1000 * 60 * 60 * 24) <= 30;
                case 'old':
                    return (now - blogDate) / (1000 * 60 * 60 * 24) > 30;
                default:
                    return true;
            }
        });
    };

    return (
        <div>
            <Navigation />
            <div className="container mt-5">
                <h1 className="mb-4">Latest Robotics Blogs</h1>
                <div className="mb-4">
                    <Button variant="outline-primary" onClick={() => setFilter('all')}>All</Button>
                    <Button variant="outline-primary" onClick={() => setFilter('week')}>This Week</Button>
                    <Button variant="outline-primary" onClick={() => setFilter('month')}>This Month</Button>
                    <Button variant="outline-primary" onClick={() => setFilter('old')}>Older</Button>
                </div>
                <div className="d-flex flex-column">
                    {filterBlogs(blogs).map(blog => (
                        <div key={blog.id} className="mb-3">
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

