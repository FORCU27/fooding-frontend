'use client';

import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';

export type StoreImageTag = 'PRICE_TAG' | 'FOOD' | 'BEVERAGE' | 'INTERIOR' | 'EXTERIOR';

const TAG_LABELS: Record<StoreImageTag, string> = {
  PRICE_TAG: '가격표',
  FOOD: '음식',
  BEVERAGE: '음료',
  INTERIOR: '인테리어',
  EXTERIOR: '외관',
};

interface TagCheckboxGroupProps {
  value: StoreImageTag[];
  onChange: (tags: StoreImageTag[]) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

export function TagCheckboxGroup({
  value = [],
  onChange,
  label = '태그',
  error = false,
  helperText,
  fullWidth = true,
}: TagCheckboxGroupProps) {
  const handleTagChange = (tag: StoreImageTag) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange([...value, tag]);
    } else {
      onChange(value.filter(t => t !== tag));
    }
  };

  return (
    <FormControl component="fieldset" error={error} fullWidth={fullWidth}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(Object.keys(TAG_LABELS) as StoreImageTag[]).map((tag) => (
            <FormControlLabel
              key={tag}
              control={
                <Checkbox
                  checked={value.includes(tag)}
                  onChange={handleTagChange(tag)}
                  size="small"
                />
              }
              label={TAG_LABELS[tag]}
            />
          ))}
        </Box>
      </FormGroup>
      {helperText && (
        <Box sx={{ color: error ? 'error.main' : 'text.secondary', fontSize: '0.75rem', mt: 0.5 }}>
          {helperText}
        </Box>
      )}
    </FormControl>
  );
}
