import React, { useState, useEffect, useRef } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  ClickAwayListener,
  CircularProgress,
  Typography,
} from '@mui/material';
import { InputAdornment } from '@mui/material';

export interface SearchSelectOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

export interface SearchSelectProps {
  value: SearchSelectOption | null;
  onChange: (option: SearchSelectOption | null) => void;
  onSearch: (searchTerm: string) => Promise<SearchSelectOption[]>;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  helperText?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  minWidth?: number;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = '검색...',
  label,
  disabled = false,
  loading = false,
  error = false,
  helperText,
  size = 'medium',
  fullWidth = false,
  minWidth = 250,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<SearchSelectOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState(value?.label || '');
  const anchorRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setInputValue(value?.label || '');
  }, [value]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setOptions([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await onSearch(term);
      setOptions(results);
    } catch (error) {
      console.error('Search failed:', error);
      setOptions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setSearchTerm(newValue);

    // 디바운스 검색
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(newValue);
    }, 300);
  };

  const handleOptionClick = (option: SearchSelectOption) => {
    onChange(option);
    setInputValue(option.label);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim()) {
      setIsOpen(true);
    }
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setInputValue('');
    setSearchTerm('');
    setOptions([]);
  };

  return (
    <Box ref={anchorRef} sx={{ minWidth, width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        fullWidth={fullWidth}
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        helperText={helperText}
        size={size}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isSearching ? (
                <CircularProgress size={20} />
              ) : (
                <SearchIcon fontSize="small" />
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            cursor: 'pointer',
          },
        }}
      />
      
      <Popper
        open={isOpen && options.length > 0}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        style={{ zIndex: 9999, minWidth: anchorRef.current?.offsetWidth }}
        disablePortal={false}
        modifiers={[
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper elevation={8} sx={{ maxHeight: 300, overflow: 'auto' }}>
            <List dense>
              {options.map((option) => (
                <ListItem
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={option.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};
