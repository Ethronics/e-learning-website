import React from 'react';

function AdminDashboard() {
    return (
        <div className="p-6">
            {/* Admin Profile Section */}
            <div className="flex items-center mb-8">
                <img
                    src="https://via.placeholder.com/100" // Replace with actual profile image URL
                    alt="Admin Profile"
                    className="w-24 h-24 rounded-full mr-4"
                />
                <div>
                    <h1 className="text-4xl font-bold">Admin Name</h1> {/* Replace with actual admin name */}
                    <p className="text-lg text-gray-600">Administrator</p>
                </div>
            </div>

            {/* Dashboard Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pending Payments Box */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition duration-300">
                    <h2 className="text-2xl font-semibold mb-2">Pending Payments</h2>
                    <p className="text-3xl font-bold text-blue-600">15</p> {/* Replace with dynamic data */}
                    <p className="text-sm text-gray-500">Payments waiting for approval</p>
                </div>

                {/* Users Box */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-green-50 transition duration-300">
                    <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
                    <p className="text-3xl font-bold text-green-600">1,230</p> {/* Replace with dynamic data */}
                    <p className="text-sm text-gray-500">Registered users</p>
                </div>

                {/* Pending Courses Box */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-yellow-50 transition duration-300">
                    <h2 className="text-2xl font-semibold mb-2">Pending Courses</h2>
                    <p className="text-3xl font-bold text-yellow-600">8</p> {/* Replace with dynamic data */}
                    <p className="text-sm text-gray-500">Courses waiting for approval</p>
                </div>

                {/* Exam Management Box */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-red-50 transition duration-300">
                    <h2 className="text-2xl font-semibold mb-2">Manage Exams</h2>
                    <p className="text-3xl font-bold text-red-600">View</p>
                    <p className="text-sm text-gray-500">Manage exams and assessments</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
