import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SocialProofSection = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [animatedValues, setAnimatedValues] = useState({
    conversations: 0,
    models: 0,
    integrations: 0,
    users: 0
  });

  const realTimeMetrics = [
    {
      label: 'Active Conversations',
      value: 12847,
      icon: 'MessageSquare',
      color: 'primary',
      suffix: '',
      increment: 3
    },
    {
      label: 'AI Models Deployed',
      value: 156,
      icon: 'Bot',
      color: 'secondary',
      suffix: '',
      increment: 1
    },
    {
      label: 'Enterprise Integrations',
      value: 8934,
      icon: 'Plug',
      color: 'accent',
      suffix: '',
      increment: 2
    },
    {
      label: 'Active Users',
      value: 45623,
      icon: 'Users',
      color: 'success',
      suffix: '+',
      increment: 5
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'VP of Operations',
      company: 'TechFlow Solutions',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: `June AI transformed our workflow efficiency by 40%. The personalized model selection means each team member gets exactly the AI assistance they need for their specific tasks.`,
      metrics: {
        timeSaved: '15 hours/week',
        efficiency: '+40%',
        satisfaction: '4.9/5'
      },
      featured: true
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'CTO',
      company: 'DataVision Corp',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: `The enterprise integration capabilities are outstanding. We connected our entire tech stack in under an hour, and the AI insights have been game-changing for our decision-making process.`,
      metrics: {
        timeSaved: '25 hours/week',
        efficiency: '+60%',
        satisfaction: '5.0/5'
      },
      featured: false
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Creative Director',
      company: 'Innovate Agency',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: `As a creative professional, I was skeptical about AI assistance. June AI's Creative Assistant has become my most trusted collaborator, helping me explore ideas I never would have considered.`,
      metrics: {
        timeSaved: '12 hours/week',efficiency: '+35%',satisfaction: '4.8/5'
      },
      featured: false
    }
  ];

  // Animate metrics on mount
  useEffect(() => {
    const animateMetrics = () => {
      realTimeMetrics?.forEach((metric, index) => {
        const targetValue = metric?.value;
        const duration = 2000;
        const steps = 60;
        const increment = targetValue / steps;
        let currentValue = 0;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }

          setAnimatedValues(prev => ({
            ...prev,
            [metric?.label?.toLowerCase()?.replace(/\s+/g, '')]: Math.floor(currentValue)
          }));
        }, duration / steps);
      });
    };

    animateMetrics();
  }, []);

  // Cycle through metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % realTimeMetrics?.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary/10',
      secondary: 'text-secondary bg-secondary/10',
      accent: 'text-accent bg-accent/10',
      success: 'text-success bg-success/10'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Real-time Metrics */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Trusted by{' '}
            <span className="text-neural-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12">
            Join the growing community of professionals and enterprises who have transformed 
            their productivity with June AI's intelligent assistance.
          </p>

          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {realTimeMetrics?.map((metric, index) => {
              const isActive = currentMetric === index;
              const colorClasses = getColorClasses(metric?.color);
              const animatedValue = animatedValues?.[metric?.label?.toLowerCase()?.replace(/\s+/g, '')] || 0;

              return (
                <div
                  key={metric?.label}
                  className={`
                    relative p-6 rounded-xl border transition-all duration-500
                    ${isActive 
                      ? 'border-primary/30 bg-primary/5 shadow-elevated scale-105' 
                      : 'border-border bg-card hover:border-primary/20'
                    }
                  `}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${colorClasses}`}>
                    <Icon name={metric?.icon} size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-text-primary mb-1">
                      {animatedValue?.toLocaleString()}{metric?.suffix}
                    </p>
                    <p className="text-sm text-text-secondary">{metric?.label}</p>
                    
                    {isActive && (
                      <div className="flex items-center justify-center mt-2">
                        <div className="w-1 h-1 bg-success rounded-full animate-pulse mr-2"></div>
                        <span className="text-xs text-success">Live</span>
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl -z-10"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className={`
                relative p-8 rounded-xl border transition-all duration-300
                ${testimonial?.featured 
                  ? 'border-primary/30 bg-primary/5 shadow-elevated lg:scale-105' 
                  : 'border-border bg-card hover:shadow-soft'
                }
              `}
            >
              {testimonial?.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-cta text-cta-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Featured Success
                  </span>
                </div>
              )}

              {/* Quote */}
              <div className="mb-6">
                <Icon name="Quote" size={24} className="text-primary/30 mb-4" />
                <p className="text-text-primary leading-relaxed">
                  "{testimonial?.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{testimonial?.name}</h4>
                  <p className="text-sm text-text-secondary">{testimonial?.role}</p>
                  <p className="text-sm text-primary">{testimonial?.company}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-bold text-success">{testimonial?.metrics?.timeSaved}</p>
                  <p className="text-xs text-text-secondary">Time Saved</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{testimonial?.metrics?.efficiency}</p>
                  <p className="text-xs text-text-secondary">Efficiency</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-accent">{testimonial?.metrics?.satisfaction}</p>
                  <p className="text-xs text-text-secondary">Rating</p>
                </div>
              </div>

              {testimonial?.featured && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl -z-10"></div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-secondary mb-8">Trusted by industry leaders worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm font-medium">SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-primary" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-accent" />
              <span className="text-sm font-medium">ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} className="text-warning" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;