import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'Instant Setup',
      description: 'Get started in under 5 minutes with our guided onboarding'
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'SOC 2 certified with end-to-end encryption'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Share AI insights and collaborate seamlessly'
    },
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description: 'Track productivity gains and AI usage patterns'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'Perfect for individuals exploring AI assistance',
      features: [
        '100 AI conversations/month',
        '2 AI model access',
        'Basic integrations',
        'Community support'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Ideal for professionals and small teams',
      features: [
        'Unlimited AI conversations',
        'All AI models access',
        'Advanced integrations',
        'Priority support',
        'Custom workflows',
        'Analytics dashboard'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Everything in Professional',
        'Custom AI model training',
        'Dedicated support',
        'Advanced security',
        'API access',
        'Custom integrations'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Main CTA */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6">
            Ready to amplify your{' '}
            <span className="text-neural-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              potential?
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Join thousands of professionals who have transformed their productivity with June AI. 
            Start your free trial today and experience the future of intelligent assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/authentication-portal">
              <Button
                variant="default"
                size="xl"
                iconName="Sparkles"
                iconPosition="left"
                className="bg-cta hover:bg-cta/90 text-cta-foreground shadow-elevated w-full sm:w-auto"
              >
                Start Your Free Trial
              </Button>
            </Link>

            <Button
              variant="outline"
              size="xl"
              iconName="Calendar"
              iconPosition="left"
              className="border-primary/30 text-primary hover:bg-primary/5 w-full sm:w-auto"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm text-text-secondary">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features?.map((feature) => (
            <div
              key={feature?.title}
              className="text-center p-6 bg-card border border-border rounded-xl hover:shadow-soft transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name={feature?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{feature?.title}</h3>
              <p className="text-sm text-text-secondary">{feature?.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-text-primary mb-4">
            Choose Your AI Journey
          </h3>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Flexible pricing that grows with your needs. Start free and upgrade as you scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers?.map((tier) => (
            <div
              key={tier?.name}
              className={`
                relative p-8 rounded-2xl border transition-all duration-300
                ${tier?.popular 
                  ? 'border-primary/30 bg-primary/5 shadow-elevated scale-105' 
                  : 'border-border bg-card hover:shadow-soft'
                }
              `}
            >
              {tier?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-cta text-cta-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h4 className="text-xl font-bold text-text-primary mb-2">{tier?.name}</h4>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-text-primary">{tier?.price}</span>
                  <span className="text-text-secondary">{tier?.period}</span>
                </div>
                <p className="text-sm text-text-secondary">{tier?.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier?.features?.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/authentication-portal" className="block">
                <Button
                  variant={tier?.popular ? "default" : "outline"}
                  size="lg"
                  fullWidth
                  className={tier?.popular ? "bg-cta hover:bg-cta/90 text-cta-foreground" : ""}
                >
                  {tier?.cta}
                </Button>
              </Link>

              {tier?.popular && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl -z-10"></div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center bg-card border border-border rounded-2xl p-12 shadow-soft">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Still have questions?
            </h3>
            <p className="text-lg text-text-secondary mb-8">
              Our team is here to help you find the perfect AI solution for your needs. 
              Get personalized recommendations and see June AI in action.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Chat with Sales
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                className="border-secondary/30 text-secondary hover:bg-secondary/5"
              >
                View Documentation
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-success" />
                <span className="text-sm text-text-secondary">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-sm text-text-secondary">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-sm text-text-secondary">SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;