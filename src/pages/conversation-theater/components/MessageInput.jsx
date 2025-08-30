import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ 
  onSendMessage, 
  currentModel, 
  isLoading = false,
  placeholder = "Ask June anything..." 
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea?.scrollHeight, 200) + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() || attachments?.length > 0) {
      onSendMessage({
        content: message?.trim(),
        attachments: attachments,
        timestamp: new Date()
      });
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      type: file?.type?.startsWith('image/') ? 'image' : 'file',
      name: file?.name,
      size: file?.size,
      url: URL.createObjectURL(file)
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev?.filter(att => att?.id !== id));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const getModelPlaceholder = () => {
    switch (currentModel?.id) {
      case 'gpt-4':
        return "Ask me anything - I can help with analysis, writing, coding, and complex reasoning...";
      case 'claude':
        return "I'm here to provide thoughtful, nuanced responses to your questions...";
      case 'gemini':
        return "Share text, images, or complex queries - I can understand it all...";
      case 'llama':
        return "Let's explore ideas together with open-source intelligence...";
      default:
        return placeholder;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card border-t border-border p-4">
      {/* Attachments Preview */}
      {attachments?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {attachments?.map((attachment) => (
              <div
                key={attachment?.id}
                className="flex items-center space-x-2 bg-muted rounded-lg p-2 text-sm"
              >
                <Icon 
                  name={attachment?.type === 'image' ? 'Image' : 'File'} 
                  size={16} 
                  className="text-text-secondary"
                />
                <span className="text-text-primary">{attachment?.name}</span>
                <span className="text-text-tertiary">({formatFileSize(attachment?.size)})</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => removeAttachment(attachment?.id)}
                  className="h-4 w-4 p-0 text-text-tertiary hover:text-error"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-3">
          {/* Main Input Area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyDown={handleKeyDown}
              placeholder={getModelPlaceholder()}
              disabled={isLoading}
              className="w-full min-h-[44px] max-h-[200px] px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm leading-relaxed placeholder:text-text-tertiary disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
            />

            {/* Input Actions */}
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              {/* File Upload */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName="Paperclip"
                onClick={() => fileInputRef?.current?.click()}
                disabled={isLoading}
                className="h-8 w-8 p-0 text-text-secondary hover:text-primary"
              />

              {/* Voice Recording */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName={isRecording ? "Square" : "Mic"}
                onClick={toggleRecording}
                disabled={isLoading}
                className={`h-8 w-8 p-0 ${
                  isRecording 
                    ? 'text-error bg-error/10' :'text-text-secondary hover:text-primary'
                }`}
              />
            </div>
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            variant="default"
            size="sm"
            iconName={isLoading ? "Loader2" : "Send"}
            disabled={(!message?.trim() && attachments?.length === 0) || isLoading}
            className={`h-11 w-11 p-0 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft ${
              isLoading ? 'animate-spin' : ''
            }`}
          />
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileUpload}
          className="hidden"
        />
      </form>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Lightbulb"
            className="text-text-tertiary hover:text-primary text-xs"
          >
            Suggest
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Zap"
            className="text-text-tertiary hover:text-primary text-xs"
          >
            Quick Actions
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-text-tertiary">
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </div>
      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute inset-0 bg-error/5 border border-error/20 rounded-2xl flex items-center justify-center">
          <div className="flex items-center space-x-2 text-error">
            <div className="w-2 h-2 bg-error rounded-full animate-neural-pulse"></div>
            <span className="text-sm font-medium">Recording... Click to stop</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;