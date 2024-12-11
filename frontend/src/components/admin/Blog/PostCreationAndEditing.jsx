import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostCreationAndEditing = ({ post, onSave }) => {
    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [publishDate, setPublishDate] = useState(post?.publishDate || '');
    const [image, setImage] = useState(post?.image || null);
    const [video, setVideo] = useState(post?.video || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    };

    const handleSave = () => {
        onSave({ title, content, publishDate, image, video });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create/Edit Post</h2>
            <Form>
                <Form.Group controlId="postTitle">
                    <Form.Label className="block text-gray-700">Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </Form.Group>
                <Form.Group controlId="postContent" className="mt-4">
                    <Form.Label className="block text-gray-700">Content</Form.Label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        theme="snow"
                        className="bg-white border rounded-lg p-2"
                    />
                </Form.Group>
                <Form.Group controlId="postImage" className="mt-4">
                    <Form.Label className="block text-gray-700">Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </Form.Group>
                <Form.Group controlId="postVideo" className="mt-4">
                    <Form.Label className="block text-gray-700">Video</Form.Label>
                    <Form.Control
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </Form.Group>
                <Form.Group controlId="publishDate" className="mt-4">
                    <Form.Label className="block text-gray-700">Publish Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </Form.Group>
                <Button onClick={handleSave} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default PostCreationAndEditing;
