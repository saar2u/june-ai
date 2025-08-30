import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const IntegrationSection = () => {
  const svgRef = useRef(null);

  const integrations = [
    {
      name: 'ServiceNow',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      category: 'ITSM',
      status: 'active',
      connections: 1247
    },
    {
      name: 'Microsoft Teams',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      category: 'Communication',
      status: 'active',
      connections: 2156
    },
    {
      name: 'Slack',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      category: 'Communication',
      status: 'active',
      connections: 1893
    },
    {
      name: 'SAP',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      category: 'ERP',
      status: 'active',
      connections: 892
    },
    {
      name: 'Salesforce',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      category: 'CRM',
      status: 'active',
      connections: 1654
    },
    {
      name: 'Jira',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      category: 'Project Management',
      status: 'active',
      connections: 1123
    }
  ];

  useEffect(() => {
    const svg = svgRef?.current;
    if (!svg) return;

    const paths = svg?.querySelectorAll('.connection-line');
    
    paths?.forEach((path, index) => {
      const length = path?.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      
      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
        path.style.strokeDashoffset = 0;
      }, index * 200);
    });
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Enterprise{' '}
            <span className="text-neural-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Integrations
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Connect June AI seamlessly with your existing enterprise tools. 
            Our intelligent integration layer ensures smooth data flow and enhanced productivity.
          </p>
        </div>

        <div className="relative">
          {/* Central Hub */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="w-32 h-32 neural-gradient rounded-2xl flex items-center justify-center shadow-elevated">
                <div className="text-center">
                  <Icon name="Zap" size={32} className="text-white mb-2" />
                  <p className="text-white font-semibold text-sm">June AI</p>
                  <p className="text-white/80 text-xs">Hub</p>
                </div>
              </div>
              <div className="absolute -inset-4 neural-gradient rounded-2xl opacity-20 blur-lg animate-neural-pulse"></div>
            </div>
          </div>

          {/* Integration Grid with Connection Lines */}
          <div className="relative">
            {/* SVG for Connection Lines */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              
              {/* Connection lines from center to each integration */}
              <path
                className="connection-line"
                d="M 400 200 Q 200 150 100 100"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="connection-line"
                d="M 400 200 Q 500 150 700 100"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="connection-line"
                d="M 400 200 Q 200 250 100 300"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="connection-line"
                d="M 400 200 Q 500 250 700 300"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Integration Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 relative" style={{ zIndex: 2 }}>
              {integrations?.map((integration, index) => (
                <div
                  key={integration?.name}
                  className="group bg-card border border-border rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <Image
                        src={integration?.logo}
                        alt={`${integration?.name} logo`}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">{integration?.name}</h3>
                      <p className="text-sm text-text-secondary">{integration?.category}</p>
                    </div>
                    <div className="w-2 h-2 bg-success rounded-full animate-neural-pulse"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Active Connections</span>
                      <span className="font-semibold text-primary">
                        {integration?.connections?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        Connected
                      </span>
                    </div>

                    <div className="pt-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(integration?.connections / 25, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-text-tertiary mt-1">Data sync health: Excellent</p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Plug" size={24} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-text-primary">50+</p>
              <p className="text-sm text-text-secondary">Integrations Available</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={24} className="text-secondary" />
              </div>
              <p className="text-3xl font-bold text-text-primary">99.9%</p>
              <p className="text-sm text-text-secondary">Uptime Guarantee</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} className="text-accent" />
              </div>
              <p className="text-3xl font-bold text-text-primary">SOC 2</p>
              <p className="text-sm text-text-secondary">Certified Security</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} className="text-success" />
              </div>
              <p className="text-3xl font-bold text-text-primary">&lt;5min</p>
              <p className="text-sm text-text-secondary">Setup Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;