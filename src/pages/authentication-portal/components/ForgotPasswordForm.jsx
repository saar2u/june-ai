import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = ({ onBack, onResetComplete }) => {
  const [step, setStep] = useState('email'); // email, security, reset, success
  const [formData, setFormData] = useState({
    email: '',
    securityAnswer: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const mockSecurityQuestion = "What was the name of your first pet?";
  const mockSecurityAnswer = "fluffy";

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = () => {
    if (!formData?.email) {
      setErrors({ email: 'Email is required' });
      return false;
    }
    if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      setErrors({ email: 'Please enter a valid email' });
      return false;
    }
    return true;
  };

  const validateSecurity = () => {
    if (!formData?.securityAnswer?.trim()) {
      setErrors({ securityAnswer: 'Security answer is required' });
      return false;
    }
    if (formData?.securityAnswer?.toLowerCase() !== mockSecurityAnswer) {
      setErrors({ securityAnswer: 'Incorrect answer. Try "fluffy"' });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!formData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (step === 'email') {
        if (validateEmail()) {
          setStep('security');
        }
      } else if (step === 'security') {
        if (validateSecurity()) {
          setStep('reset');
        }
      } else if (step === 'reset') {
        if (validatePassword()) {
          setStep('success');
          setTimeout(() => {
            onResetComplete();
          }, 2000);
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const renderEmailStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Reset Your Password
        </h2>
        <p className="text-text-secondary">
          Enter your email address and we'll help you reset your password
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your registered email"
        error={errors?.email}
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="ArrowRight"
        iconPosition="right"
        className="bg-primary hover:bg-primary/90"
      >
        {isLoading ? 'Verifying...' : 'Continue'}
      </Button>
    </div>
  );

  const renderSecurityStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Security Verification
        </h2>
        <p className="text-text-secondary">
          Please answer your security question to verify your identity
        </p>
      </div>

      <div className="bg-muted rounded-lg p-4 mb-4">
        <p className="font-medium text-text-primary">
          {mockSecurityQuestion}
        </p>
      </div>

      <Input
        label="Your Answer"
        type="text"
        name="securityAnswer"
        value={formData?.securityAnswer}
        onChange={handleInputChange}
        placeholder="Enter your answer"
        error={errors?.securityAnswer}
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="ArrowRight"
        iconPosition="right"
        className="bg-secondary hover:bg-secondary/90"
      >
        {isLoading ? 'Verifying...' : 'Verify Answer'}
      </Button>
    </div>
  );

  const renderResetStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Key" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Create New Password
        </h2>
        <p className="text-text-secondary">
          Choose a strong password for your account
        </p>
      </div>

      <Input
        label="New Password"
        type="password"
        name="newPassword"
        value={formData?.newPassword}
        onChange={handleInputChange}
        placeholder="Enter new password"
        error={errors?.newPassword}
        required
        disabled={isLoading}
        description="Must be at least 8 characters long"
      />

      <Input
        label="Confirm New Password"
        type="password"
        name="confirmPassword"
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm new password"
        error={errors?.confirmPassword}
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="Check"
        iconPosition="right"
        className="bg-success hover:bg-success/90"
      >
        {isLoading ? 'Updating...' : 'Update Password'}
      </Button>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-4">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="CheckCircle" size={40} className="text-success" />
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">
        Password Reset Successful!
      </h2>
      <p className="text-text-secondary mb-6">
        Your password has been updated successfully. You can now sign in with your new password.
      </p>
      <div className="animate-neural-pulse">
        <Icon name="Loader" size={24} className="text-primary mx-auto" />
        <p className="text-sm text-text-secondary mt-2">
          Redirecting to sign in...
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        {step === 'email' && renderEmailStep()}
        {step === 'security' && renderSecurityStep()}
        {step === 'reset' && renderResetStep()}
        {step === 'success' && renderSuccessStep()}
      </form>

      {step !== 'success' && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={onBack}
            className="text-text-secondary hover:text-primary transition-colors text-sm"
            disabled={isLoading}
          >
            ← Back to sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;