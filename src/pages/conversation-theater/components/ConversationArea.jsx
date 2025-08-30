import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ConversationArea = ({ 
  messages, 
  isLoading, 
  onMessageRegenerate, 
  onMessageCopy, 
  onMessageBranch 
}) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 neural-gradient rounded-2xl flex items-center justify-center">
          <svg
            width="32"
            height="32"
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
        
        <h3 className="text-xl font-semibold text-text-primary mb-3">
          Welcome to June AI
        </h3>
        
        <p className="text-text-secondary mb-6 leading-relaxed">
          Your intelligent conversation partner is ready to help. Ask questions, explore ideas, 
          or get assistance with any task. I can adapt my responses based on your needs.
        </p>
        
        <div className="grid grid-cols-1 gap-3 text-left">
          <div className="p-3 bg-muted rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-neural-deep rounded-full"></div>
              <span className="text-sm font-medium text-text-primary">Creative Writing</span>
            </div>
            <p className="text-xs text-text-secondary">
              "Help me write a compelling story about..."
            </p>
          </div>
          
          <div className="p-3 bg-muted rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-quantum-deep rounded-full"></div>
              <span className="text-sm font-medium text-text-primary">Data Analysis</span>
            </div>
            <p className="text-xs text-text-secondary">
              "Analyze this data and provide insights..."
            </p>
          </div>
          
          <div className="p-3 bg-muted rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-energy-bright rounded-full"></div>
              <span className="text-sm font-medium text-text-primary">Code Assistance</span>
            </div>
            <p className="text-xs text-text-secondary">
              "Debug this code or explain how it works..."
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (messages?.length === 0) {
    return <EmptyState />;
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-6 space-y-6"
    >
      {/* Conversation Start Indicator */}
      <div className="text-center py-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-muted rounded-full text-xs text-text-secondary">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>Conversation started</span>
        </div>
      </div>
      {/* Messages */}
      {messages?.map((message) => (
        <MessageBubble
          key={message?.id}
          message={message}
          onRegenerate={onMessageRegenerate}
          onCopy={onMessageCopy}
          onBranch={onMessageBranch}
        />
      ))}
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-4xl w-full">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-neural-deep/10 flex items-center justify-center">
                <div className="w-3 h-3 bg-neural-deep rounded-full animate-neural-pulse"></div>
              </div>
              <span className="text-xs font-medium text-text-secondary">
                June AI is thinking...
              </span>
            </div>
            
            <div className="border border-neural-deep/20 bg-neural-deep/5 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neural-deep rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neural-deep rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neural-deep rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-text-secondary">
                  Analyzing your request and preparing response...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
      {/* Neural Network Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-1/4 left-1/4 w-64 h-32 opacity-2"
          viewBox="0 0 256 128"
          fill="none"
        >
          <path
            d="M0,64 Q64,32 128,64 T256,64"
            stroke="url(#conversation-gradient)"
            strokeWidth="1"
            fill="none"
            className="animate-neural-flow"
            strokeDasharray="8,4"
          />
          <defs>
            <linearGradient id="conversation-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default ConversationArea;