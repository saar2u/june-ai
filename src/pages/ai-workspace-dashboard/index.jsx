import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import WelcomeHeader from './components/WelcomeHeader';
import QuickAccessTiles from './components/QuickAccessTiles';
import ModelSwitcher from './components/ModelSwitcher';
import ActivityFeed from './components/ActivityFeed';
import ProductivityMetrics from './components/ProductivityMetrics';
import IntegrationStatus from './components/IntegrationStatus';
import ConversationHistory from './components/ConversationHistory';

import Button from '../../components/ui/Button';

const AIWorkspaceDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModel, setActiveModel] = useState('gpt-4');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('Alex'); // Mock user name

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleModelChange = (modelId) => {
    setActiveModel(modelId);
    // Here you would typically update the global state or make an API call
    console.log('Model changed to:', modelId);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <Helmet>
        <title>AI Workspace Dashboard - June AI</title>
        <meta name="description" content="Your personalized AI workspace dashboard with model switching, conversation management, and productivity insights." />
        <meta name="keywords" content="AI workspace, dashboard, conversation management, productivity, AI models" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
        />

        {/* Main Content */}
        <main 
          className={`
            transition-all duration-300 pt-16
            ${sidebarCollapsed ? 'ml-16' : 'ml-72'}
          `}
        >
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Welcome Header */}
            <WelcomeHeader userName={userName} currentTime={currentTime} />

            {/* Quick Access Section */}
            <QuickAccessTiles />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Model Switcher & Activity */}
              <div className="lg:col-span-1 space-y-6">
                <ModelSwitcher 
                  activeModel={activeModel}
                  onModelChange={handleModelChange}
                />
                <ActivityFeed />
              </div>

              {/* Right Column - Metrics & History */}
              <div className="lg:col-span-2 space-y-6">
                <ProductivityMetrics />
                <ConversationHistory />
              </div>
            </div>

            {/* Integration Status - Full Width */}
            <IntegrationStatus />

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 lg:hidden z-50">
              <Button
                variant="default"
                size="icon"
                iconName="MessageSquare"
                className="w-14 h-14 rounded-full bg-cta hover:bg-cta/90 text-cta-foreground shadow-elevated"
                onClick={() => window.location.href = '/conversation-theater'}
              />
            </div>

            {/* Neural Network Background Animation */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
              <svg
                className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5"
                viewBox="0 0 256 256"
                fill="none"
              >
                <circle cx="128" cy="64" r="4" fill="var(--color-primary)">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="64" cy="128" r="4" fill="var(--color-secondary)">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="192" cy="128" r="4" fill="var(--color-accent)">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="128" cy="192" r="4" fill="var(--color-primary)">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
                
                <path d="M128,64 L64,128 L128,192 L192,128 Z" stroke="var(--color-primary)" strokeWidth="1" fill="none" opacity="0.1">
                  <animate attributeName="stroke-dasharray" values="0,400;200,200;400,0" dur="4s" repeatCount="indefinite" />
                </path>
              </svg>

              <svg
                className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-3"
                viewBox="0 0 192 192"
                fill="none"
              >
                <path
                  d="M32,96 Q96,32 160,96 Q96,160 32,96"
                  stroke="var(--color-secondary)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-neural-flow"
                  strokeDasharray="10,5"
                />
              </svg>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AIWorkspaceDashboard;