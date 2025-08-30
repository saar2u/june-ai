import React from 'react';


const LoadingState = ({ message, submessage }) => {
  const loadingMessages = [
    {
      main: "Preparing your AI workspace",
      sub: "Setting up personalized dashboard..."
    },
    {
      main: "Connecting your intelligence network",
      sub: "Initializing AI models and preferences..."
    },
    {
      main: "Calibrating neural pathways",
      sub: "Optimizing for your work style..."
    },
    {
      main: "Activating June AI systems",
      sub: "Almost ready to begin..."
    }
  ];

  const currentMessage = message ? { main: message, sub: submessage } : 
    loadingMessages?.[Math.floor(Math.random() * loadingMessages?.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      {/* Animated Logo */}
      <div className="relative mb-8">
        <div className="w-20 h-20 neural-gradient rounded-xl flex items-center justify-center shadow-neural animate-neural-pulse">
          <svg
            width="40"
            height="40"
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
        
        {/* Orbital Animation */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent rounded-full -translate-x-1/2 -translate-y-1"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
          <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-secondary rounded-full -translate-x-1/2 translate-y-1"></div>
        </div>
      </div>
      {/* Loading Text */}
      <div className="space-y-2 mb-8">
        <h3 className="text-xl font-semibold text-text-primary">
          {currentMessage?.main}
        </h3>
        <p className="text-text-secondary">
          {currentMessage?.sub}
        </p>
      </div>
      {/* Progress Indicators */}
      <div className="flex items-center space-x-2 mb-6">
        {[...Array(4)]?.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 bg-primary rounded-full animate-neural-pulse"
            style={{ 
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1.5s'
            }}
          ></div>
        ))}
      </div>
      {/* Neural Network Animation */}
      <div className="relative w-64 h-16 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 256 64"
          fill="none"
        >
          <path
            d="M0,32 Q64,16 128,32 T256,32"
            stroke="url(#loading-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-neural-flow"
            strokeDasharray="20,10"
          />
          <path
            d="M0,24 Q64,40 128,24 T256,24"
            stroke="url(#loading-gradient)"
            strokeWidth="1"
            fill="none"
            className="animate-neural-flow"
            strokeDasharray="15,8"
            style={{ animationDelay: '0.5s' }}
          />
          <path
            d="M0,40 Q64,8 128,40 T256,40"
            stroke="url(#loading-gradient)"
            strokeWidth="1"
            fill="none"
            className="animate-neural-flow"
            strokeDasharray="12,6"
            style={{ animationDelay: '1s' }}
          />
          <defs>
            <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Status Text */}
      <p className="text-xs text-text-tertiary mt-4">
        This may take a few moments...
      </p>
    </div>
  );
};

export default LoadingState;