// import React from 'react';
// import { Link } from 'react-router-dom';

// const CourseItem = ({ course }) => {
//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-4" />
//       <h3 className="text-lg font-semibold">{course.title}</h3>
//       <p className="text-gray-600 mb-2">{course.description}</p>
//       <p className="text-gray-600 font-bold mb-2">${course.price}</p>
//       {course.isLive && <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Live Session</span>}
//       {course.hasPractical && <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full ml-2">Practical Lab</span>}
//       <Link to={`/courses/${course.id}`}><button className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">View Details</button>
//       </Link>

//     </div>
//   );
// };

// export default CourseItem;
