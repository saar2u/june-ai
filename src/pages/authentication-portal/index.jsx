import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthToggle from './components/AuthToggle';
import OAuthButtons from './components/OAuthButtons';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PreferenceQuiz from './components/PreferenceQuiz';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import LoadingState from './components/LoadingState';
import Icon from '../../components/AppIcon';

const AuthenticationPortal = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('user'); // 'user' or 'admin'
  const [view, setView] = useState('login'); // 'login', 'register', 'quiz', 'forgot', 'loading'
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Handle OAuth login
  const handleOAuthLogin = (provider) => {
    setIsLoading(true);
    setLoadingMessage(`Connecting with ${provider}...`);
    
    setTimeout(() => {
      if (mode === 'admin') {
        navigate('/administrative-console');
      } else {
        navigate('/ai-workspace-dashboard');
      }
    }, 2000);
  };

  // Handle form login
  const handleLogin = (formData, userMode) => {
    setIsLoading(true);
    setLoadingMessage('Signing you in...');
    
    setTimeout(() => {
      if (userMode === 'admin') {
        navigate('/administrative-console');
      } else {
        navigate('/ai-workspace-dashboard');
      }
    }, 1500);
  };

  // Handle registration
  const handleRegister = (formData, userMode) => {
    setIsLoading(true);
    setLoadingMessage('Creating your account...');
    
    setTimeout(() => {
      if (userMode === 'admin') {
        navigate('/administrative-console');
      } else {
        setView('quiz');
        setIsLoading(false);
      }
    }, 2000);
  };

  // Handle preference quiz completion
  const handleQuizComplete = (preferences) => {
    setIsLoading(true);
    setLoadingMessage('Personalizing your workspace...');
    
    setTimeout(() => {
      navigate('/ai-workspace-dashboard');
    }, 2000);
  };

  // Handle forgot password completion
  const handleResetComplete = () => {
    setView('login');
  };

  // Handle view switches
  const handleSwitchToRegister = () => setView('register');
  const handleSwitchToLogin = () => setView('login');
  const handleForgotPassword = () => setView('forgot');
  const handleSkipQuiz = () => navigate('/ai-workspace-dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoadingState message={loadingMessage} submessage="" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-5"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="100" cy="100" r="4" fill="var(--color-primary)" className="animate-neural-pulse" />
          <circle cx="300" cy="150" r="3" fill="var(--color-secondary)" className="animate-neural-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="200" cy="300" r="5" fill="var(--color-accent)" className="animate-neural-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="350" cy="250" r="3" fill="var(--color-primary)" className="animate-neural-pulse" style={{ animationDelay: '1.5s' }} />
          
          <path d="M100,100 Q200,50 300,150" stroke="var(--color-primary)" strokeWidth="1" opacity="0.3" strokeDasharray="5,5" className="animate-neural-flow" />
          <path d="M300,150 Q250,225 200,300" stroke="var(--color-secondary)" strokeWidth="1" opacity="0.3" strokeDasharray="3,3" className="animate-neural-flow" style={{ animationDelay: '0.7s' }} />
          <path d="M200,300 Q275,275 350,250" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" strokeDasharray="4,4" className="animate-neural-flow" style={{ animationDelay: '1.2s' }} />
        </svg>
        
        <div className="absolute top-1/2 right-1/4 w-64 h-64 neural-gradient rounded-full opacity-5 blur-3xl animate-neural-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 energy-gradient rounded-full opacity-5 blur-2xl animate-neural-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 neural-gradient rounded-lg flex items-center justify-center shadow-neural">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neural-gradient">June AI</h1>
                <p className="text-xs text-text-secondary -mt-1">Intelligent Partner</p>
              </div>
            </div>
            
            {view !== 'quiz' && view !== 'forgot' && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  {view === 'login' ? 'Welcome back' : 'Join June AI'}
                </h2>
                <p className="text-text-secondary">
                  {view === 'login' ? 'Sign in to continue your AI journey' : 'Create your intelligent workspace'}
                </p>
              </div>
            )}
          </div>

          {/* Main Content Card */}
          <div className="bg-card border border-border rounded-xl shadow-elevated p-6 backdrop-blur-sm">
            {view === 'quiz' ? (
              <PreferenceQuiz 
                onComplete={handleQuizComplete}
                onSkip={handleSkipQuiz}
              />
            ) : view === 'forgot' ? (
              <ForgotPasswordForm
                onBack={handleSwitchToLogin}
                onResetComplete={handleResetComplete}
              />
            ) : (
              <>
                {/* Auth Mode Toggle */}
                <AuthToggle mode={mode} onModeChange={setMode} />

                {/* OAuth Buttons */}
                <OAuthButtons mode={mode} onOAuthLogin={handleOAuthLogin} />

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-border"></div>
                  <span className="px-3 text-sm text-text-secondary bg-card">
                    or continue with email
                  </span>
                  <div className="flex-1 border-t border-border"></div>
                </div>

                {/* Login/Register Forms */}
                {view === 'login' ? (
                  <LoginForm
                    mode={mode}
                    onLogin={handleLogin}
                    onForgotPassword={handleForgotPassword}
                    onSwitchToRegister={handleSwitchToRegister}
                  />
                ) : (
                  <RegisterForm
                    mode={mode}
                    onRegister={handleRegister}
                    onSwitchToLogin={handleSwitchToLogin}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {view !== 'quiz' && view !== 'forgot' && (
            <div className="text-center mt-6 space-y-2">
              <p className="text-xs text-text-secondary">
                By continuing, you agree to our{' '}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </a>
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-xs text-text-tertiary">
                <span>© {new Date()?.getFullYear()} June AI</span>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">Help</a>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Floating Elements */}
      <div className="absolute top-8 right-8 hidden lg:block">
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Shield" size={16} />
          <span className="text-xs">Enterprise Security</span>
        </div>
      </div>
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="flex items-center space-x-2 text-text-secondary">
          <div className="w-2 h-2 bg-success rounded-full animate-neural-pulse"></div>
          <span className="text-xs">All systems operational</span>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPortal;