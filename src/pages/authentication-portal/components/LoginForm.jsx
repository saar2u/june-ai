import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ mode, onLogin, onForgotPassword, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: ''
  });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const mockCredentials = {
    user: { email: 'user@juneai.com', password: 'user123' },
    admin: { email: 'admin@juneai.com', password: 'admin123', twoFactor: '123456' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }
    
    if (mode === 'admin' && showTwoFactor && !formData?.twoFactorCode) {
      newErrors.twoFactorCode = '2FA code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const credentials = mockCredentials?.[mode];
      
      if (formData?.email !== credentials?.email || formData?.password !== credentials?.password) {
        setErrors({ 
          email: `Invalid credentials. Use ${credentials?.email} / ${credentials?.password}${mode === 'admin' ? ' / 123456' : ''}` 
        });
        setIsLoading(false);
        return;
      }
      
      if (mode === 'admin' && !showTwoFactor) {
        setShowTwoFactor(true);
        setIsLoading(false);
        return;
      }
      
      if (mode === 'admin' && formData?.twoFactorCode !== credentials?.twoFactor) {
        setErrors({ twoFactorCode: 'Invalid 2FA code. Use 123456' });
        setIsLoading(false);
        return;
      }
      
      onLogin(formData, mode);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder={`Enter your ${mode} email`}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData?.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        error={errors?.password}
        required
        disabled={isLoading}
      />
      {mode === 'admin' && showTwoFactor && (
        <Input
          label="Two-Factor Authentication Code"
          type="text"
          name="twoFactorCode"
          value={formData?.twoFactorCode}
          onChange={handleInputChange}
          placeholder="Enter 6-digit code"
          error={errors?.twoFactorCode}
          required
          disabled={isLoading}
          description="Check your authenticator app for the code"
        />
      )}
      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-primary hover:text-primary/80 transition-colors"
          disabled={isLoading}
        >
          Forgot password?
        </button>
        
        {mode === 'admin' && (
          <div className="flex items-center text-text-secondary">
            <Icon name="Shield" size={16} className="mr-1" />
            <span>Secure Admin Access</span>
          </div>
        )}
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName={showTwoFactor ? "Shield" : "LogIn"}
        iconPosition="left"
        className="bg-primary hover:bg-primary/90"
      >
        {isLoading 
          ? (showTwoFactor ? 'Verifying 2FA...' : 'Signing In...') 
          : (showTwoFactor ? 'Verify & Sign In' : 'Sign In')
        }
      </Button>
      <div className="text-center">
        <span className="text-text-secondary text-sm">Don't have an account? </span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          disabled={isLoading}
        >
          Create one now
        </button>
      </div>
    </form>
  );
};

export default LoginForm;