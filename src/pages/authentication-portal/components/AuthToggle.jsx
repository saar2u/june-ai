import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthToggle = ({ mode, onModeChange }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-muted rounded-lg p-1 flex">
        <button
          onClick={() => onModeChange('user')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300
            ${mode === 'user' ?'bg-primary text-primary-foreground shadow-soft' :'text-text-secondary hover:text-primary'
            }
          `}
        >
          <Icon name="User" size={18} />
          <span className="font-medium">User</span>
        </button>
        <button
          onClick={() => onModeChange('admin')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300
            ${mode === 'admin' ?'bg-primary text-primary-foreground shadow-soft' :'text-text-secondary hover:text-primary'
            }
          `}
        >
          <Icon name="Shield" size={18} />
          <span className="font-medium">Admin</span>
        </button>
      </div>
    </div>
  );
};

export default AuthToggle;