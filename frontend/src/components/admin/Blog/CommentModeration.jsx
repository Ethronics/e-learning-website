import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const CommentModeration = ({ comments, onApprove, onDelete, onReply }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Comment Moderation</h2>
            <ListGroup>
                {comments.map(comment => (
                    <ListGroup.Item key={comment.id} className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-800">{comment.content}</p>
                            <div className="text-sm text-gray-600">by {comment.author}</div>
                        </div>
                        <div className="flex space-x-2">
                            {!comment.approved && (
                                <Button
                                    variant="success"
                                    onClick={() => onApprove(comment.id)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Approve
                                </Button>
                            )}
                            <Button
                                variant="danger"
                                onClick={() => onDelete(comment.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={() => onReply(comment.id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Reply
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default CommentModeration;
