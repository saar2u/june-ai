import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, activeFilters = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchRef = useRef(null);

  const searchSuggestions = [
    { type: 'model', text: 'GPT-4', category: 'AI Model' },
    { type: 'model', text: 'Claude', category: 'AI Model' },
    { type: 'model', text: 'Gemini', category: 'AI Model' },
    { type: 'category', text: 'Creative Writing', category: 'Category' },
    { type: 'category', text: 'Data Analysis', category: 'Category' },
    { type: 'category', text: 'Code Generation', category: 'Category' },
    { type: 'usecase', text: 'Content Creation', category: 'Use Case' },
    { type: 'usecase', text: 'Research Assistant', category: 'Use Case' },
    { type: 'usecase', text: 'Technical Documentation', category: 'Use Case' },
    { type: 'feature', text: 'High Accuracy', category: 'Feature' },
    { type: 'feature', text: 'Fast Response', category: 'Feature' },
    { type: 'feature', text: 'Multi-language', category: 'Feature' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    
    if (query?.length > 0) {
      const filtered = searchSuggestions?.filter(suggestion =>
        suggestion?.text?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
      setSelectedSuggestion(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(suggestions?.[selectedSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.text);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    onSearch(suggestion?.text);
  };

  const handleSearch = () => {
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'model': return 'Bot';
      case 'category': return 'Grid3x3';
      case 'usecase': return 'Target';
      case 'feature': return 'Star';
      default: return 'Search';
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        
        <Input
          type="text"
          placeholder="Search AI models, categories, or use cases..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-20 h-12 text-base"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={clearSearch}
              className="text-text-secondary hover:text-primary w-8 h-8 p-0"
            />
          )}
          
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            onClick={onFilterToggle}
            className={`
              relative
              ${activeFilters > 0 ? 'text-primary border-primary' : 'text-text-secondary'}
            `}
          >
            {activeFilters > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-energy-bright text-white text-xs rounded-full flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </Button>
        </div>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-64 overflow-y-auto">
          {suggestions?.map((suggestion, index) => (
            <button
              key={`${suggestion?.type}-${suggestion?.text}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors
                ${index === selectedSuggestion ? 'bg-muted/50' : ''}
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === suggestions?.length - 1 ? 'rounded-b-lg' : 'border-b border-border'}
              `}
            >
              <Icon 
                name={getSuggestionIcon(suggestion?.type)} 
                size={16} 
                className="text-text-secondary flex-shrink-0" 
              />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{suggestion?.text}</div>
                <div className="text-xs text-text-secondary">{suggestion?.category}</div>
              </div>
              <Icon name="CornerDownLeft" size={14} className="text-text-tertiary" />
            </button>
          ))}
        </div>
      )}
      {/* Quick Search Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {['Popular', 'Creative', 'Technical', 'Fast', 'Accurate']?.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSearchQuery(tag);
              onSearch(tag);
            }}
            className="px-3 py-1 text-xs bg-muted text-text-secondary rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;