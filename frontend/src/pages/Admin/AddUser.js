import React, { useState } from 'react';
import Sidebar from '../../components/admin/Common/Sidebar';
import Header from '../../components/admin/Common/Navbar';
import axios from 'axios';

const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        profilePicture: null,
        contactInfo: '',
        department: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profilePicture: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const formDataToSend = new FormData();
            for (let key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            await axios.post('/api/users', formDataToSend);
            alert("User created successfully");
            // Redirect or clear the form
        } catch (error) {
            console.error("There was an error creating the user!", error);
        }
    };

    const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
       <div className="flex">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className={`flex-1 transition-all duration-300 ease-in-out ${openSidebarToggle ? 'ml-64' : 'ml-20'}`}>
                <Header OpenSidebar={OpenSidebar} />
                <main className="p-6">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                Add New Instructor/Admin
            </h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">Role</label>
                        <select
                            name="role"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">Profile Picture (Optional)</label>
                        <input
                            type="file"
                            name="profilePicture"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium">Contact Information (Optional)</label>
                        <input
                            type="text"
                            name="contactInfo"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.contactInfo}
                            onChange={handleChange}
                        />
                    </div>
                    {formData.role === "Instructor" && (
                        <div className="form-group">
                            <label className="block text-gray-700 font-medium">Department/Faculty (Optional)</label>
                            <input
                                type="text"
                                name="department"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.department}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="mt-8 w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add User
                </button>
            </form>
        </div>
        </main>
        </div>
    </div>
    );
};

export default AddUser;
