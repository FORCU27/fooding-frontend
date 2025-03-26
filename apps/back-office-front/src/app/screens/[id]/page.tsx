'use client';

import { useParams, useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { NextPage } from 'next';
import useSWR from 'swr';

import { screenRepository } from '@/repository/screen-repository';

const ScreenInfo: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const idValue = typeof id === 'string' ? id : '';

  const { data, isLoading, error } = useSWR(['screen', idValue], () =>
    screenRepository.getById(idValue),
  );

  const handleScreenListClick = () => {
    router.push('/screens');
  };

  const handleEditScreenClick = () => {
    router.push(`/screens/${id}/update`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleString();
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
        <div className='screenInfo__container'>
          <div className='screenInfo__title-container'>
            <div className='screenInfo__title'>{data.name}</div>
            <div className='screenInfo__date-container'>
              <div>
                <div>등록일 : {formatDate(data.createdDate)}</div>
                <div>
                  수정일 : {data.updatedDate ? formatDate(data.updatedDate) : '수정이력없음'}
                </div>
              </div>
            </div>
          </div>
          <div className='screenInfo__descript-container'></div>
        </div>
      )}
      <div className='screenInfo__info-button-container'>
        <Button
          variant='contained'
          onClick={handleScreenListClick}
          sx={{ ml: 'auto' }}
          className='screenInfo__info-cancle-btn'
        >
          목록
        </Button>
        <Button
          variant='contained'
          onClick={handleEditScreenClick}
          sx={{ ml: 'auto' }}
          className='screenInfo__info-submit-btn'
        >
          수정
        </Button>
      </div>
    </Wrapper>
  );
};

export default ScreenInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .screenInfo__container {
    padding: 32px;
    margin-bottom: 100px;
    @media only screen and (max-width: 600px) {
      padding: 16px 8px;
      margin-bottom: 0px;
    }

    .screenInfo__title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px 0;

      @media only screen and (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        gap: 16px;
      }

      .screenInfo__title {
        font-size: 32px;
        font-weight: 600;
        @media only screen and (max-width: 600px) {
          font-size: 26px;
        }
      }
      .screenInfo__date-container {
        display: flex;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: 600px) {
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }

        .screenInfo__roles-container {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-right: 16px;
        }
      }
    }
    .screenInfo__descript-container {
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

  .screenInfo__info-button-container {
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
