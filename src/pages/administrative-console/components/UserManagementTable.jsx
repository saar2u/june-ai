import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      role: "Data Scientist",
      department: "Analytics",
      status: "active",
      lastActive: "2025-08-30T13:45:00",
      conversationsCount: 127,
      integrationsUsed: 3,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      email: "marcus.r@company.com",
      role: "Product Manager",
      department: "Product",
      status: "active",
      lastActive: "2025-08-30T14:12:00",
      conversationsCount: 89,
      integrationsUsed: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Watson",
      email: "e.watson@company.com",
      role: "DevOps Engineer",
      department: "Engineering",
      status: "inactive",
      lastActive: "2025-08-29T16:30:00",
      conversationsCount: 45,
      integrationsUsed: 2,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@company.com",
      role: "Marketing Director",
      department: "Marketing",
      status: "suspended",
      lastActive: "2025-08-28T10:15:00",
      conversationsCount: 203,
      integrationsUsed: 4,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.t@company.com",
      role: "UX Designer",
      department: "Design",
      status: "active",
      lastActive: "2025-08-30T11:20:00",
      conversationsCount: 156,
      integrationsUsed: 3,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Active' },
      inactive: { color: 'bg-warning/10 text-warning', label: 'Inactive' },
      suspended: { color: 'bg-error/10 text-error', label: 'Suspended' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatLastActive = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">User Management</h3>
            <p className="text-sm text-text-secondary mt-1">
              Manage user accounts, permissions, and access controls
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full sm:w-40"
            />
            
            <Button variant="default" iconName="UserPlus" iconPosition="left">
              Add User
            </Button>
          </div>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="px-6 py-3 bg-muted/30 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Mail">
                Send Message
              </Button>
              <Button variant="outline" size="sm" iconName="Shield">
                Manage Permissions
              </Button>
              <Button variant="destructive" size="sm" iconName="UserX">
                Suspend Users
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">User</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Department</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Activity</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Usage</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => handleUserSelect(user?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-text-primary">{user?.name}</div>
                      <div className="text-sm text-text-secondary">{user?.email}</div>
                      <div className="text-xs text-text-tertiary">{user?.role}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-primary">{user?.department}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(user?.status)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">
                    {formatLastActive(user?.lastActive)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="text-text-primary">{user?.conversationsCount} chats</div>
                    <div className="text-text-secondary">{user?.integrationsUsed} integrations</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            Showing {filteredUsers?.length} of {users?.length} users
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" iconName="ChevronRight">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;