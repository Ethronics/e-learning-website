import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTachometerAlt, faUsers, faBook, faChartLine, faNewspaper, faFileAlt, faCogs, faClipboardList, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={`bg-gray-800 text-white min-h-screen transition-all duration-300 ease-in-out ${openSidebarToggle ? 'w-64' : 'w-20'} fixed left-0 top-0`}>
      <div className="toggle-button p-4 cursor-pointer" onClick={OpenSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul className="sidebar-list mt-10 space-y-4">
        <li className="sidebar-list-item px-4 py-2">
          <Link to="/" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span className={`${openSidebarToggle ? 'block' : 'hidden'} transition-all`}>Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-list-item px-4 py-2">
          <Link to="/users" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUsers} />
            <span className={`${openSidebarToggle ? 'block' : 'hidden'} transition-all`}>User Management</span>
          </Link>
        </li>
        <li className="sidebar-list-item px-4 py-2">
          <Link to="/courses" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faBook} />
            <span className={`${openSidebarToggle ? 'block' : 'hidden'} transition-all`}>Content Approve</span>
          </Link>
        </li>
        <li className="sidebar-list-item px-4 py-2">
          <Link to="/admin/payments" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faChartLine} />
            <span className={`${openSidebarToggle ? 'block' : 'hidden'} transition-all`}>Payment Approve</span>
          </Link>
        </li>
        <li className="sidebar-list-item px-4 py-2">
          <Link to="/blog" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faNewspaper} />
            <span className={`${openSidebarToggle ? 'block' : 'hidden'} transition-all`}>Post Blogs/News</span>
          </Link>
        </li>
        <li className="sidebar-list-item px-4 py-2">
          <Link to="/exam" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faFileAlt} />
            <span className={`${openSidebarToggle ? 'block' : 'hidden'} transition-all`}>Exam Management</span>
          </Link>
        </li>
        <li className="sidebar-list-item px-4 py-2">
          <Link to="/rbac" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faProjectDiagram} />
            <span className={`${openSidebarToggle ? 'block' : 'hidden'} transition-all`}>Add New User</span>
          </Link>
        </li>
        <li className="sidebar-list-item px-4 py-2">
          <Link to="/curriculum" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCogs} />
            <span className={`${openSidebarToggle ? 'block' : 'hidden'} transition-all`}>New Curriculum</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
