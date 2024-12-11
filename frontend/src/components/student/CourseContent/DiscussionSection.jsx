import React, { useState } from "react";
import axios from "axios";

const DiscussionSection = ({ comments, lessonId }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/lessons/${lessonId}/comments`, { comment: newComment }).then((response) => {
      setNewComment("");
      alert("Comment added successfully!");
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Discussion</h2>
      <ul className="space-y-4 mb-4">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm font-medium">{comment.author}</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Add your comment..."
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default DiscussionSection;
