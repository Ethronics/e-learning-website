// import React from 'react';
// import { Link } from 'react-router-dom';

// const CoursesList = ({ courses }) => {
//   return (
//     <section className="py-12">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold mb-6"> Available Courses</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {courses.map(course => (
//             <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
//               <img src={course.thumbnail} alt={course.title} className="mb-4 rounded-md"/>
//               <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
//               <p className="text-gray-600 mb-4">{course.description}</p>
//               <p className="mb-4"><strong>Price:</strong> ${course.price}</p>
//               <Link to={`/course/${course.id}`} className="text-blue-500 hover:underline">View Details</Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CoursesList;
