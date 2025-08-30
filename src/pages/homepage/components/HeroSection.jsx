import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const nodes = [];
    const connections = [];
    let animationId;

    // Initialize neural network nodes
    const initializeNetwork = () => {
      canvas.width = canvas?.offsetWidth;
      canvas.height = canvas?.offsetHeight;

      // Create nodes
      for (let i = 0; i < 50; i++) {
        nodes?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3
        });
      }

      // Create connections
      for (let i = 0; i < nodes?.length; i++) {
        for (let j = i + 1; j < nodes?.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes?.[i]?.x - nodes?.[j]?.x, 2) + 
            Math.pow(nodes?.[i]?.y - nodes?.[j]?.y, 2)
          );
          if (distance < 150) {
            connections?.push({ from: i, to: j, opacity: 1 - distance / 150 });
          }
        }
      }
    };

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Update and draw connections
      ctx.strokeStyle = 'rgba(26, 35, 126, 0.1)';
      ctx.lineWidth = 1;
      connections?.forEach(conn => {
        const fromNode = nodes?.[conn?.from];
        const toNode = nodes?.[conn?.to];
        
        ctx.globalAlpha = conn?.opacity * 0.3;
        ctx?.beginPath();
        ctx?.moveTo(fromNode?.x, fromNode?.y);
        ctx?.lineTo(toNode?.x, toNode?.y);
        ctx?.stroke();
      });

      // Update and draw nodes
      nodes?.forEach(node => {
        // Update position
        node.x += node?.vx;
        node.y += node?.vy;

        // Bounce off edges
        if (node?.x < 0 || node?.x > canvas?.width) node.vx *= -1;
        if (node?.y < 0 || node?.y > canvas?.height) node.vy *= -1;

        // Draw node
        ctx.globalAlpha = node?.opacity;
        ctx.fillStyle = '#00e5ff';
        ctx?.beginPath();
        ctx?.arc(node?.x, node?.y, node?.radius, 0, Math.PI * 2);
        ctx?.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    initializeNetwork();
    animate();

    const handleResize = () => {
      initializeNetwork();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
        style={{ background: 'transparent' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Icon name="Sparkles" size={16} className="text-primary mr-2" />
                <span className="text-sm font-medium text-primary">
                  Next-Generation AI Assistant
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Your AI that{' '}
                <span className="text-neural-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  grows with you
                </span>
              </h1>

              <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                Experience personalized AI intelligence that adapts to your unique needs. 
                From creative brainstorming to complex analysis, June AI evolves with 
                your workflow and amplifies your potential.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/authentication-portal">
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground shadow-elevated w-full sm:w-auto"
                >
                  Start Your AI Journey
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="border-primary/30 text-primary hover:bg-primary/5 w-full sm:w-auto"
              >
                See June in Action
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="text-sm text-text-secondary">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={20} className="text-energy-medium" />
                <span className="text-sm text-text-secondary">Real-time Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-quantum-medium" />
                <span className="text-sm text-text-secondary">Team Collaboration</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Preview */}
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl shadow-elevated p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 neural-gradient rounded-lg flex items-center justify-center">
                    <Icon name="Bot" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">June AI</h3>
                    <p className="text-xs text-text-secondary">Ready to assist</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-success rounded-full animate-neural-pulse"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-text-secondary mb-2">You:</p>
                  <p className="text-text-primary">
                    "Help me analyze our Q3 sales data and identify growth opportunities"
                  </p>
                </div>

                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-sm text-primary mb-2">June AI:</p>
                  <p className="text-text-primary text-sm leading-relaxed">
                    I'll analyze your Q3 data across multiple dimensions. Based on the patterns, 
                    I've identified 3 key growth opportunities in the enterprise segment...
                  </p>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <span className="text-xs text-text-secondary">Powered by GPT-4</span>
                <div className="flex items-center space-x-2">
                  <Icon name="Sparkles" size={14} className="text-energy-bright" />
                  <span className="text-xs text-energy-medium">Thinking...</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-energy-bright/20 to-quantum-medium/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-text-tertiary" />
      </div>
    </section>
  );
};

export default HeroSection;