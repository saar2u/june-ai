import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName = "Alex", currentTime = new Date() }) => {
  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Ready to unlock new possibilities with AI?",
      "Your intelligent workspace awaits your creativity",
      "Let\'s build something amazing together today",
      "Time to explore the future of AI collaboration"
    ];
    return messages?.[Math.floor(Math.random() * messages?.length)];
  };

  return (
    <div className="bg-gradient-to-r from-neural-deep via-quantum-deep to-neural-medium rounded-xl p-6 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
          <path
            d="M0,100 Q100,50 200,100 T400,100"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-neural-flow"
            strokeDasharray="10,5"
          />
          <path
            d="M0,120 Q100,70 200,120 T400,120"
            stroke="currentColor"
            strokeWidth="1"
            className="animate-neural-flow"
            strokeDasharray="5,3"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="Sparkles" size={24} className="text-energy-bright" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {getGreeting()}, {userName}!
              </h1>
              <p className="text-white/80 text-sm">
                {getMotivationalMessage()}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-white/60 text-xs uppercase tracking-wide">
              {currentTime?.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <p className="text-xl font-semibold">
              {currentTime?.toLocaleTimeString('en-US', { 
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-neural-pulse"></div>
            <span className="text-white/80">All systems operational</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-energy-bright" />
            <span className="text-white/80">4 AI models active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;