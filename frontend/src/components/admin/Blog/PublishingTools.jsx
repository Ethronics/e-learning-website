import React from 'react';
import { Button, Form } from 'react-bootstrap';

const PublishingTools = ({ onPublish }) => {
    const [selectedPost, setSelectedPost] = React.useState('');

    const handlePublish = () => {
        onPublish({ post: selectedPost });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Publishing Tools</h2>
            <Form.Group controlId="publishPost">
                <Form.Label className="block text-gray-700">Select Post to Publish</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedPost}
                    onChange={(e) => setSelectedPost(e.target.value)}
                    className="w-full mt-2 p-2 border rounded-lg"
                >
                    <option value="">Select a post</option>
                    {/* Add options dynamically based on available posts */}
                </Form.Control>
            </Form.Group>
            <Button onClick={handlePublish} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Publish
            </Button>
        </div>
    );
};

export default PublishingTools;
