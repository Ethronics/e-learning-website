import React from "react";
// import img1 from '../../assets/Dr frew.png';
// import img2 from '../../assets/Tinsae.png';
// import img3 from '../../assets/John.png';
// import img4 from '../../assets/Habtamu.png';
import Footer from './Footer';
import Navbar from './Navbar';

const About = () => {
  const instructors = [
    {
      name: "Dr. Frew",
      title: "Founder and CEO at Ethronics",
      bio: "Experienced Researcher with a demonstrated history of working in the higher education industry. Skilled in C++, Lecturing, SolidWorks, LabVIEW, and Java.",
      imgUrl: "img1",
    },
    {
      name: "Tinsae",
      title: "Engineering Research Assistant",
      bio: "Bachelor of Engineering - BE, electronics, computer and communication engineering.",
      imgUrl: "img2",
    },
    {
      name: "Yohannes Melese",
      title: "Chief Technology Officer, Python Developer and Data Science Mentor",
      bio: "Currently studying at Adama Science and Technology University in Electronics and Communication Engineering, passionate about Data Science.",
      imgUrl: "img3",
    },
    {
      name: "Habtamu Tadese",
      title: "Research and Development Engineer at Ethronics Institute",
      bio: "Electrical engineer skilled in electronics, data communication, computer network and security, industrial control, and automation.",
      imgUrl: "img4",
    },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mt-6 mb-6">Ethronics IRAS  </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
        Ethronics is a forward looking company that is  pushing the boundaries of possibilities in robotics and autonomous systems technology
        </p>
      </section>

      {/* Founders and Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Founders</h2>
          <p className="text-lg text-gray-700">
          Ethronics provides research based, world-class engineering lessons and develops high tech solution in the robotic and autonomous systems solution trade to major industrial clients in 
          diverse markets all over the world.Founded in 2023, our company is a direct services and solutions provider.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="{}"
            alt="Founders Image"
            className="rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          />
        </div>
      </section>

      {/* Unique Features */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">What Sets Us Apart</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Expert Instructors</h3>
            <p className="text-gray-700">
              Our instructors are leaders in their fields, bringing real-world experience to every course. Learn from the best to stay ahead in your career.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Flexible Learning</h3>
            <p className="text-gray-700">
              Study on your schedule with courses designed for working professionals. Access materials anytime, anywhere with our mobile-friendly platform.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Certification & Career Support</h3>
            <p className="text-gray-700">
              Earn industry-recognized certificates to boost your resume and get personalized career guidance from our dedicated support team.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
        Ethronics is a forward looking company that is pushing the boundaries of possibilities in robotics and autonomous systems technology
        </p>
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <h3 className="text-5xl font-bold text-blue-600">1k+</h3>
            <p className="text-gray-700">Students Enrolled</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-bold text-blue-600">100+</h3>
            <p className="text-gray-700">Courses Available</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-bold text-blue-600">12+</h3>
            <p className="text-gray-700">Countries Reached</p>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Meet Our Instructors</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src={instructor.imgUrl}
                alt={instructor.name}
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-md"
              />
              <h3 className="text-2xl font-semibold text-gray-900">{instructor.name}</h3>
              <p className="text-sm text-blue-600 mb-2">{instructor.title}</p>
              <p className="text-gray-700">{instructor.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
