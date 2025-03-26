import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

interface DescriptProps {
  title: string;
  description: string;
  subtext?: undefined | string;
  gridColumn: {
    md: number | string;
    sm: number | string;
  };
  gridRow: {
    md: number | string;
    sm: number | string;
  };
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
  backgroundColor: string;
}

const HomeDescriptCard = ({
  title,
  description,
  subtext,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  backgroundColor,
}: DescriptProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        p: 3,
        boxShadow: 0,
        borderRadius: '16px',
        width: '100%',
        height: '100%',
        minHeight: isMobile ? '200px' : '',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor,
        position: 'relative',
        transition: 'background-color 0.3s',
        overflow: 'hidden',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `${backgroundColor} url(${backgroundImage}) ${backgroundPosition} / ${backgroundSize} no-repeat`,
          opacity: isMobile ? 0.3 : 1,
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant='h5' fontWeight={800} sx={{ position: 'relative', zIndex: 1 }}>
          {title}
        </Typography>
        <Typography
          variant='body1'
          fontWeight={800}
          sx={{ position: 'relative', zIndex: 1, mt: 1, width: { sm: '100%', md: '70%' } }}
        >
          {description}
        </Typography>
      </Box>
      {subtext && (
        <Typography
          variant='body2'
          fontWeight={600}
          color='#555'
          mt={2}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          {subtext}
        </Typography>
      )}
    </Box>
  );
};

export default HomeDescriptCard;
