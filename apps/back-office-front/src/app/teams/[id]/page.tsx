'use client';

import { useParams, useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import {
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Dompurify from 'isomorphic-dompurify';
import { NextPage } from 'next';
import useSWR from 'swr';

import DataGrid from '@/components/DataGrid';

import { teamRepository } from '@/repository/team-repository';

const TeamInfo: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  const getPureDOM = (DOMString: string) => {
    return Dompurify.sanitize(DOMString);
  };

  const { id } = params;
  const idValue = typeof id === 'string' ? id : '';

  const { data, isLoading, error } = useSWR(['team', idValue], () =>
    teamRepository.getById(idValue),
  );

  const { data: members } = useSWR(['teamMembers', idValue], () =>
    teamRepository.getMembersById(idValue),
  );

  const columns = [
    { id: 'userName', label: '팀원명', minWidth: 250 },
    {
      id: 'isOwner',
      label: '직책',
      minWidth: 200,
      format: (value: boolean) => formatRole(value),
    },
    {
      id: 'createdDate',
      label: '등록일',
      minWidth: 200,
      format: (value: string) => formatDate(value),
    },
  ];

  const moblieColumns = [
    { id: 'userName', label: '팀원명', minWidth: 150 },
    {
      id: 'isOwner',
      label: '직책',
      minWidth: 100,
      format: (value: boolean) => formatRole(value),
    },
  ];

  const handleTeamListClick = () => {
    router.push('/teams');
  };

  const handleEditTeamClick = () => {
    router.push(`/teams/${id}/update`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleString();
  };

  const formatRole = (isOwner: boolean) => {
    return isOwner ? '팀장' : '팀원';
  };

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>Error loading team</Error>;
  }

  return (
    <Wrapper>
      {data && (
        <div className='teamInfo__container'>
          <div className='teamInfo__title-container'>
            <div className='teamInfo__title'>{data.name}</div>
            <div className='teamInfo__date-container'>
              <div>
                <div>등록일 : {formatDate(data.createdDate)}</div>
                <div>
                  수정일 : {data.updatedDate ? formatDate(data.updatedDate) : '수정이력없음'}
                </div>
              </div>
            </div>
          </div>
          <div className='teamInfo__descript-container'>
            <DataGrid
              columns={isMoblie ? moblieColumns : columns}
              rows={members?.data || []}
              loading={isLoading}
            />
          </div>
        </div>
      )}
      <div className='teamInfo__info-button-container'>
        <Button
          variant='contained'
          onClick={handleTeamListClick}
          sx={{ ml: 'auto' }}
          className='teamInfo__info-cancle-btn'
        >
          목록
        </Button>
        <Button
          variant='contained'
          onClick={handleEditTeamClick}
          sx={{ ml: 'auto' }}
          className='teamInfo__info-submit-btn'
        >
          수정
        </Button>
      </div>
    </Wrapper>
  );
};

export default TeamInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .teamInfo__container {
    padding: 32px;
    margin-bottom: 100px;
    @media only screen and (max-width: 600px) {
      padding: 16px 8px;
      margin-bottom: 0px;
    }

    .teamInfo__title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px 0;

      @media only screen and (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        gap: 16px;
      }

      .teamInfo__title {
        font-size: 32px;
        font-weight: 600;
        @media only screen and (max-width: 600px) {
          font-size: 26px;
        }
      }
      .teamInfo__date-container {
        display: flex;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: 600px) {
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }

        .teamInfo__roles-container {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-right: 16px;
        }
      }
    }

    .teamInfo__descript-container {
      display: flex;
      justify-content: space-around;
      margin-top: 50px;

      @media only screen and (max-width: 600px) {
        justify-content: center;
        flex-direction: column;
        margin-top: 25px;
      }
    }
  }

  .teamInfo__info-button-container {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 120px;
      font-size: 18px;
      margin: 16px;
      @media only screen and (max-width: 600px) {
        width: 80px;
        margin: 8px;
        font-size: 14px;
      }
    }
    button:hover {
      background-color: #3c52b2;
    }
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #777;
`;

const Error = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
`;
