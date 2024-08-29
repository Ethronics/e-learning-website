import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import logo from '../../src/assets/ethlogo-1-137x137.png'; // Your company logo
import Certificatebg from '../../src/assets/Certificate1.png'; // Your certificate background image

const CertificateView = () => {
  const certificateRef = useRef();
  const [studentName, setStudentName] = useState('John Doe');
  const [studentImage, setStudentImage] = useState(null);
  const course = 'React Development'; // Replace with dynamic data
  const date = 'August 29, 2024'; // Replace with dynamic data
  const signature = null; // Replace with dynamic data

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: 'Certificate',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setStudentImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-200 min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter Your Name"
          className="p-3 text-xl border rounded-lg shadow-sm mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
      </div>
      <div ref={certificateRef} className="relative w-full max-w-5xl p-10 bg-white shadow-2xl rounded-xl overflow-hidden">
        <img
          src={Certificatebg}
          alt="Certificate Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        />
        <div className="relative z-10 flex justify-between items-center mb-12">
          <div className="flex items-center">
            {studentImage ? (
              <img
                src={studentImage}
                alt="Student"
                className="w-28 h-28 object-cover rounded-full border-4 border-gray-300 shadow-md"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 shadow-md">
                No Image
              </div>
            )}
          </div>
          <img
            src={logo}
            alt="Company Logo"
            className="w-36 h-auto"
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600 mb-2">This is to certify that</p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'Cursive, serif' }}>{studentName}</h2>
          <p className="text-lg font-semibold text-gray-700 mb-4">has successfully completed the course</p>
          <h3 className="text-2xl font-semibold text-blue-800 mb-6">{course}</h3>
          <p className="text-md font-bold text-gray-700 mb-8" style={{ fontFamily: 'Cursive, serif' }}>
            We acknowledge the dedication and hard work you have shown. This certificate is a testament to your achievement.
          </p>
          <p className="text-md font-bold text-gray-600 mb-8">{date}</p>
          <div className="flex justify-center items-center mt-8">
            {signature ? (
              <img
                src={signature}
                alt="Signature"
                className="w-40"
              />
            ) : (
              <p className="text-gray-600">No Signature Uploaded</p>
            )}
            <p className="ml-6 text-gray-700 font-semibold">Authorized Signature</p>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="mt-10 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateView;
