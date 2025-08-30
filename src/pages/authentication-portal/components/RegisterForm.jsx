import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const RegisterForm = ({ mode, onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (mode === 'admin' && !formData?.organization?.trim()) {
      newErrors.organization = 'Organization is required for admin accounts';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      onRegister(formData, mode);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData?.firstName}
          onChange={handleInputChange}
          placeholder="Enter first name"
          error={errors?.firstName}
          required
          disabled={isLoading}
        />
        
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData?.lastName}
          onChange={handleInputChange}
          placeholder="Enter last name"
          error={errors?.lastName}
          required
          disabled={isLoading}
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        error={errors?.email}
        required
        disabled={isLoading}
      />
      {mode === 'admin' && (
        <Input
          label="Organization"
          type="text"
          name="organization"
          value={formData?.organization}
          onChange={handleInputChange}
          placeholder="Enter your organization name"
          error={errors?.organization}
          required
          disabled={isLoading}
          description="This will be used for admin account verification"
        />
      )}
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData?.password}
        onChange={handleInputChange}
        placeholder="Create a strong password"
        error={errors?.password}
        required
        disabled={isLoading}
        description="Must be at least 8 characters long"
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm your password"
        error={errors?.confirmPassword}
        required
        disabled={isLoading}
      />
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          name="agreeToTerms"
          error={errors?.agreeToTerms}
          required
          disabled={isLoading}
        />
        
        <Checkbox
          label="Subscribe to product updates and AI insights newsletter"
          checked={formData?.subscribeNewsletter}
          onChange={handleInputChange}
          name="subscribeNewsletter"
          disabled={isLoading}
          description="Stay updated with the latest AI developments and June AI features"
        />
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="bg-primary hover:bg-primary/90"
      >
        {isLoading 
          ? 'Creating Account...' 
          : `Create ${mode === 'admin' ? 'Admin' : 'User'} Account`
        }
      </Button>
      <div className="text-center">
        <span className="text-text-secondary text-sm">Already have an account? </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          disabled={isLoading}
        >
          Sign in instead
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;