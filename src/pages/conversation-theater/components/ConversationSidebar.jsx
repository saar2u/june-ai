import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationSidebar = ({ 
  isOpen, 
  onClose, 
  conversations, 
  currentConversationId, 
  onConversationSelect,
  onNewConversation 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Chats', icon: 'MessageSquare' },
    { id: 'recent', label: 'Recent', icon: 'Clock' },
    { id: 'favorites', label: 'Favorites', icon: 'Star' },
    { id: 'archived', label: 'Archived', icon: 'Archive' }
  ];

  const filteredConversations = conversations?.filter(conv => {
    const matchesSearch = conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conv?.preview?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'recent') return matchesSearch && conv?.isRecent;
    if (selectedCategory === 'favorites') return matchesSearch && conv?.isFavorite;
    if (selectedCategory === 'archived') return matchesSearch && conv?.isArchived;
    
    return matchesSearch;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = (now - time) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return time?.toLocaleDateString();
  };

  const getModelColor = (modelId) => {
    switch (modelId) {
      case 'gpt-4': return 'text-neural-deep';
      case 'claude': return 'text-quantum-deep';
      case 'gemini': return 'text-energy-medium';
      case 'llama': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-overlay lg:hidden"
          onClick={onClose}
        ></div>
      )}
      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 bottom-0 w-80 bg-card border-r border-border z-sidebar
        transform transition-transform duration-300 ease-neural
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:top-0 lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text-primary">Conversations</h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onClose}
                className="lg:hidden text-text-secondary hover:text-primary"
              />
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>

            {/* New Conversation Button */}
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={onNewConversation}
              fullWidth
              className="bg-cta hover:bg-cta/90 text-cta-foreground"
            >
              New Conversation
            </Button>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => setSelectedCategory(category?.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                    ${selectedCategory === category?.id
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
                    }
                  `}
                >
                  <Icon name={category?.icon} size={14} />
                  <span>{category?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="MessageSquare" size={48} className="mx-auto text-text-tertiary mb-4" />
                <p className="text-text-secondary text-sm">
                  {searchQuery ? 'No conversations found' : 'Start your first conversation'}
                </p>
              </div>
            ) : (
              <div className="p-2">
                {filteredConversations?.map((conversation) => (
                  <button
                    key={conversation?.id}
                    onClick={() => onConversationSelect(conversation?.id)}
                    className={`
                      w-full p-3 rounded-lg text-left transition-all duration-200 mb-2
                      ${currentConversationId === conversation?.id
                        ? 'bg-primary/10 border border-primary/20 shadow-soft'
                        : 'hover:bg-muted/50'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm text-text-primary line-clamp-1">
                        {conversation?.title}
                      </h3>
                      <div className="flex items-center space-x-1 ml-2">
                        {conversation?.isFavorite && (
                          <Icon name="Star" size={12} className="text-warning fill-current" />
                        )}
                        <span className="text-xs text-text-tertiary">
                          {formatTime(conversation?.lastMessage)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                      {conversation?.preview}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name="Bot" 
                          size={12} 
                          className={getModelColor(conversation?.modelId)}
                        />
                        <span className="text-xs text-text-tertiary capitalize">
                          {conversation?.modelId}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageSquare" size={12} className="text-text-tertiary" />
                        <span className="text-xs text-text-tertiary">
                          {conversation?.messageCount}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>{filteredConversations?.length} conversations</span>
              <button className="hover:text-text-primary transition-colors">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationSidebar;