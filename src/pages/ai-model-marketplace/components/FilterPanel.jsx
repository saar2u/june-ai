import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const filterSections = [
    {
      key: 'category',
      title: 'Category',
      icon: 'Grid3x3',
      options: [
        { value: 'creative', label: 'Creative Writing', count: 8 },
        { value: 'analytical', label: 'Data Analysis', count: 12 },
        { value: 'technical', label: 'Code Generation', count: 6 },
        { value: 'conversational', label: 'Chat & Support', count: 15 },
        { value: 'research', label: 'Research & Insights', count: 9 },
        { value: 'productivity', label: 'Productivity', count: 11 }
      ]
    },
    {
      key: 'status',
      title: 'Availability',
      icon: 'Activity',
      options: [
        { value: 'active', label: 'Active', count: 45 },
        { value: 'beta', label: 'Beta', count: 8 },
        { value: 'coming-soon', label: 'Coming Soon', count: 3 }
      ]
    },
    {
      key: 'complexity',
      title: 'Complexity Level',
      icon: 'BarChart3',
      options: [
        { value: 'beginner', label: 'Beginner Friendly', count: 22 },
        { value: 'intermediate', label: 'Intermediate', count: 28 },
        { value: 'advanced', label: 'Advanced', count: 14 }
      ]
    },
    {
      key: 'pricing',
      title: 'Pricing Model',
      icon: 'DollarSign',
      options: [
        { value: 'free', label: 'Free Tier', count: 18 },
        { value: 'freemium', label: 'Freemium', count: 25 },
        { value: 'premium', label: 'Premium Only', count: 13 }
      ]
    },
    {
      key: 'integrations',
      title: 'Enterprise Integrations',
      icon: 'Plug',
      options: [
        { value: 'slack', label: 'Slack', count: 32 },
        { value: 'teams', label: 'Microsoft Teams', count: 28 },
        { value: 'servicenow', label: 'ServiceNow', count: 15 },
        { value: 'salesforce', label: 'Salesforce', count: 20 },
        { value: 'jira', label: 'Jira', count: 18 }
      ]
    }
  ];

  const handleFilterToggle = (section, value) => {
    const currentValues = filters?.[section] || [];
    const newValues = currentValues?.includes(value)
      ? currentValues?.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(section, newValues);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.reduce((total, values) => total + values?.length, 0);
  };

  return (
    <div className={`
      bg-card border border-border rounded-xl transition-all duration-300
      ${isCollapsed ? 'w-12' : 'w-80'}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-text-primary">Filters</h2>
              <p className="text-xs text-text-secondary mt-1">
                {getActiveFilterCount()} active filters
              </p>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            {!isCollapsed && getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onClearFilters}
                className="text-text-secondary hover:text-error"
              >
                Clear
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              onClick={onToggleCollapse}
              className="text-text-secondary hover:text-primary"
            />
          </div>
        </div>
      </div>
      {/* Filter Sections */}
      {!isCollapsed && (
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {filterSections?.map((section) => (
            <div key={section?.key}>
              <div className="flex items-center space-x-2 mb-3">
                <Icon name={section?.icon} size={16} className="text-text-secondary" />
                <h3 className="font-medium text-text-primary">{section?.title}</h3>
              </div>
              
              <div className="space-y-2">
                {section?.options?.map((option) => (
                  <div key={option?.value} className="flex items-center justify-between">
                    <Checkbox
                      label={option?.label}
                      checked={(filters?.[section?.key] || [])?.includes(option?.value)}
                      onChange={() => handleFilterToggle(section?.key, option?.value)}
                      className="flex-1"
                    />
                    <span className="text-xs text-text-secondary ml-2">
                      {option?.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Filters */}
          <div className="pt-4 border-t border-border">
            <h3 className="font-medium text-text-primary mb-3">Quick Filters</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Zap"
                iconPosition="left"
                fullWidth
                onClick={() => onFilterChange('quick', ['high-performance'])}
                className="justify-start"
              >
                High Performance
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Heart"
                iconPosition="left"
                fullWidth
                onClick={() => onFilterChange('quick', ['most-popular'])}
                className="justify-start"
              >
                Most Popular
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Star"
                iconPosition="left"
                fullWidth
                onClick={() => onFilterChange('quick', ['top-rated'])}
                className="justify-start"
              >
                Top Rated
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Clock"
                iconPosition="left"
                fullWidth
                onClick={() => onFilterChange('quick', ['recently-updated'])}
                className="justify-start"
              >
                Recently Updated
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Collapsed State */}
      {isCollapsed && (
        <div className="p-2 space-y-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={16} className="text-primary" />
          </div>
          {getActiveFilterCount() > 0 && (
            <div className="w-8 h-8 bg-energy-bright/10 rounded-lg flex items-center justify-center">
              <span className="text-xs font-semibold text-energy-medium">
                {getActiveFilterCount()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;