import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ModelCard from './components/ModelCard';
import FilterPanel from './components/FilterPanel';
import ModelComparison from './components/ModelComparison';
import ModelPreview from './components/ModelPreview';
import CompatibilityQuiz from './components/CompatibilityQuiz';
import SearchBar from './components/SearchBar';

const AIModelMarketplace = () => {
  const [selectedModels, setSelectedModels] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [sortBy, setSortBy] = useState('popularity');
  const [showComparison, setShowComparison] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [quizRecommendations, setQuizRecommendations] = useState([]);

  // Mock AI models data
  const aiModels = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      category: 'Conversational AI',
      description: `Advanced language model with exceptional reasoning capabilities and creative problem-solving skills.\nExcels at complex writing tasks, code generation, and multi-step analysis.`,
      icon: 'MessageSquare',
      gradient: 'neural-gradient',
      status: 'active',
      rating: 4.8,
      reviews: 15420,
      responseTime: '1.2s',
      accuracy: 94,
      uptime: 99.9,
      isNew: false,
      capabilities: [
        { name: 'Creative Writing', score: 95 },
        { name: 'Code Generation', score: 88 },
        { name: 'Logical Reasoning', score: 92 },
        { name: 'Language Translation', score: 89 }
      ],
      useCases: ['Content Creation', 'Code Review', 'Research Analysis', 'Creative Writing', 'Technical Documentation'],
      integrations: ['slack', 'teams', 'notion', 'github'],
      pricing: 'Free + Premium',
      pricingModel: 'Usage-based'
    },
    {
      id: 'claude',
      name: 'Claude',
      category: 'Analytical AI',
      description: `Constitutional AI focused on helpful, harmless, and honest interactions.\nSpecializes in detailed analysis, ethical reasoning, and structured responses.`,
      icon: 'Brain',
      gradient: 'bg-gradient-to-br from-quantum-deep to-quantum-medium',
      status: 'active',
      rating: 4.7,
      reviews: 8930,
      responseTime: '1.5s',
      accuracy: 96,
      uptime: 99.8,
      isNew: false,
      capabilities: [
        { name: 'Analytical Thinking', score: 97 },
        { name: 'Ethical Reasoning', score: 95 },
        { name: 'Research Synthesis', score: 93 },
        { name: 'Technical Writing', score: 90 }
      ],
      useCases: ['Data Analysis', 'Research Reports', 'Policy Analysis', 'Academic Writing', 'Risk Assessment'],
      integrations: ['slack', 'notion', 'jira'],
      pricing: 'Premium',
      pricingModel: 'Subscription'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      category: 'Multimodal AI',
      description: `Next-generation multimodal AI with advanced reasoning and creative capabilities.\nProcesses text, images, and code with exceptional versatility and speed.`,
      icon: 'Sparkles',
      gradient: 'bg-gradient-to-br from-energy-bright to-energy-medium',
      status: 'active',
      rating: 4.6,
      reviews: 12100,
      responseTime: '0.8s',
      accuracy: 91,
      uptime: 99.7,
      isNew: true,
      capabilities: [
        { name: 'Multimodal Processing', score: 94 },
        { name: 'Speed Optimization', score: 96 },
        { name: 'Visual Understanding', score: 88 },
        { name: 'Code Analysis', score: 85 }
      ],
      useCases: ['Image Analysis', 'Rapid Prototyping', 'Visual Content', 'Multi-format Processing', 'Real-time Chat'],
      integrations: ['teams', 'github', 'figma'],
      pricing: 'Freemium',
      pricingModel: 'Tiered'
    },
    {
      id: 'llama',
      name: 'LLaMA 2',
      category: 'Open Source AI',
      description: `Open-source large language model optimized for efficiency and customization.\nOffers transparency, flexibility, and community-driven improvements.`,
      icon: 'Code',
      gradient: 'bg-gradient-to-br from-warning to-orange-600',
      status: 'beta',
      rating: 4.4,
      reviews: 5670,
      responseTime: '2.1s',
      accuracy: 87,
      uptime: 99.5,
      isNew: false,
      capabilities: [
        { name: 'Open Source Flexibility', score: 98 },
        { name: 'Cost Efficiency', score: 95 },
        { name: 'Customization', score: 92 },
        { name: 'Community Support', score: 89 }
      ],
      useCases: ['Custom Development', 'Research Projects', 'Educational Use', 'Prototype Testing', 'Local Deployment'],
      integrations: ['github', 'docker', 'kubernetes'],
      pricing: 'Free',
      pricingModel: 'Open Source'
    },
    {
      id: 'codex',
      name: 'GitHub Copilot',
      category: 'Code Assistant',
      description: `Specialized AI for code generation, completion, and programming assistance.\nTrained on billions of lines of code for exceptional programming support.`,
      icon: 'Terminal',
      gradient: 'bg-gradient-to-br from-gray-800 to-gray-600',
      status: 'active',
      rating: 4.5,
      reviews: 23400,
      responseTime: '0.5s',
      accuracy: 89,
      uptime: 99.9,
      isNew: false,
      capabilities: [
        { name: 'Code Generation', score: 96 },
        { name: 'Bug Detection', score: 88 },
        { name: 'Code Completion', score: 94 },
        { name: 'Multi-language Support', score: 92 }
      ],
      useCases: ['Software Development', 'Code Review', 'Bug Fixing', 'API Integration', 'Documentation'],
      integrations: ['github', 'vscode', 'jetbrains'],
      pricing: 'Premium',
      pricingModel: 'Subscription'
    },
    {
      id: 'dall-e',
      name: 'DALL-E 3',
      category: 'Creative AI',
      description: `Advanced image generation AI creating stunning visuals from text descriptions.\nPerfect for creative projects, marketing materials, and visual storytelling.`,
      icon: 'Image',
      gradient: 'bg-gradient-to-br from-purple-600 to-pink-600',
      status: 'active',
      rating: 4.7,
      reviews: 18200,
      responseTime: '3.2s',
      accuracy: 92,
      uptime: 99.6,
      isNew: false,
      capabilities: [
        { name: 'Image Generation', score: 97 },
        { name: 'Style Adaptation', score: 94 },
        { name: 'Prompt Understanding', score: 91 },
        { name: 'Creative Interpretation', score: 96 }
      ],
      useCases: ['Marketing Design', 'Concept Art', 'Social Media', 'Presentations', 'Creative Projects'],
      integrations: ['figma', 'canva', 'adobe'],
      pricing: 'Premium',
      pricingModel: 'Credit-based'
    }
  ];

  const filteredModels = aiModels?.filter(model => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      const matchesSearch = 
        model?.name?.toLowerCase()?.includes(query) ||
        model?.category?.toLowerCase()?.includes(query) ||
        model?.description?.toLowerCase()?.includes(query) ||
        model?.useCases?.some(useCase => useCase?.toLowerCase()?.includes(query));
      
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters?.category && filters?.category?.length > 0) {
      const categoryMatch = filters?.category?.some(cat => 
        model?.category?.toLowerCase()?.includes(cat) ||
        model?.useCases?.some(useCase => useCase?.toLowerCase()?.includes(cat))
      );
      if (!categoryMatch) return false;
    }

    // Status filter
    if (filters?.status && filters?.status?.length > 0) {
      if (!filters?.status?.includes(model?.status)) return false;
    }

    // Other filters can be added here
    return true;
  });

  const sortedModels = [...filteredModels]?.sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b?.reviews - a?.reviews;
      case 'rating':
        return b?.rating - a?.rating;
      case 'speed':
        return parseFloat(a?.responseTime) - parseFloat(b?.responseTime);
      case 'accuracy':
        return b?.accuracy - a?.accuracy;
      case 'name':
        return a?.name?.localeCompare(b?.name);
      default:
        return 0;
    }
  });

  const handleModelSelect = (model) => {
    setSelectedModels(prev => {
      const isSelected = prev?.find(m => m?.id === model?.id);
      if (isSelected) {
        return prev?.filter(m => m?.id !== model?.id);
      } else {
        return [...prev, model];
      }
    });
  };

  const handleFilterChange = (section, values) => {
    setFilters(prev => ({
      ...prev,
      [section]: values
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.reduce((total, values) => total + values?.length, 0);
  };

  const handleQuizComplete = (recommendations) => {
    setQuizRecommendations(recommendations);
    setShowQuiz(false);
    // Optionally scroll to recommended models or highlight them
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-neural-deep via-quantum-deep to-primary py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                AI Model Marketplace
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Discover, compare, and select the perfect AI models for your unique needs. 
                From creative writing to data analysis, find your ideal AI partner.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Zap"
                  iconPosition="left"
                  onClick={() => setShowQuiz(true)}
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Take Compatibility Quiz
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="BarChart3"
                  iconPosition="left"
                  onClick={() => selectedModels?.length > 1 && setShowComparison(true)}
                  disabled={selectedModels?.length < 2}
                  className="border-white text-white hover:bg-white/10"
                >
                  Compare Models ({selectedModels?.length})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-card border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <SearchBar
                onSearch={setSearchQuery}
                onFilterToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
                activeFilters={getActiveFilterCount()}
              />
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-1 border border-border rounded-md text-sm bg-background text-text-primary"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                    <option value="speed">Speed</option>
                    <option value="accuracy">Accuracy</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="Grid3x3"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  />
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="List"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none border-l"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="flex gap-6">
            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              isCollapsed={isFilterCollapsed}
              onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
            />

            {/* Models Grid/List */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">
                    {sortedModels?.length} AI Models Available
                  </h2>
                  {searchQuery && (
                    <p className="text-sm text-text-secondary mt-1">
                      Results for "{searchQuery}"
                    </p>
                  )}
                </div>
                
                {selectedModels?.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">
                      {selectedModels?.length} selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="X"
                      onClick={() => setSelectedModels([])}
                    >
                      Clear Selection
                    </Button>
                  </div>
                )}
              </div>

              {/* Quiz Recommendations */}
              {quizRecommendations?.length > 0 && (
                <div className="mb-8 p-4 bg-energy-bright/5 border border-energy-bright/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Sparkles" size={20} className="text-energy-medium" />
                    <h3 className="font-semibold text-text-primary">Recommended for You</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quizRecommendations?.slice(0, 3)?.map((rec) => {
                      const model = aiModels?.find(m => m?.id === rec?.model);
                      return model ? (
                        <div key={model?.id} className="p-3 bg-white rounded-lg border border-energy-bright/30">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${model?.gradient}`}>
                              <Icon name={model?.icon} size={16} className="text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-text-primary">{model?.name}</h4>
                              <div className="text-xs text-energy-medium font-semibold">
                                {rec?.score}% match
                              </div>
                            </div>
                          </div>
                          <ul className="text-xs text-text-secondary space-y-1">
                            {rec?.reasons?.slice(0, 2)?.map((reason, idx) => (
                              <li key={idx} className="flex items-start space-x-1">
                                <Icon name="Check" size={10} className="text-energy-medium mt-0.5 flex-shrink-0" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Models Display */}
              {sortedModels?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-tertiary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No models found</h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className={`
                  ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
                  }
                `}>
                  {sortedModels?.map((model) => (
                    <ModelCard
                      key={model?.id}
                      model={model}
                      onSelect={handleModelSelect}
                      onPreview={setShowPreview}
                      isSelected={selectedModels?.some(m => m?.id === model?.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        {selectedModels?.length > 1 && (
          <div className="fixed bottom-6 right-6 z-40">
            <Button
              variant="default"
              size="lg"
              iconName="BarChart3"
              iconPosition="left"
              onClick={() => setShowComparison(true)}
              className="bg-primary hover:bg-primary/90 shadow-elevated"
            >
              Compare {selectedModels?.length} Models
            </Button>
          </div>
        )}
      </div>
      {/* Modals */}
      {showComparison && (
        <ModelComparison
          models={selectedModels}
          onClose={() => setShowComparison(false)}
          onSelectModel={(model) => {
            setShowComparison(false);
            // Navigate to workspace with selected model
          }}
        />
      )}
      {showPreview && (
        <ModelPreview
          model={showPreview}
          onClose={() => setShowPreview(null)}
          onSelect={(model) => {
            handleModelSelect(model);
            setShowPreview(null);
          }}
        />
      )}
      {showQuiz && (
        <CompatibilityQuiz
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
};

export default AIModelMarketplace;