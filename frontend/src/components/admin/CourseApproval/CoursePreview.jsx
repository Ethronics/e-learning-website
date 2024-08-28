import React from 'react';

const CoursePreview = ({ course }) => {
    if (!course) {
        return <div className="p-4">Select a course to preview its content.</div>;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Course Preview: {course.title}</h2>
            <p className="text-lg mb-4">{course.description}</p>
            <h3 className="text-xl font-semibold mb-2">Lessons</h3>
            {course.modules.map((module, index) => (
                <div key={index} className="mb-6">
                    <ul className="list-disc ml-4">
                        {module.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="mb-4">
                                <div className="font-semibold">{lesson.title}</div>
                                <p className="text-sm mb-2">{lesson.description}</p>
                                {lesson.videoUrl && (
                                    <div className="mb-2">
                                        <video controls className="w-full max-w-md">
                                            <source src={lesson.videoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                                <ul className="list-disc ml-4">
                                    {lesson.materials.map((material, materialIndex) => (
                                        <li key={materialIndex} className="text-sm">
                                            {material.type === 'pdf' ? (
                                                <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {material.name} (PDF)
                                                </a>
                                            ) : material.type === 'slides' ? (
                                                <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {material.name} (Slides)
                                                </a>
                                            ) : (
                                                material.name
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <ul className="list-disc ml-4 mt-2">
                                    {lesson.assignments.map((assignment, assignmentIndex) => (
                                        <li key={assignmentIndex} className="text-sm">{assignment}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CoursePreview;
