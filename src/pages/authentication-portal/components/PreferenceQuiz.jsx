import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PreferenceQuiz = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    workStyle: '',
    communicationTone: '',
    primaryUseCase: '',
    experienceLevel: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const quizSteps = [
    {
      id: 'workStyle',
      title: 'How do you prefer to work?',
      description: 'This helps us customize your AI workspace',
      options: [
        {
          value: 'focused',
          label: 'Deep Focus Sessions',
          description: 'Long, uninterrupted work periods',
          icon: 'Target'
        },
        {
          value: 'collaborative',
          label: 'Collaborative & Social',
          description: 'Team-based projects and discussions',
          icon: 'Users'
        },
        {
          value: 'multitasking',
          label: 'Multi-tasking Dynamo',
          description: 'Juggling multiple projects simultaneously',
          icon: 'Zap'
        },
        {
          value: 'structured',
          label: 'Structured & Methodical',
          description: 'Step-by-step, organized approach',
          icon: 'CheckSquare'
        }
      ]
    },
    {
      id: 'communicationTone',
      title: 'What communication style do you prefer?',
      description: 'Your AI will adapt its responses accordingly',
      options: [
        {
          value: 'professional',
          label: 'Professional & Formal',
          description: 'Business-appropriate, structured responses',
          icon: 'Briefcase'
        },
        {
          value: 'friendly',
          label: 'Friendly & Conversational',
          description: 'Warm, approachable communication',
          icon: 'MessageCircle'
        },
        {
          value: 'direct',
          label: 'Direct & Concise',
          description: 'Straight to the point, no fluff',
          icon: 'ArrowRight'
        },
        {
          value: 'creative',
          label: 'Creative & Inspiring',
          description: 'Imaginative, thought-provoking responses',
          icon: 'Lightbulb'
        }
      ]
    },
    {
      id: 'primaryUseCase',
      title: 'What will you primarily use June AI for?',
      description: 'We\'ll prioritize relevant features for you',
      options: [
        {
          value: 'writing',
          label: 'Writing & Content Creation',
          description: 'Articles, emails, creative writing',
          icon: 'PenTool'
        },
        {
          value: 'analysis',
          label: 'Data Analysis & Research',
          description: 'Processing information, insights',
          icon: 'BarChart3'
        },
        {
          value: 'coding',
          label: 'Programming & Development',
          description: 'Code review, debugging, architecture',
          icon: 'Code'
        },
        {
          value: 'strategy',
          label: 'Strategy & Planning',
          description: 'Decision making, project planning',
          icon: 'Map'
        }
      ]
    },
    {
      id: 'experienceLevel',
      title: 'How familiar are you with AI tools?',
      description: 'We\'ll adjust the interface complexity',
      options: [
        {
          value: 'beginner',
          label: 'New to AI',
          description: 'First time using AI assistants',
          icon: 'Seedling'
        },
        {
          value: 'intermediate',
          label: 'Some Experience',
          description: 'Used ChatGPT or similar tools',
          icon: 'TrendingUp'
        },
        {
          value: 'advanced',
          label: 'AI Power User',
          description: 'Comfortable with prompts and models',
          icon: 'Rocket'
        },
        {
          value: 'expert',
          label: 'AI Expert',
          description: 'Deep understanding of AI capabilities',
          icon: 'Crown'
        }
      ]
    }
  ];

  const currentStepData = quizSteps?.[currentStep];

  const handleOptionSelect = (value) => {
    setPreferences(prev => ({
      ...prev,
      [currentStepData?.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < quizSteps?.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      onComplete(preferences);
      setIsLoading(false);
    }, 1500);
  };

  const isCurrentStepComplete = preferences?.[currentStepData?.id];
  const progress = ((currentStep + 1) / quizSteps?.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep + 1} of {quizSteps?.length}
          </span>
          <button
            onClick={onSkip}
            className="text-sm text-text-secondary hover:text-primary transition-colors"
            disabled={isLoading}
          >
            Skip setup
          </button>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {currentStepData?.title}
        </h2>
        <p className="text-text-secondary">
          {currentStepData?.description}
        </p>
      </div>
      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {currentStepData?.options?.map((option) => (
          <button
            key={option?.value}
            onClick={() => handleOptionSelect(option?.value)}
            className={`
              p-6 rounded-lg border-2 text-left transition-all duration-300
              ${preferences?.[currentStepData?.id] === option?.value
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border hover:border-primary/30 hover:bg-muted/30'
              }
            `}
            disabled={isLoading}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                ${preferences?.[currentStepData?.id] === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary'
                }
              `}>
                <Icon name={option?.icon} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">
                  {option?.label}
                </h3>
                <p className="text-sm text-text-secondary">
                  {option?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0 || isLoading}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Back
        </Button>

        <div className="flex items-center space-x-2">
          {quizSteps?.map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-colors duration-300
                ${index <= currentStep ? 'bg-primary' : 'bg-muted'}
              `}
            ></div>
          ))}
        </div>

        <Button
          variant="default"
          onClick={handleNext}
          disabled={!isCurrentStepComplete}
          loading={isLoading && currentStep === quizSteps?.length - 1}
          iconName={currentStep === quizSteps?.length - 1 ? "Check" : "ChevronRight"}
          iconPosition="right"
          className="bg-primary hover:bg-primary/90"
        >
          {currentStep === quizSteps?.length - 1 
            ? (isLoading ? 'Setting up...' : 'Complete Setup')
            : 'Next'
          }
        </Button>
      </div>
    </div>
  );
};

export default PreferenceQuiz;