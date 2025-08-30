import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const conversations = [
    {
      id: 'conv-1',
      title: 'Product Strategy Discussion',
      model: 'GPT-4',
      modelColor: 'neural',
      lastMessage: 'Based on the market analysis, I recommend focusing on the enterprise segment first...',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      messageCount: 23,
      status: 'active',
      tags: ['strategy', 'business', 'analysis']
    },
    {
      id: 'conv-2',
      title: 'Code Review Assistant',
      model: 'Claude',
      modelColor: 'quantum',
      lastMessage: 'The implementation looks good overall. Here are a few suggestions for optimization...',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      messageCount: 15,
      status: 'completed',
      tags: ['code', 'review', 'optimization']
    },
    {
      id: 'conv-3',
      title: 'Creative Writing Session',
      model: 'GPT-4',
      modelColor: 'neural',
      lastMessage: 'The character development in chapter 3 could benefit from more emotional depth...',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      messageCount: 31,
      status: 'paused',
      tags: ['creative', 'writing', 'storytelling']
    },
    {
      id: 'conv-4',
      title: 'Data Analysis Help',
      model: 'Gemini',
      modelColor: 'energy',
      lastMessage: 'The correlation between variables X and Y shows a strong positive relationship...',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      messageCount: 8,
      status: 'completed',
      tags: ['data', 'analysis', 'statistics']
    },
    {
      id: 'conv-5',
      title: 'Technical Documentation',
      model: 'LLaMA',
      modelColor: 'warning',
      lastMessage: 'The API documentation structure should include authentication examples...',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 12,
      status: 'archived',
      tags: ['documentation', 'technical', 'api']
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: conversations?.length },
    { id: 'active', label: 'Active', count: conversations?.filter(c => c?.status === 'active')?.length },
    { id: 'completed', label: 'Completed', count: conversations?.filter(c => c?.status === 'completed')?.length },
    { id: 'paused', label: 'Paused', count: conversations?.filter(c => c?.status === 'paused')?.length }
  ];

  const filteredConversations = selectedFilter === 'all' 
    ? conversations 
    : conversations?.filter(c => c?.status === selectedFilter);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'completed':
        return 'text-neural-deep bg-neural-deep/10';
      case 'paused':
        return 'text-warning bg-warning/10';
      case 'archived':
        return 'text-text-tertiary bg-muted';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getModelColor = (color) => {
    switch (color) {
      case 'neural':
        return 'bg-neural-deep/10 text-neural-deep';
      case 'quantum':
        return 'bg-quantum-deep/10 text-quantum-deep';
      case 'energy':
        return 'bg-energy-bright/10 text-energy-medium';
      case 'warning':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Conversation History</h2>
        <Link to="/conversation-theater">
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            className="text-text-secondary hover:text-primary"
          >
            New Chat
          </Button>
        </Link>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {filters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => setSelectedFilter(filter?.id)}
            className={`
              flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${selectedFilter === filter?.id
                ? 'bg-background text-primary shadow-soft'
                : 'text-text-secondary hover:text-primary'
              }
            `}
          >
            {filter?.label}
            <span className="ml-1 text-xs opacity-60">({filter?.count})</span>
          </button>
        ))}
      </div>
      {/* Conversation List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredConversations?.map((conversation) => (
          <Link
            key={conversation?.id}
            to={`/conversation-theater?id=${conversation?.id}`}
            className="block p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${getModelColor(conversation?.modelColor)}
                `}>
                  <Icon name="Bot" size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-text-primary truncate group-hover:text-primary transition-colors">
                    {conversation?.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-text-secondary">{conversation?.model}</span>
                    <span className="text-xs text-text-tertiary">•</span>
                    <span className="text-xs text-text-tertiary">
                      {conversation?.messageCount} messages
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full capitalize
                  ${getStatusColor(conversation?.status)}
                `}>
                  {conversation?.status}
                </span>
                <span className="text-xs text-text-tertiary">
                  {getTimeAgo(conversation?.timestamp)}
                </span>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">
              {conversation?.lastMessage}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {conversation?.tags?.slice(0, 3)?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-muted text-text-secondary rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {conversation?.tags?.length > 3 && (
                  <span className="px-2 py-1 text-xs text-text-tertiary">
                    +{conversation?.tags?.length - 3}
                  </span>
                )}
              </div>

              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-text-tertiary group-hover:text-primary transition-colors" 
              />
            </div>
          </Link>
        ))}
      </div>
      {filteredConversations?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="text-text-tertiary mx-auto mb-3" />
          <h3 className="font-semibold text-text-primary mb-2">No conversations found</h3>
          <p className="text-sm text-text-secondary mb-4">
            {selectedFilter === 'all' ?'Start your first conversation with an AI model'
              : `No ${selectedFilter} conversations at the moment`
            }
          </p>
          <Link to="/conversation-theater">
            <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
              Start New Conversation
            </Button>
          </Link>
        </div>
      )}
      {/* Quick Stats */}
      {filteredConversations?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-text-primary">
                {conversations?.reduce((sum, conv) => sum + conv?.messageCount, 0)}
              </p>
              <p className="text-xs text-text-secondary">Total Messages</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-text-primary">
                {new Set(conversations.map(conv => conv.model))?.size}
              </p>
              <p className="text-xs text-text-secondary">Models Used</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-text-primary">
                {conversations?.filter(conv => conv?.status === 'active')?.length}
              </p>
              <p className="text-xs text-text-secondary">Active Chats</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;