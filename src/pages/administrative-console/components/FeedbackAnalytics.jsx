import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FeedbackAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'ai-models', label: 'AI Models' },
    { value: 'integrations', label: 'Integrations' },
    { value: 'interface', label: 'User Interface' },
    { value: 'performance', label: 'Performance' },
    { value: 'support', label: 'Support' }
  ];

  const sentimentData = {
    positive: 68,
    neutral: 22,
    negative: 10
  };

  const feedbackCategories = [
    {
      category: "AI Model Performance",
      count: 142,
      avgRating: 4.3,
      trend: "up",
      sentiment: { positive: 72, neutral: 20, negative: 8 }
    },
    {
      category: "Integration Reliability",
      count: 89,
      avgRating: 3.8,
      trend: "down",
      sentiment: { positive: 58, neutral: 25, negative: 17 }
    },
    {
      category: "User Interface",
      count: 156,
      avgRating: 4.5,
      trend: "up",
      sentiment: { positive: 78, neutral: 18, negative: 4 }
    },
    {
      category: "Response Speed",
      count: 203,
      avgRating: 4.1,
      trend: "stable",
      sentiment: { positive: 65, neutral: 28, negative: 7 }
    },
    {
      category: "Feature Requests",
      count: 67,
      avgRating: 4.0,
      trend: "up",
      sentiment: { positive: 70, neutral: 25, negative: 5 }
    }
  ];

  const recentFeedback = [
    {
      id: 1,
      user: "Sarah Chen",
      department: "Analytics",
      rating: 5,
      category: "AI Model Performance",
      comment: "The new GPT-4 integration has significantly improved our data analysis workflows. Response quality is excellent.",
      timestamp: "2025-08-30T13:45:00",
      sentiment: "positive",
      status: "reviewed"
    },
    {
      id: 2,
      user: "Marcus Rodriguez",
      department: "Product",
      rating: 3,
      category: "Integration Reliability",
      comment: "ServiceNow integration occasionally times out during peak hours. Would appreciate better error handling.",
      timestamp: "2025-08-30T12:30:00",
      sentiment: "neutral",
      status: "in-progress"
    },
    {
      id: 3,
      user: "Emily Watson",
      department: "Engineering",
      rating: 4,
      category: "User Interface",
      comment: "Love the new dashboard layout! Much more intuitive than before. Could use dark mode option though.",
      timestamp: "2025-08-30T11:15:00",
      sentiment: "positive",
      status: "reviewed"
    },
    {
      id: 4,
      user: "David Kim",
      department: "Marketing",
      rating: 2,
      category: "Response Speed",
      comment: "AI responses have been slower lately, especially for complex queries. This impacts our content creation workflow.",
      timestamp: "2025-08-30T10:20:00",
      sentiment: "negative",
      status: "escalated"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      case 'stable': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'neutral': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      reviewed: { color: 'bg-success/10 text-success', label: 'Reviewed' },
      'in-progress': { color: 'bg-warning/10 text-warning', label: 'In Progress' },
      escalated: { color: 'bg-error/10 text-error', label: 'Escalated' },
      pending: { color: 'bg-neural-deep/10 text-neural-deep', label: 'Pending' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Feedback Analytics</h3>
          <p className="text-sm text-text-secondary mt-1">
            User feedback insights and sentiment analysis
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-full sm:w-40"
          />
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-full sm:w-48"
          />
          <Button variant="outline" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center">
              <Icon name="ThumbsUp" size={24} />
            </div>
            <span className="text-2xl font-bold text-success">{sentimentData?.positive}%</span>
          </div>
          <h4 className="font-semibold text-text-primary">Positive Feedback</h4>
          <p className="text-sm text-text-secondary mt-1">Users satisfied with experience</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
              <Icon name="Minus" size={24} />
            </div>
            <span className="text-2xl font-bold text-warning">{sentimentData?.neutral}%</span>
          </div>
          <h4 className="font-semibold text-text-primary">Neutral Feedback</h4>
          <p className="text-sm text-text-secondary mt-1">Mixed or moderate responses</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-error/10 text-error rounded-lg flex items-center justify-center">
              <Icon name="ThumbsDown" size={24} />
            </div>
            <span className="text-2xl font-bold text-error">{sentimentData?.negative}%</span>
          </div>
          <h4 className="font-semibold text-text-primary">Negative Feedback</h4>
          <p className="text-sm text-text-secondary mt-1">Areas needing improvement</p>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <h4 className="font-semibold text-text-primary">Feedback by Category</h4>
          <p className="text-sm text-text-secondary mt-1">
            Detailed breakdown of user feedback across different areas
          </p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {feedbackCategories?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-text-primary">{item?.category}</h5>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(Math.round(item?.avgRating))}
                        <span className="text-sm text-text-secondary ml-1">
                          {item?.avgRating}
                        </span>
                      </div>
                      <Icon 
                        name={getTrendIcon(item?.trend)} 
                        size={16} 
                        className={getTrendColor(item?.trend)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {item?.count} responses
                    </span>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-success">
                        {item?.sentiment?.positive}% positive
                      </span>
                      <span className="text-warning">
                        {item?.sentiment?.neutral}% neutral
                      </span>
                      <span className="text-error">
                        {item?.sentiment?.negative}% negative
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Feedback */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-text-primary">Recent Feedback</h4>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View All
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {recentFeedback?.map((feedback) => (
            <div key={feedback?.id} className="p-6 hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-medium text-text-primary">{feedback?.user}</div>
                    <div className="text-sm text-text-secondary">{feedback?.department}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(feedback?.rating)}
                  </div>
                  {getStatusBadge(feedback?.status)}
                  <span className="text-xs text-text-secondary">
                    {formatTime(feedback?.timestamp)}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs bg-muted text-text-secondary rounded-full mb-2">
                  {feedback?.category}
                </span>
                <p className="text-sm text-text-primary">{feedback?.comment}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${getSentimentColor(feedback?.sentiment)}`}>
                  {feedback?.sentiment?.charAt(0)?.toUpperCase() + feedback?.sentiment?.slice(1)} sentiment
                </span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" iconName="MessageSquare">
                    Respond
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Flag">
                    Flag
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalytics;