import { useState } from 'react';
import { Edit, Trash2, Eye, User } from 'lucide-react';
import { accessLevelLabels, accessLevelColors } from '../../data/users';
import axios from 'axios';
// Import shadcn dialog components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useUsers } from '@/context/UserContext';

const UserTable = ({ data, getUsers }: any) => {
   const {  openEditModal } = useUsers();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleDeleteUser(id: any) {
    setDeleting(true);
    axios
      .delete(`users/delete/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('Token')}`,
        },
      })
      .then(() => {
        getUsers();
        setShowDelete(false);
        setSelectedUser(null);
      })
      .catch((error) => {
        // Optionally show error
        setShowDelete(false);
        setSelectedUser(null);
      })
      .finally(() => setDeleting(false));
  }

  return (
    <div className="overflow-hidden bg-white shadow-md rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Access Level</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.length > 0 ? (
              data.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-300 text-blue-700 font-bold text-lg shadow">
                        {user.first_name[0]}{user.last_name[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.inital && `${user.inital}.`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-800">{user.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-800">{user.project}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-800">{user.designation}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${accessLevelColors[user.acc_lvl]}`}>
                      {accessLevelLabels[user.acc_lvl] || `Level ${user.acc_lvl}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {/* View Details Dialog */}
                      <Dialog open={showDetails && selectedUser?.id === user.id} onOpenChange={(open) => { setShowDetails(open); if (!open) setSelectedUser(null); }}>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => { setSelectedUser(user); setShowDetails(true); }}
                            className="text-gray-500 hover:text-blue-600 transition-colors duration-150"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              <span className="flex flex-col items-center gap-2">
                                <span className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                                  <User className="h-12 w-12" />
                                </span>
                                <span className="text-xl font-semibold text-gray-900">
                                  {selectedUser?.first_name} {selectedUser?.last_name}
                                </span>
                                <span className="text-gray-500">{selectedUser?.email}</span>
                              </span>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">User Information</h4>
                            <div className="bg-gray-50 p-4 rounded-md space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-gray-500">Initial</p>
                                  <p className="text-sm font-medium">{selectedUser?.inital}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Designation</p>
                                  <p className="text-sm font-medium">{selectedUser?.designation}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-gray-500">Project</p>
                                  <p className="text-sm font-medium">{selectedUser?.project}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Access Level</p>
                                  <p className="text-sm font-medium">{accessLevelLabels[selectedUser?.acc_lvl] || `Level ${selectedUser?.acc_lvl}`}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 flex justify-end">
                            <DialogClose asChild>
                              <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                              >
                                Close
                              </button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {/* Edit Dialog */}
                     
                          <button
                            onClick={() => openEditModal(user)}
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-150"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                       
                      {/* Delete Confirmation Dialog */}
                      <Dialog open={showDelete && selectedUser?.id === user.id} onOpenChange={(open) => { setShowDelete(open); if (!open) setSelectedUser(null); }}>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => { setSelectedUser(user); setShowDelete(true); }}
                            className="text-red-500 hover:text-red-700 transition-colors duration-150"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Delete User</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete <b>{selectedUser?.first_name} {selectedUser?.last_name}</b>? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <button
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-150"
                                disabled={deleting}
                              >
                                Cancel
                              </button>
                            </DialogClose>
                            <button
                              onClick={() => handleDeleteUser(selectedUser?.id)}
                              className="inline-flex my-2 justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 transition-colors duration-150"
                              disabled={deleting}
                            >
                              {deleting ? "Deleting..." : `Delete, ${selectedUser?.first_name}`}
                            </button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No users found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;