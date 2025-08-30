import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ConversationHeader from './components/ConversationHeader';
import ConversationSidebar from './components/ConversationSidebar';
import ConversationArea from './components/ConversationArea';
import MessageInput from './components/MessageInput';
import IntegrationPanel from './components/IntegrationPanel';

const ConversationTheater = () => {
  const [currentModel, setCurrentModel] = useState({
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Advanced reasoning and analysis',
    color: 'neural',
    status: 'active'
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isIntegrationPanelOpen, setIsIntegrationPanelOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState('conv-1');
  const [isLoading, setIsLoading] = useState(false);

  // Mock conversations data
  const [conversations] = useState([
    {
      id: 'conv-1',
      title: 'Project Planning Discussion',
      preview: 'Can you help me create a comprehensive project plan for our new AI initiative?',
      lastMessage: new Date(Date.now() - 300000),
      messageCount: 12,
      modelId: 'gpt-4',
      isRecent: true,
      isFavorite: true,
      isArchived: false
    },
    {
      id: 'conv-2',
      title: 'Code Review Session',
      preview: 'I need help reviewing this React component for performance optimization.',
      lastMessage: new Date(Date.now() - 3600000),
      messageCount: 8,
      modelId: 'claude',
      isRecent: true,
      isFavorite: false,
      isArchived: false
    },
    {
      id: 'conv-3',
      title: 'Creative Writing Workshop',
      preview: 'Let\'s work on developing characters for my science fiction novel.',
      lastMessage: new Date(Date.now() - 86400000),
      messageCount: 25,
      modelId: 'gemini',
      isRecent: false,
      isFavorite: true,
      isArchived: false
    },
    {
      id: 'conv-4',
      title: 'Data Analysis Deep Dive',
      preview: 'Analyzing customer behavior patterns from our Q3 sales data.',
      lastMessage: new Date(Date.now() - 172800000),
      messageCount: 15,
      modelId: 'gpt-4',
      isRecent: false,
      isFavorite: false,
      isArchived: false
    }
  ]);

  // Mock messages for current conversation
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'user',
      content: 'Can you help me create a comprehensive project plan for our new AI initiative? We need to integrate multiple AI models into our existing workflow.',
      timestamp: new Date(Date.now() - 1800000),
      modelId: null
    },
    {
      id: 'msg-2',
      sender: 'ai',
      content: `I'd be happy to help you create a comprehensive AI initiative project plan! Let me break this down into key phases and considerations:\n\n## Phase 1: Discovery & Assessment (Weeks 1-2)\n- **Current State Analysis**: Audit existing workflows and systems\n- **Stakeholder Interviews**: Identify pain points and requirements\n- **Technical Infrastructure Review**: Assess current capabilities\n- **AI Model Research**: Evaluate suitable models for your use cases\n\n## Phase 2: Strategy & Design (Weeks 3-4)\n- **Integration Architecture**: Design how AI models will connect to existing systems\n- **Data Pipeline Planning**: Map data flows and storage requirements\n- **Security & Compliance Framework**: Ensure regulatory adherence\n- **Success Metrics Definition**: Establish KPIs and measurement criteria\n\n## Phase 3: Implementation (Weeks 5-12)\n- **Pilot Development**: Start with one high-impact use case\n- **Model Integration**: Connect selected AI models to workflows\n- **Testing & Validation**: Comprehensive quality assurance\n- **User Training**: Prepare teams for new AI-enhanced processes\n\n## Key Considerations:\n- **Change Management**: Plan for user adoption and resistance\n- **Scalability**: Design for future expansion\n- **Monitoring**: Implement performance tracking from day one\n\nWould you like me to elaborate on any specific phase or discuss particular AI models that might fit your use case?`,
      timestamp: new Date(Date.now() - 1740000),
      modelId: 'gpt-4',
      context: ['Project Management Best Practices', 'AI Integration Patterns'],
      isStreaming: false
    },
    {
      id: 'msg-3',
      sender: 'user',
      content: 'This is excellent! Can you focus more on the technical integration architecture? We\'re particularly interested in how to handle real-time data processing and model switching.',
      timestamp: new Date(Date.now() - 1680000),
      modelId: null
    },
    {
      id: 'msg-4',
      sender: 'ai',
      content: `Excellent question! Let me dive deeper into the technical architecture for real-time AI integration with dynamic model switching:\n\n## Real-Time Data Processing Architecture\n\n### 1. Event-Driven Microservices\n- **API Gateway**: Single entry point for all AI requests\n- **Message Queue**: Apache Kafka or AWS SQS for async processing\n- **Stream Processing**: Apache Flink or AWS Kinesis for real-time data\n- **Load Balancer**: Distribute requests across AI model instances\n\n### 2. Model Orchestration Layer\n\`\`\`python\nclass AIModelOrchestrator:\n    def __init__(self):\n        self.models = {\n            'gpt-4': GPT4Handler(),\n            'claude': ClaudeHandler(),\n            'gemini': GeminiHandler()\n        }\n        self.routing_rules = ModelRoutingEngine()\n    \n    async def process_request(self, request):\n        # Intelligent model selection\n        selected_model = self.routing_rules.select_model(\n            request.context, \n            request.complexity,\n            request.user_preferences\n        )\n        \n        return await self.models[selected_model].process(request)\n\`\`\`\n\n### 3. Context Preservation System\n- **Conversation State**: Redis for fast session storage\n- **Context Vector Database**: Pinecone or Weaviate for semantic context\n- **Model State Synchronization**: Ensure context transfers between models\n\n### 4. Real-Time Features\n- **WebSocket Connections**: Bi-directional real-time communication\n- **Server-Sent Events**: Stream AI responses as they generate\n- **Circuit Breakers**: Failover mechanisms for model unavailability\n\nWould you like me to elaborate on any specific component or discuss implementation strategies for your particular tech stack?`,
      timestamp: new Date(Date.now() - 1620000),
      modelId: 'gpt-4',
      attachments: [
        {
          type: 'code',
          language: 'python',
          content: `class AIModelOrchestrator:\n    def __init__(self):\n        self.models = {\n            'gpt-4': GPT4Handler(),\n            'claude': ClaudeHandler(),\n            'gemini': GeminiHandler()\n        }\n        self.routing_rules = ModelRoutingEngine()\n    \n    async def process_request(self, request):\n        selected_model = self.routing_rules.select_model(\n            request.context, \n            request.complexity,\n            request.user_preferences\n        )\n        \n        return await self.models[selected_model].process(request)`
        }
      ],
      context: ['System Architecture', 'Real-time Processing', 'Model Management'],
      isStreaming: false
    }
  ]);

  // Handle model change
  const handleModelChange = (model) => {
    setCurrentModel(model);
  };

  // Handle new conversation
  const handleNewConversation = () => {
    const newConvId = `conv-${Date.now()}`;
    setCurrentConversationId(newConvId);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  // Handle conversation selection
  const handleConversationSelect = (conversationId) => {
    setCurrentConversationId(conversationId);
    // In a real app, you would load messages for this conversation
    setIsSidebarOpen(false);
  };

  // Handle sending message
  const handleSendMessage = async (messageData) => {
    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: messageData?.content,
      timestamp: messageData?.timestamp,
      attachments: messageData?.attachments,
      modelId: null
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        content: `Thank you for your message! I understand you're asking about: "${messageData?.content?.substring(0, 50)}${messageData?.content?.length > 50 ? '...' : ''}"\n\nLet me provide you with a comprehensive response based on my analysis. This is a simulated response to demonstrate the conversation flow. In a real implementation, this would be generated by the selected AI model (${currentModel?.name}) with appropriate context and intelligence.\n\nI can help you explore this topic further or assist with related questions. What specific aspect would you like to dive deeper into?`,
        timestamp: new Date(),
        modelId: currentModel?.id,
        context: ['User Query Analysis', 'Contextual Response'],
        isStreaming: false
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  // Handle message actions
  const handleMessageRegenerate = (message) => {
    console.log('Regenerating message:', message?.id);
  };

  const handleMessageCopy = (message) => {
    console.log('Copied message:', message?.id);
  };

  const handleMessageBranch = (message) => {
    console.log('Branching from message:', message?.id);
  };

  // Handle integration toggle
  const handleIntegrationToggle = (integrationId) => {
    console.log('Toggling integration:', integrationId);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 'k':
            e?.preventDefault();
            setIsSidebarOpen(!isSidebarOpen);
            break;
          case 'i':
            e?.preventDefault();
            setIsIntegrationPanelOpen(!isIntegrationPanelOpen);
            break;
          case 'n':
            e?.preventDefault();
            handleNewConversation();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen, isIntegrationPanelOpen]);

  return (
    <>
      <Helmet>
        <title>Conversation Theater - June AI</title>
        <meta name="description" content="Immersive AI conversation interface with intelligent threading, context awareness, and seamless model switching capabilities." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="flex h-screen pt-16">
          {/* Conversation Sidebar */}
          <ConversationSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            conversations={conversations}
            currentConversationId={currentConversationId}
            onConversationSelect={handleConversationSelect}
            onNewConversation={handleNewConversation}
          />

          {/* Main Conversation Area */}
          <div className="flex-1 flex flex-col">
            {/* Conversation Header */}
            <ConversationHeader
              currentModel={currentModel}
              onModelChange={handleModelChange}
              onNewConversation={handleNewConversation}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              isSidebarOpen={isSidebarOpen}
            />

            {/* Conversation Messages */}
            <ConversationArea
              messages={messages}
              isLoading={isLoading}
              onMessageRegenerate={handleMessageRegenerate}
              onMessageCopy={handleMessageCopy}
              onMessageBranch={handleMessageBranch}
            />

            {/* Message Input */}
            <MessageInput
              onSendMessage={handleSendMessage}
              currentModel={currentModel}
              isLoading={isLoading}
            />
          </div>

          {/* Integration Panel */}
          <IntegrationPanel
            isOpen={isIntegrationPanelOpen}
            onClose={() => setIsIntegrationPanelOpen(false)}
            onIntegrationToggle={handleIntegrationToggle}
            integrations={[]}
          />
        </div>

        {/* Floating Action Button for Integrations */}
        <button
          onClick={() => setIsIntegrationPanelOpen(!isIntegrationPanelOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-105 z-floating"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>

        {/* Keyboard Shortcuts Indicator */}
        <div className="fixed bottom-6 left-6 bg-card border border-border rounded-lg p-3 shadow-soft opacity-80 hover:opacity-100 transition-opacity z-floating">
          <div className="text-xs text-text-secondary space-y-1">
            <div className="flex items-center space-x-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+K</kbd>
              <span>Toggle sidebar</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+N</kbd>
              <span>New conversation</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+I</kbd>
              <span>Integrations</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationTheater;