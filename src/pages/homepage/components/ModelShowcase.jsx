import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ModelShowcase = () => {
  const [activeModel, setActiveModel] = useState('creative');

  const models = [
    {
      id: 'creative',
      name: 'Creative Assistant',
      icon: 'Palette',
      color: 'energy',
      description: 'Unleash your imagination with AI-powered creative solutions',
      capabilities: ['Content Creation', 'Design Ideas', 'Storytelling', 'Brand Strategy'],
      sampleInteraction: {
        user: "Help me brainstorm a campaign for our eco-friendly product line",
        ai: "I\'ll create a nature-inspired campaign concept focusing on sustainability and innovation. Let\'s explore \'Green Tomorrow\' - a narrative that connects your products to environmental stewardship..."
      },
      metrics: { accuracy: '94%', speed: '2.3s', satisfaction: '4.8/5' }
    },
    {
      id: 'analytical',
      name: 'Data Analyst',
      icon: 'BarChart3',
      color: 'neural',
      description: 'Transform complex data into actionable business insights',
      capabilities: ['Data Analysis', 'Trend Forecasting', 'Report Generation', 'KPI Tracking'],
      sampleInteraction: {
        user: "Analyze our customer retention patterns from the last quarter",
        ai: "Based on your Q3 data, I've identified a 15% improvement in retention among premium users. The key drivers are enhanced onboarding and personalized support..."
      },
      metrics: { accuracy: '97%', speed: '1.8s', satisfaction: '4.9/5' }
    },
    {
      id: 'technical',
      name: 'Code Companion',
      icon: 'Code',
      color: 'quantum',
      description: 'Accelerate development with intelligent coding assistance',
      capabilities: ['Code Review', 'Bug Detection', 'Architecture Design', 'Documentation'],
      sampleInteraction: {
        user: "Review this React component for performance optimization",
        ai: "I've identified 3 optimization opportunities: memoization of expensive calculations, lazy loading of components, and efficient state management patterns..."
      },
      metrics: { accuracy: '96%', speed: '1.5s', satisfaction: '4.7/5' }
    },
    {
      id: 'conversational',
      name: 'Communication Expert',
      icon: 'MessageCircle',
      color: 'success',
      description: 'Enhance your communication with context-aware assistance',
      capabilities: ['Email Drafting', 'Meeting Summaries', 'Presentation Content', 'Customer Support'],
      sampleInteraction: {
        user: "Draft a professional email to reschedule our client meeting",
        ai: "I'll craft a courteous and professional rescheduling email that maintains the relationship while clearly communicating the change..."
      },
      metrics: { accuracy: '95%', speed: '2.1s', satisfaction: '4.8/5' }
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      energy: {
        bg: 'bg-energy-bright/10',
        border: 'border-energy-bright/30',
        text: 'text-energy-medium',
        icon: 'text-energy-bright',
        gradient: 'from-energy-bright/20 to-energy-soft/20'
      },
      neural: {
        bg: 'bg-neural-deep/10',
        border: 'border-neural-deep/30',
        text: 'text-neural-deep',
        icon: 'text-neural-medium',
        gradient: 'from-neural-deep/20 to-neural-light/20'
      },
      quantum: {
        bg: 'bg-quantum-deep/10',
        border: 'border-quantum-deep/30',
        text: 'text-quantum-deep',
        icon: 'text-quantum-medium',
        gradient: 'from-quantum-deep/20 to-quantum-light/20'
      },
      success: {
        bg: 'bg-success/10',
        border: 'border-success/30',
        text: 'text-success',
        icon: 'text-success',
        gradient: 'from-success/20 to-success/10'
      }
    };
    return colorMap?.[color] || colorMap?.energy;
  };

  const activeModelData = models?.find(m => m?.id === activeModel);
  const colors = getColorClasses(activeModelData?.color);

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Meet Your AI{' '}
            <span className="text-neural-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Specialists
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose from our specialized AI models, each trained for specific tasks and optimized 
            for different workflows. Hover over each model to see them in action.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Model Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {models?.map((model) => {
              const modelColors = getColorClasses(model?.color);
              const isActive = activeModel === model?.id;

              return (
                <div
                  key={model?.id}
                  className={`
                    relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${isActive 
                      ? `${modelColors?.bg} ${modelColors?.border} shadow-elevated` 
                      : 'bg-card border-border hover:border-primary/30 hover:shadow-soft'
                    }
                  `}
                  onMouseEnter={() => setActiveModel(model?.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center
                      ${isActive ? modelColors?.bg : 'bg-muted'}
                    `}>
                      <Icon 
                        name={model?.icon} 
                        size={24} 
                        className={isActive ? modelColors?.icon : 'text-text-secondary'} 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-2 ${isActive ? modelColors?.text : 'text-text-primary'}`}>
                        {model?.name}
                      </h3>
                      <p className="text-sm text-text-secondary mb-4">
                        {model?.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {model?.capabilities?.slice(0, 2)?.map((capability) => (
                          <span
                            key={capability}
                            className={`
                              px-2 py-1 text-xs rounded-full
                              ${isActive 
                                ? `${modelColors?.bg} ${modelColors?.text}` 
                                : 'bg-muted text-text-secondary'
                              }
                            `}
                          >
                            {capability}
                          </span>
                        ))}
                        {model?.capabilities?.length > 2 && (
                          <span className="px-2 py-1 text-xs text-text-tertiary">
                            +{model?.capabilities?.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${modelColors?.gradient} rounded-xl -z-10`}></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Model Preview */}
          <div className="bg-card border border-border rounded-xl shadow-elevated p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors?.bg}`}>
                <Icon name={activeModelData?.icon} size={20} className={colors?.icon} />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{activeModelData?.name}</h3>
                <p className="text-sm text-text-secondary">Live Preview</p>
              </div>
            </div>

            {/* Sample Interaction */}
            <div className="space-y-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-text-secondary mb-2">You:</p>
                <p className="text-text-primary text-sm">
                  "{activeModelData?.sampleInteraction?.user}"
                </p>
              </div>

              <div className={`${colors?.bg} rounded-lg p-4 border-l-4 ${colors?.border?.replace('border-', 'border-l-')}`}>
                <p className={`text-sm mb-2 ${colors?.text}`}>{activeModelData?.name}:</p>
                <p className="text-text-primary text-sm leading-relaxed">
                  {activeModelData?.sampleInteraction?.ai}
                </p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{activeModelData?.metrics?.accuracy}</p>
                <p className="text-xs text-text-secondary">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{activeModelData?.metrics?.speed}</p>
                <p className="text-xs text-text-secondary">Avg Response</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{activeModelData?.metrics?.satisfaction}</p>
                <p className="text-xs text-text-secondary">User Rating</p>
              </div>
            </div>

            {/* All Capabilities */}
            <div className="mt-6">
              <h4 className="font-medium text-text-primary mb-3">Full Capabilities</h4>
              <div className="flex flex-wrap gap-2">
                {activeModelData?.capabilities?.map((capability) => (
                  <span
                    key={capability}
                    className={`px-3 py-1 text-sm rounded-full ${colors?.bg} ${colors?.text}`}
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelShowcase;