'use client';

import Link from 'next/link';

import { CardGiftcard, History } from '@mui/icons-material';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';

export default function RewardsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#1e293b' }}>
        리워드 관리
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
        gap: 3 
      }}>
        <Link href="/rewards/points" style={{ textDecoration: 'none' }}>
          <Card sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <CardActionArea sx={{ height: '100%', p: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <CardGiftcard sx={{ fontSize: 64, color: '#3b82f6', mb: 2 }} />
                <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 600 }}>
                  포인트 관리
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  사용자 포인트 적립, 사용 내역을 관리합니다
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        
        <Link href="/rewards/logs" style={{ textDecoration: 'none' }}>
          <Card sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <CardActionArea sx={{ height: '100%', p: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <History sx={{ fontSize: 64, color: '#8b5cf6', mb: 2 }} />
                <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 600 }}>
                  로그 관리
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  리워드 지급/사용 로그를 확인하고 관리합니다
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Box>
    </Box>
  );
}
