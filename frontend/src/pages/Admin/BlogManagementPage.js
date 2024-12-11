import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Sidebar from '../../components/admin/Common/Sidebar';
import Header from '../../components/admin/Common/Navbar';
import PostCreationAndEditing from '../../components/admin/Blog/PostCreationAndEditing';
import PublishingTools from '../../components/admin/Blog/PublishingTools';
import CommentModeration from '../../components/admin/Blog/CommentModeration';
import Analytics from '../../components/admin/Blog/Analytics';
// import SEO from '../../components/admin/Blog/SEO';
import axios from 'axios';

const BlogManagementPage = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [analytics, setAnalytics] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('Posts'); // Default filter

    useEffect(() => {
        axios.get('/apfi.json').then(response => {
            setPosts(response.data.posts);
            setComments(response.data.comments);
            setAnalytics(response.data.analytics);
        });
    }, []);

    const handleSavePost = (post) => {
        axios.post('/api.json', post).then(response => {
            setPosts([...posts, response.data.posts]);
        });
    };
 

    const handlePublish = (publishData) => {
        axios.post('/api/publish', publishData).then(() => {
            // Handle publish logic
        });
    };

    const handleApproveComment = (commentId) => {
        axios.post(`/api/comments/${commentId}/approve`).then(() => {
            setComments(comments.map(c => c.id === commentId ? { ...c, approved: true } : c));
        });
    };

    const handleDeleteComment = (commentId) => {
        axios.delete(`/api/comments/${commentId}`).then(() => {
            setComments(comments.filter(c => c.id !== commentId));
        });
    };

    const handleReplyToComment = (commentId) => {
        // Implement reply functionality
    };
   

    const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
       <div className="flex">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className={`flex-1 transition-all duration-300 ease-in-out ${openSidebarToggle ? 'ml-64' : 'ml-20'}`}>
                <Header OpenSidebar={OpenSidebar} />
                <main className="p-6">
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Blog Management</h1>
            
            {/* Filter Buttons */}
            <div className="mb-6 flex space-x-4">
                <Button onClick={() => setSelectedFilter('Posts')} active={selectedFilter === 'Posts'}>
                    Posts
                </Button>
                <Button onClick={() => setSelectedFilter('PublishingTools')} active={selectedFilter === 'PublishingTools'}>
                    Publishing Tools
                </Button>
                <Button onClick={() => setSelectedFilter('Comments')} active={selectedFilter === 'Comments'}>
                    Comments
                </Button>
                <Button onClick={() => setSelectedFilter('Analytics')} active={selectedFilter === 'Analytics'}>
                    Analytics
                </Button>
                
            </div>
            
            {/* Conditional Rendering Based on Filter */}
            <div className="w-3/4">
                {selectedFilter === 'Posts' && (
                    <PostCreationAndEditing onSave={handleSavePost} />
                )}
                {selectedFilter === 'PublishingTools' && (
                    <PublishingTools onPublish={handlePublish} />
                )}
                {selectedFilter === 'Comments' && (
                    <CommentModeration
                        comments={comments}
                        onApprove={handleApproveComment}
                        onDelete={handleDeleteComment}
                        onReply={handleReplyToComment}
                    />
                )}
                {selectedFilter === 'Analytics' && (
                    <Analytics analytics={analytics} />
                )}
            </div>
        </div>
        </main>
        </div>
    </div>
    );
};

export default BlogManagementPage;
