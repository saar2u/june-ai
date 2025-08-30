import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, onRegenerate, onCopy, onBranch }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(message?.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onCopy?.(message);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getModelColor = (modelId) => {
    switch (modelId) {
      case 'gpt-4': return 'border-neural-deep/20 bg-neural-deep/5';
      case 'claude': return 'border-quantum-deep/20 bg-quantum-deep/5';
      case 'gemini': return 'border-energy-bright/20 bg-energy-bright/5';
      case 'llama': return 'border-warning/20 bg-warning/5';
      default: return 'border-border bg-muted/30';
    }
  };

  const getModelIcon = (modelId) => {
    switch (modelId) {
      case 'gpt-4': return 'Zap';
      case 'claude': return 'Brain';
      case 'gemini': return 'Sparkles';
      case 'llama': return 'Code';
      default: return 'Bot';
    }
  };

  if (message?.sender === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div 
          className="max-w-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 shadow-soft">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message?.content}
            </p>
          </div>
          
          <div className="flex items-center justify-end mt-2 space-x-2">
            <span className="text-xs text-text-tertiary">
              {formatTime(message?.timestamp)}
            </span>
            
            {isHovered && (
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  onClick={handleCopy}
                  className="h-6 w-6 p-0 text-text-tertiary hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  className="h-6 w-6 p-0 text-text-tertiary hover:text-text-primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6">
      <div 
        className="max-w-4xl w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* AI Model Header */}
        <div className="flex items-center space-x-2 mb-2">
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center
            ${getModelColor(message?.modelId)}
          `}>
            <Icon name={getModelIcon(message?.modelId)} size={14} />
          </div>
          <span className="text-xs font-medium text-text-secondary capitalize">
            {message?.modelId}
          </span>
          {message?.isStreaming && (
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-success rounded-full animate-neural-pulse"></div>
              <span className="text-xs text-success">Thinking...</span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`
          border rounded-2xl rounded-tl-md px-4 py-3 bg-card shadow-soft
          ${getModelColor(message?.modelId)}
        `}>
          {message?.isStreaming ? (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-text-secondary">
                {message?.processingMessage || 'Analyzing your request...'}
              </span>
            </div>
          ) : (
            <>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm leading-relaxed text-text-primary whitespace-pre-wrap mb-0">
                  {message?.content}
                </p>
              </div>

              {/* Attachments or Code Blocks */}
              {message?.attachments && message?.attachments?.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message?.attachments?.map((attachment, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3">
                      {attachment?.type === 'code' && (
                        <div className="font-mono text-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-text-secondary">{attachment?.language}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Copy"
                              className="h-6 w-6 p-0 text-text-tertiary hover:text-text-primary"
                            />
                          </div>
                          <pre className="text-text-primary overflow-x-auto">
                            <code>{attachment?.content}</code>
                          </pre>
                        </div>
                      )}
                      
                      {attachment?.type === 'image' && (
                        <img 
                          src={attachment?.url} 
                          alt={attachment?.alt}
                          className="max-w-full h-auto rounded-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Context Indicators */}
              {message?.context && message?.context?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center space-x-2 text-xs text-text-tertiary">
                    <Icon name="Link" size={12} />
                    <span>Referenced: {message?.context?.join(', ')}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!message?.isStreaming && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-text-tertiary">
              {formatTime(message?.timestamp)}
            </span>
            
            {isHovered && (
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={isCopied ? "Check" : "Copy"}
                  onClick={handleCopy}
                  className="h-6 w-6 p-0 text-text-tertiary hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={() => onRegenerate?.(message)}
                  className="h-6 w-6 p-0 text-text-tertiary hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="GitBranch"
                  onClick={() => onBranch?.(message)}
                  className="h-6 w-6 p-0 text-text-tertiary hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ThumbsUp"
                  className="h-6 w-6 p-0 text-text-tertiary hover:text-success"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ThumbsDown"
                  className="h-6 w-6 p-0 text-text-tertiary hover:text-error"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;