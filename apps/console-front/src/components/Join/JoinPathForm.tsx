import { ExpandMoreOutlined } from '@mui/icons-material';
import { Box, InputLabel, Select, MenuItem } from '@mui/material';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { UserType } from '@/repository/auth-repository';

interface JoinPathFormProps {
  register: UseFormRegister<UserType>;
  watch: UseFormWatch<UserType>;
}

const JoinPathForm = ({ register, watch }: JoinPathFormProps) => {
  const { joinPath } = watch();

  return (
    <Box sx={{ p: 2 }}>
      <InputLabel sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>유입경로</InputLabel>
      <Select
        fullWidth
        size='small'
        IconComponent={ExpandMoreOutlined}
        sx={{
          height: '48px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          '& fieldset': { border: 'none' },
        }}
        {...register('joinPath')}
        value={joinPath}
      >
        <MenuItem value='EMPTY' disabled>
          <em style={{ color: '#999999', fontStyle: 'normal' }}>
            잽을 알게된 경로를 선택해주세요.
          </em>
        </MenuItem>
        <MenuItem value='SNS'>SNS</MenuItem>
        <MenuItem value='FRIEND'>FRIEND</MenuItem>
        <MenuItem value='INTERNET'>INTERNET</MenuItem>
        <MenuItem value='NONE'>NONE</MenuItem>
      </Select>
    </Box>
  );
};

export default JoinPathForm;
