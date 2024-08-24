import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import Navigation from './Navbar';
import axios from 'axios';
import { Dropdown, DropdownButton } from 'react-bootstrap';

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
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">Latest Robotics Blogs</h1>
                    <DropdownButton
                        id="dropdown-filter"
                        title={`Filter: ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
                        variant="outline-primary"
                    >
                        <Dropdown.Item onClick={() => setFilter('all')}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('week')}>This Week</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('month')}>This Month</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('old')}>Older</Dropdown.Item>
                    </DropdownButton>
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
            {/* <Footer /> */}
        </div>
    );
};

export default BlogList;
