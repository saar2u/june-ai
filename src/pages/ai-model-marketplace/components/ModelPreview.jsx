import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ModelPreview = ({ model, onClose, onSelect }) => {
  const [previewQuery, setPreviewQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewResponse, setPreviewResponse] = useState('');

  const sampleQueries = [
    "Write a creative story about AI and humans working together",
    "Analyze the trends in renewable energy adoption",
    "Help me debug this JavaScript function",
    "Explain quantum computing in simple terms",
    "Create a marketing strategy for a new product"
  ];

  const handlePreviewGenerate = async () => {
    if (!previewQuery?.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const responses = {
        'gpt-4': `Based on your query about "${previewQuery}", I can provide a comprehensive analysis. As GPT-4, I excel at understanding context and providing detailed, nuanced responses that consider multiple perspectives.\n\nHere's my approach to your request:\n\n1. **Context Analysis**: I first analyze the core intent behind your query\n2. **Multi-faceted Response**: I provide information from various angles\n3. **Practical Application**: I include actionable insights where relevant\n\nThis preview demonstrates my ability to structure responses clearly while maintaining depth and accuracy. My training allows me to adapt my communication style to match your specific needs and expertise level.`,
        
        'claude': `Thank you for your query: "${previewQuery}". As Claude, I focus on being helpful, harmless, and honest in my responses.\n\n**My Response Approach:**\n- **Thoughtful Analysis**: I carefully consider the implications of your question\n- **Balanced Perspective**: I present multiple viewpoints when appropriate\n- **Clear Communication**: I structure my responses for maximum clarity\n\n**Key Strengths in This Response:**\n✓ Constitutional AI training for safety\n✓ Strong reasoning capabilities\n✓ Nuanced understanding of complex topics\n\nI'm designed to be a thoughtful conversation partner who can engage with complex topics while maintaining ethical guidelines and providing valuable insights.`,
        
        'gemini': `Analyzing your query: "${previewQuery}"\n\n🔍 **Gemini's Multi-Modal Analysis:**\n\n**Text Understanding**: I process your query with advanced language comprehension\n**Contextual Reasoning**: I consider the broader context and implications\n**Creative Synthesis**: I combine information in novel and useful ways\n\n**Response Highlights:**\n• **Speed**: Ultra-fast processing for real-time interactions\n• **Accuracy**: High-precision responses backed by extensive training\n• **Versatility**: Capable of handling diverse query types\n\n**Next Steps**: I can expand on any aspect of this response or tackle related questions. My multimodal capabilities allow me to work with text, images, and code seamlessly.`,
        
        'llama': `Processing query: "${previewQuery}"\n\n**LLaMA Response Framework:**\n\n**Open Source Advantage**: As an open-source model, I offer transparency and customizability\n\n**Response Structure**:\n1. **Query Interpretation**: Understanding your specific needs\n2. **Knowledge Synthesis**: Drawing from diverse training data\n3. **Practical Output**: Delivering actionable information\n\n**Model Characteristics**:\n- **Efficiency**: Optimized for performance and resource usage\n- **Flexibility**: Adaptable to various use cases and domains\n- **Community-Driven**: Continuously improved through open collaboration\n\nThis preview showcases my ability to provide structured, informative responses while maintaining efficiency and clarity.`
      };
      
      setPreviewResponse(responses?.[model?.id] || responses?.['gpt-4']);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${model?.gradient}`}>
                <Icon name={model?.icon} size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">{model?.name} Preview</h2>
                <p className="text-sm text-text-secondary">{model?.category} • {model?.description}</p>
              </div>
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

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Panel - Model Info */}
          <div className="w-80 border-r border-border p-6 overflow-y-auto">
            {/* Performance Metrics */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Response Time</span>
                  <span className="font-medium text-text-primary">{model?.responseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Accuracy</span>
                  <span className="font-medium text-text-primary">{model?.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Uptime</span>
                  <span className="font-medium text-text-primary">{model?.uptime}%</span>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Capabilities</h3>
              <div className="space-y-2">
                {model?.capabilities?.map((capability) => (
                  <div key={capability?.name} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{capability?.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            capability?.score >= 90 ? 'bg-success' :
                            capability?.score >= 70 ? 'bg-energy-bright' :
                            capability?.score >= 50 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${capability?.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-text-primary w-8">
                        {capability?.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Best For</h3>
              <div className="space-y-1">
                {model?.useCases?.map((useCase) => (
                  <div key={useCase} className="px-2 py-1 bg-muted rounded text-sm text-text-secondary">
                    {useCase}
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Queries */}
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Try These Queries</h3>
              <div className="space-y-2">
                {sampleQueries?.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setPreviewQuery(query)}
                    className="w-full text-left p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted/50 rounded transition-colors"
                  >
                    "{query}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview Interface */}
          <div className="flex-1 flex flex-col">
            {/* Query Input */}
            <div className="p-6 border-b border-border">
              <div className="flex space-x-3">
                <Input
                  placeholder="Ask me anything to see how I respond..."
                  value={previewQuery}
                  onChange={(e) => setPreviewQuery(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handlePreviewGenerate()}
                  className="flex-1"
                />
                <Button
                  variant="default"
                  iconName="Send"
                  loading={isGenerating}
                  onClick={handlePreviewGenerate}
                  disabled={!previewQuery?.trim()}
                >
                  Generate
                </Button>
              </div>
            </div>

            {/* Response Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {!previewResponse && !isGenerating && (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <div className={`w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center ${model?.gradient}`}>
                      <Icon name={model?.icon} size={32} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Ready to demonstrate {model?.name}
                    </h3>
                    <p className="text-text-secondary">
                      Enter a query above or click on a sample query to see how this AI model responds
                    </p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-text-secondary">Generating response...</p>
                  </div>
                </div>
              )}

              {previewResponse && (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${model?.gradient} flex-shrink-0`}>
                      <Icon name={model?.icon} size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm text-text-primary font-sans">
                          {previewResponse}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="p-6 border-t border-border">
              <div className="flex justify-between items-center">
                <div className="text-sm text-text-secondary">
                  This is a preview of {model?.name}'s capabilities
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                  >
                    Close Preview
                  </Button>
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => onSelect(model)}
                  >
                    Select {model?.name}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPreview;