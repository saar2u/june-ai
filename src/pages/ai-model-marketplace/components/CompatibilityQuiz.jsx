import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CompatibilityQuiz = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'workStyle',
      title: 'What best describes your work style?',
      type: 'single',
      options: [
        { value: 'creative', label: 'Creative & Exploratory', description: 'I love brainstorming and generating new ideas' },
        { value: 'analytical', label: 'Data-Driven & Analytical', description: 'I prefer working with facts, numbers, and logical analysis' },
        { value: 'technical', label: 'Technical & Systematic', description: 'I work with code, systems, and technical documentation' },
        { value: 'collaborative', label: 'Collaborative & Communicative', description: 'I focus on team coordination and communication' }
      ]
    },
    {
      id: 'primaryTasks',
      title: 'What are your primary AI use cases?',
      type: 'multiple',
      options: [
        { value: 'writing', label: 'Content Writing & Editing', icon: 'PenTool' },
        { value: 'analysis', label: 'Data Analysis & Insights', icon: 'BarChart3' },
        { value: 'coding', label: 'Code Generation & Review', icon: 'Code' },
        { value: 'research', label: 'Research & Information Gathering', icon: 'Search' },
        { value: 'planning', label: 'Project Planning & Strategy', icon: 'Calendar' },
        { value: 'communication', label: 'Communication & Support', icon: 'MessageSquare' }
      ]
    },
    {
      id: 'complexity',
      title: 'What level of AI complexity do you prefer?',
      type: 'single',
      options: [
        { value: 'simple', label: 'Simple & Straightforward', description: 'I want quick, direct answers without complexity' },
        { value: 'balanced', label: 'Balanced Approach', description: 'I like detailed responses but not overwhelming' },
        { value: 'comprehensive', label: 'Comprehensive & Detailed', description: 'I want thorough analysis with multiple perspectives' },
        { value: 'technical', label: 'Technical & Advanced', description: 'I can handle complex technical explanations' }
      ]
    },
    {
      id: 'integrations',
      title: 'Which tools do you use regularly?',
      type: 'multiple',
      options: [
        { value: 'slack', label: 'Slack', icon: 'MessageSquare' },
        { value: 'teams', label: 'Microsoft Teams', icon: 'Users' },
        { value: 'notion', label: 'Notion', icon: 'FileText' },
        { value: 'github', label: 'GitHub', icon: 'Github' },
        { value: 'jira', label: 'Jira', icon: 'CheckSquare' },
        { value: 'salesforce', label: 'Salesforce', icon: 'Building' }
      ]
    },
    {
      id: 'priorities',
      title: 'What matters most to you in an AI assistant?',
      type: 'ranking',
      options: [
        { value: 'speed', label: 'Response Speed', icon: 'Zap' },
        { value: 'accuracy', label: 'Accuracy & Reliability', icon: 'Target' },
        { value: 'creativity', label: 'Creative Capabilities', icon: 'Palette' },
        { value: 'cost', label: 'Cost Effectiveness', icon: 'DollarSign' },
        { value: 'privacy', label: 'Privacy & Security', icon: 'Shield' }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    const question = questions?.[currentStep];
    
    if (question?.type === 'multiple') {
      const currentAnswers = answers?.[questionId] || [];
      const newAnswers = currentAnswers?.includes(value)
        ? currentAnswers?.filter(v => v !== value)
        : [...currentAnswers, value];
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const calculateRecommendations = () => {
    const { workStyle, primaryTasks, complexity, integrations, priorities } = answers;
    
    // Mock recommendation algorithm
    const recommendations = [];
    
    if (workStyle === 'creative' || (primaryTasks && primaryTasks?.includes('writing'))) {
      recommendations?.push({
        model: 'gpt-4',
        score: 95,
        reasons: ['Excellent creative writing capabilities', 'Strong content generation', 'Versatile communication style']
      });
    }
    
    if (workStyle === 'analytical' || (primaryTasks && primaryTasks?.includes('analysis'))) {
      recommendations?.push({
        model: 'claude',
        score: 92,
        reasons: ['Superior analytical reasoning', 'Detailed data interpretation', 'Structured response format']
      });
    }
    
    if (workStyle === 'technical' || (primaryTasks && primaryTasks?.includes('coding'))) {
      recommendations?.push({
        model: 'gemini',
        score: 88,
        reasons: ['Strong technical capabilities', 'Multi-modal processing', 'Code generation expertise']
      });
    }
    
    if (complexity === 'simple' || (priorities && priorities?.includes('speed'))) {
      recommendations?.push({
        model: 'llama',
        score: 85,
        reasons: ['Fast response times', 'Efficient processing', 'Straightforward answers']
      });
    }
    
    return recommendations?.sort((a, b) => b?.score - a?.score);
  };

  const nextStep = () => {
    if (currentStep < questions?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const recommendations = calculateRecommendations();
      onComplete(recommendations);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions?.[currentStep];
  const currentAnswer = answers?.[currentQuestion?.id];
  const canProceed = currentAnswer && (
    Array.isArray(currentAnswer) ? currentAnswer?.length > 0 : true
  );

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-elevated max-w-2xl w-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">AI Compatibility Quiz</h2>
              <p className="text-sm text-text-secondary mt-1">
                Step {currentStep + 1} of {questions?.length} • Find your perfect AI match
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
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions?.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {currentQuestion?.title}
          </h3>

          <div className="space-y-3">
            {currentQuestion?.options?.map((option) => (
              <div key={option?.value}>
                {currentQuestion?.type === 'single' ? (
                  <button
                    onClick={() => handleAnswer(currentQuestion?.id, option?.value)}
                    className={`
                      w-full p-4 rounded-lg border text-left transition-all duration-200
                      ${currentAnswer === option?.value
                        ? 'border-primary bg-primary/5 shadow-soft'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`
                        w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0
                        ${currentAnswer === option?.value
                          ? 'border-primary bg-primary' :'border-border'
                        }
                      `}>
                        {currentAnswer === option?.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{option?.label}</div>
                        {option?.description && (
                          <div className="text-sm text-text-secondary mt-1">{option?.description}</div>
                        )}
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className={`
                    p-4 rounded-lg border transition-all duration-200
                    ${(currentAnswer || [])?.includes(option?.value)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
                    }
                  `}>
                    <Checkbox
                      label={
                        <div className="flex items-center space-x-3">
                          {option?.icon && (
                            <Icon name={option?.icon} size={20} className="text-text-secondary" />
                          )}
                          <span className="font-medium text-text-primary">{option?.label}</span>
                        </div>
                      }
                      checked={(currentAnswer || [])?.includes(option?.value)}
                      onChange={() => handleAnswer(currentQuestion?.id, option?.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-border">
          <div className="flex justify-between">
            <Button
              variant="outline"
              iconName="ChevronLeft"
              iconPosition="left"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <Button
              variant="default"
              iconName={currentStep === questions?.length - 1 ? "Check" : "ChevronRight"}
              iconPosition="right"
              onClick={nextStep}
              disabled={!canProceed}
            >
              {currentStep === questions?.length - 1 ? 'Get Recommendations' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityQuiz;