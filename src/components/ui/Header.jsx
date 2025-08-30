import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const primaryNavItems = [
    { path: '/homepage', label: 'Home', icon: 'Home' },
    { path: '/ai-model-marketplace', label: 'AI Models', icon: 'Zap' },
    { path: '/ai-workspace-dashboard', label: 'Workspace', icon: 'Layout' },
    { path: '/conversation-theater', label: 'Conversations', icon: 'MessageSquare' },
  ];

  const secondaryNavItems = [
    { path: '/administrative-console', label: 'Admin', icon: 'Settings' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const Logo = () => (
    <Link to="/homepage" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 neural-gradient rounded-lg flex items-center justify-center shadow-neural">
          <svg
            width="24"
            height="24"
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
              className="animate-neural-pulse"
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
        <div className="absolute -inset-1 neural-gradient rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-neural-gradient tracking-tight">
          June AI
        </span>
        <span className="text-xs text-text-secondary font-medium -mt-1">
          Intelligent Partner
        </span>
      </div>
    </Link>
  );

  const NavLink = ({ item, isMobile = false }) => (
    <Link
      to={item?.path}
      className={`
        group relative flex items-center space-x-2 px-3 py-2 rounded-lg
        transition-all duration-300 font-medium
        ${isActivePath(item?.path)
          ? 'text-primary bg-primary/5 shadow-soft'
          : 'text-text-secondary hover:text-primary hover:bg-muted/50'
        }
        ${isMobile ? 'w-full justify-start' : ''}
      `}
    >
      <Icon 
        name={item?.icon} 
        size={18} 
        className={`
          transition-colors duration-300
          ${isActivePath(item?.path) ? 'text-primary' : 'text-current'}
        `}
      />
      <span className="text-sm">{item?.label}</span>
      {isActivePath(item?.path) && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg -z-10"></div>
      )}
    </Link>
  );

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-header
        transition-all duration-300 backdrop-blur-md
        ${isScrolled 
          ? 'bg-background/95 border-b border-border shadow-soft' 
          : 'bg-background/80'
        }
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <NavLink key={item?.path} item={item} />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* More Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                className="text-text-secondary hover:text-primary"
              >
                More
              </Button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-dropdown">
                <div className="bg-popover border border-border rounded-lg shadow-elevated p-2">
                  {secondaryNavItems?.map((item) => (
                    <NavLink key={item?.path} item={item} isMobile />
                  ))}
                  <div className="border-t border-border my-2"></div>
                  <Link
                    to="/authentication-portal"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <Icon name="User" size={16} />
                    <span>Account</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="default"
              size="sm"
              iconName="Sparkles"
              iconPosition="left"
              className="bg-cta hover:bg-cta/90 text-cta-foreground shadow-soft"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            className="lg:hidden text-text-secondary hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-neural
            ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <nav className="px-4 pb-4 space-y-1 border-t border-border bg-background/95">
            {primaryNavItems?.map((item) => (
              <NavLink key={item?.path} item={item} isMobile />
            ))}
            
            <div className="border-t border-border my-3"></div>
            
            {secondaryNavItems?.map((item) => (
              <NavLink key={item?.path} item={item} isMobile />
            ))}
            
            <Link
              to="/authentication-portal"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted/50 rounded-md transition-colors w-full"
            >
              <Icon name="User" size={16} />
              <span>Account</span>
            </Link>

            <div className="pt-3">
              <Button
                variant="default"
                size="sm"
                iconName="Sparkles"
                iconPosition="left"
                fullWidth
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
              >
                Start Free Trial
              </Button>
            </div>
          </nav>
        </div>
      </div>
      {/* Neural Network Background Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-1/4 w-32 h-16 opacity-5"
          viewBox="0 0 128 64"
          fill="none"
        >
          <path
            d="M0,32 Q32,16 64,32 T128,32"
            stroke="url(#neural-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-neural-flow"
            strokeDasharray="10,5"
          />
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </header>
  );
};

export default Header;