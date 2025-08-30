import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelComparison = ({ models, onClose, onSelectModel }) => {
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const metrics = [
    { key: 'overall', label: 'Overall Score', icon: 'Star' },
    { key: 'speed', label: 'Response Speed', icon: 'Zap' },
    { key: 'accuracy', label: 'Accuracy', icon: 'Target' },
    { key: 'creativity', label: 'Creativity', icon: 'Palette' },
    { key: 'reasoning', label: 'Reasoning', icon: 'Brain' },
    { key: 'cost', label: 'Cost Efficiency', icon: 'DollarSign' }
  ];

  const getMetricValue = (model, metric) => {
    const values = {
      overall: model?.rating * 20,
      speed: 100 - (parseFloat(model?.responseTime) * 10),
      accuracy: model?.accuracy,
      creativity: model?.capabilities?.find(c => c?.name === 'Creative Writing')?.score || 75,
      reasoning: model?.capabilities?.find(c => c?.name === 'Logical Reasoning')?.score || 80,
      cost: Math.random() * 30 + 70 // Mock cost efficiency
    };
    return Math.round(values?.[metric]);
  };

  const getMetricColor = (value) => {
    if (value >= 90) return 'text-success';
    if (value >= 70) return 'text-energy-medium';
    if (value >= 50) return 'text-warning';
    return 'text-error';
  };

  const getBestInMetric = (metric) => {
    return models?.reduce((best, current) => 
      getMetricValue(current, metric) > getMetricValue(best, metric) ? current : best
    );
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-elevated max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Model Comparison</h2>
              <p className="text-sm text-text-secondary mt-1">
                Compare {models?.length} AI models side by side
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              className="text-text-secondary hover:text-primary"
            />
          </div>
        </div>

        {/* Metric Selector */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {metrics?.map((metric) => (
              <Button
                key={metric?.key}
                variant={selectedMetric === metric?.key ? "default" : "outline"}
                size="sm"
                iconName={metric?.icon}
                iconPosition="left"
                onClick={() => setSelectedMetric(metric?.key)}
              >
                {metric?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Model Headers */}
            <div className="flex border-b border-border">
              <div className="w-48 p-4 bg-muted/30">
                <span className="font-medium text-text-primary">Features</span>
              </div>
              {models?.map((model) => (
                <div key={model?.id} className="flex-1 min-w-48 p-4 text-center border-l border-border">
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${model?.gradient}`}>
                    <Icon name={model?.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-text-primary">{model?.name}</h3>
                  <p className="text-xs text-text-secondary">{model?.category}</p>
                </div>
              ))}
            </div>

            {/* Metric Comparison */}
            <div className="flex border-b border-border">
              <div className="w-48 p-4 bg-muted/30">
                <div className="flex items-center space-x-2">
                  <Icon name={metrics?.find(m => m?.key === selectedMetric)?.icon} size={16} />
                  <span className="font-medium text-text-primary">
                    {metrics?.find(m => m?.key === selectedMetric)?.label}
                  </span>
                </div>
              </div>
              {models?.map((model) => {
                const value = getMetricValue(model, selectedMetric);
                const isBest = getBestInMetric(selectedMetric)?.id === model?.id;
                return (
                  <div key={model?.id} className="flex-1 min-w-48 p-4 text-center border-l border-border">
                    <div className={`text-2xl font-bold ${getMetricColor(value)} ${isBest ? 'relative' : ''}`}>
                      {value}%
                      {isBest && (
                        <Icon name="Crown" size={16} className="absolute -top-1 -right-1 text-warning" />
                      )}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          value >= 90 ? 'bg-success' :
                          value >= 70 ? 'bg-energy-bright' :
                          value >= 50 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Features */}
            {[
              { key: 'responseTime', label: 'Response Time', format: (v) => v },
              { key: 'accuracy', label: 'Accuracy Rate', format: (v) => `${v}%` },
              { key: 'uptime', label: 'Uptime', format: (v) => `${v}%` },
              { key: 'rating', label: 'User Rating', format: (v) => `${v}/5` }
            ]?.map((feature) => (
              <div key={feature?.key} className="flex border-b border-border">
                <div className="w-48 p-4 bg-muted/30">
                  <span className="font-medium text-text-primary">{feature?.label}</span>
                </div>
                {models?.map((model) => (
                  <div key={model?.id} className="flex-1 min-w-48 p-4 text-center border-l border-border">
                    <span className="font-semibold text-text-primary">
                      {feature?.format(model?.[feature?.key])}
                    </span>
                  </div>
                ))}
              </div>
            ))}

            {/* Use Cases */}
            <div className="flex border-b border-border">
              <div className="w-48 p-4 bg-muted/30">
                <span className="font-medium text-text-primary">Best Use Cases</span>
              </div>
              {models?.map((model) => (
                <div key={model?.id} className="flex-1 min-w-48 p-4 border-l border-border">
                  <div className="space-y-1">
                    {model?.useCases?.slice(0, 3)?.map((useCase) => (
                      <div key={useCase} className="px-2 py-1 bg-muted rounded text-xs text-text-secondary">
                        {useCase}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex border-b border-border">
              <div className="w-48 p-4 bg-muted/30">
                <span className="font-medium text-text-primary">Pricing</span>
              </div>
              {models?.map((model) => (
                <div key={model?.id} className="flex-1 min-w-48 p-4 text-center border-l border-border">
                  <div className="text-lg font-semibold text-text-primary">
                    {model?.pricing || 'Free'}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {model?.pricingModel || 'No cost'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="text-sm text-text-secondary">
              Select a model to continue with your AI workspace setup
            </div>
            <div className="flex space-x-2">
              {models?.map((model) => (
                <Button
                  key={model?.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectModel(model)}
                >
                  Select {model?.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;