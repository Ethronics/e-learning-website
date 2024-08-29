import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Common/Sidebar';
import Header from '../../components/admin/Common/Navbar';
import axios from 'axios';

const AdminProfile = () => {
    const [profile, setProfile] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
        password: '',
        imageUrl: '/path/to/default-image.jpg', // Default profile image
    });

    useEffect(() => {
        // Fetch admin profile data from the local api.json
        axios.get('/dbs.json')
            .then((response) => {
                setProfile(response.data.profile);
            })
            .catch((error) => {
                console.error('Error fetching profile data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile({
                ...profile,
                imageUrl: reader.result, // This is a base64 string
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save profile changes logic using axios or similar
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
                <main className="p-6 bg-gray-100 min-h-screen">
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="flex items-center justify-center p-6 bg-gray-800">
                            <label htmlFor="profileImage" className="relative cursor-pointer">
                                <img
                                    src={profile.imageUrl}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <input
                                    id="profileImage"
                                    type="file"
                                    className="absolute inset-0 opacity-0"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Change Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={profile.password}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <p className="text-gray-600 text-xs italic">Leave blank to keep the current password</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminProfile;
