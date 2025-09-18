'use client';

import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener,
  CircularProgress,
  Paper,
  Box,
} from '@mui/material';
import { regionApi } from '@repo/api/admin';

interface SearchOption {
  id: string | number;
  label: string;
}

interface RegionSearchSelectProps {
  value: string;
  onChange: (regionId: string, regionLabel: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
}

export function RegionSearchSelect({
  value,
  onChange,
  label = '지역 검색',
  placeholder = '지역 이름으로 검색...',
  error = false,
  helperText,
  required = false,
  fullWidth = true,
  size = 'medium',
}: RegionSearchSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchOption[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // 지역 검색
  const searchRegions = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await regionApi.getRegionList(1, 10, { searchString: searchTerm });
      const results = response.data.list.map((region) => ({
        id: region.id,
        label: `${region.name} (${region.id})`,
      }));
      setSearchResults(results);
    } catch (error) {
      console.error('지역 검색 실패:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (inputValue: string) => {
    setSearchTerm(inputValue);
    searchRegions(inputValue);
    setShowResults(true);
  };

  const handleOptionSelect = (option: SearchOption) => {
    onChange(String(option.id), option.label);
    setSearchTerm(option.label);
    setShowResults(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        fullWidth={fullWidth}
        label={label}
        placeholder={placeholder}
        value={searchTerm || value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setShowResults(true)}
        error={error}
        helperText={helperText}
        required={required}
        size={size}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {isSearching ? (
                <CircularProgress size={20} />
              ) : (
                <SearchIcon fontSize='small' />
              )}
            </InputAdornment>
          ),
        }}
      />
      {showResults && searchResults.length > 0 && (
        <ClickAwayListener onClickAway={() => setShowResults(false)}>
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1300,
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            <List dense>
              {searchResults.map((option) => (
                <ListItem
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText primary={option.label} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
