import React from 'react';
import { UserPlus, Users, LayoutDashboard, Settings, LogOut, ProjectorIcon, PenBoxIcon } from 'lucide-react';
import { useUsers } from '../../context/UserContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { openCreateModal } = useUsers();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex w-64 flex-col">
        <div className="flex flex-col flex-grow items-center justify-center pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-col gap-2 ">
            <img className=' h-44 object-contain'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Department_of_Information_and_Communications_Technology_%28DICT%29.svg/330px-Department_of_Information_and_Communications_Technology_%28DICT%29.svg.png" alt="" />

            <div className=' flex flex-col items-center justify-center bg-blue-500 p-1 rounded-sm'>
              <h1 className=' text-[8px] text-white'>Region-10</h1>

            </div>
            
            {/* <h1 className="text-xl font-semibold  text-white">Admin Portal</h1> */}
          </div>
          <div className="flex flex-col flex-grow px-4 mt-10 gap-5">
            <nav className="flex flex-col gap-3">
              <a href="#" className="flex items-center px-4 py-2 hover:text-blue-600 text-gray-600 rounded-lg hover:bg-gray-100">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 mr-3" />
                User Management
              </a>
              <a href="#" className="flex items-center px-4 py-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <PenBoxIcon className="w-5 h-5 mr-3" />
                Project Managemnet
              </a>
              <a href="#" className="flex items-center px-4 py-2 hover:text-blue-600 text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </a>
            </nav>
          </div>
          <div className="flex flex-shrink-0 p-4 border-t">
            <button className="flex items-center w-full px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-lg font-semibold text-gray-800 md:hidden">Admin Portal</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={openCreateModal}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;