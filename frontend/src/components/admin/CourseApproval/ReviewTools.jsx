import React, { useState } from 'react';

const ReviewTools = ({ onReviewComplete }) => {
    const [qualityCheck, setQualityCheck] = useState(false);
    const [complianceCheck, setComplianceCheck] = useState(false);
    const [relevanceCheck, setRelevanceCheck] = useState(false);
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onReviewComplete({ qualityCheck, complianceCheck, relevanceCheck, notes });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Review Tools</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-3">
                    <input
                        type="checkbox"
                        checked={qualityCheck}
                        onChange={() => setQualityCheck(!qualityCheck)}
                        className="mr-2"
                    />
                    Quality
                </label>
                <label className="block mb-3">
                    <input
                        type="checkbox"
                        checked={complianceCheck}
                        onChange={() => setComplianceCheck(!complianceCheck)}
                        className="mr-2"
                    />
                    Compliance
                </label>
                <label className="block mb-3">
                    <input
                        type="checkbox"
                        checked={relevanceCheck}
                        onChange={() => setRelevanceCheck(!relevanceCheck)}
                        className="mr-2"
                    />
                    Relevance
                </label>
                <label className="block mb-4">
                    <span className="block text-sm font-medium mb-1">Notes:</span>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="block w-full p-2 border rounded"
                    />
                </label>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewTools;
