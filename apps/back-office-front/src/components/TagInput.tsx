'use client';

import { useState, KeyboardEvent } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  TextField,
  Chip,
  Stack,
  InputAdornment,
} from '@mui/material';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
}

export function TagInput({
  value = [],
  onChange,
  label = '태그',
  placeholder = '태그를 입력하고 엔터를 누르세요',
  error = false,
  helperText,
  fullWidth = true,
  size = 'medium',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      onChange([...value, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box>
      <TextField
        fullWidth={fullWidth}
        label={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        onBlur={addTag}
        error={error}
        helperText={helperText}
        size={size}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <AddIcon 
                fontSize='small' 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={addTag}
              />
            </InputAdornment>
          ),
        }}
      />
      {value.length > 0 && (
        <Stack direction='row' spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
          {value.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => removeTag(tag)}
              size='small'
              color='primary'
              variant='outlined'
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
