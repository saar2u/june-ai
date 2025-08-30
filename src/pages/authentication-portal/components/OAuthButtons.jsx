import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OAuthButtons = ({ mode, onOAuthLogin }) => {
  const oauthProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-50 hover:border-red-200',
      textColor: 'text-red-600'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      color: 'hover:bg-blue-50 hover:border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'hover:bg-gray-50 hover:border-gray-200',
      textColor: 'text-gray-700'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="text-center mb-4">
        <p className="text-sm text-text-secondary">
          {mode === 'admin' ? 'Admin Sign In' : 'Continue with your account'}
        </p>
      </div>
      {oauthProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          fullWidth
          onClick={() => onOAuthLogin(provider?.id)}
          className={`
            justify-center space-x-3 py-3 border-2 transition-all duration-300
            ${provider?.color}
          `}
        >
          <Icon 
            name={provider?.icon} 
            size={20} 
            className={provider?.textColor}
          />
          <span className="font-medium">
            Continue with {provider?.name}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default OAuthButtons;