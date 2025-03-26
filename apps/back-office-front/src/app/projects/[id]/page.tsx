'use client';

import { useParams, useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Dompurify from 'isomorphic-dompurify';
import { NextPage } from 'next';
import useSWR from 'swr';

import { projectRepository } from '@/repository/project-repository';

const ProjectInfo: NextPage = () => {
  const params = useParams();
  const router = useRouter();

  const getPureDOM = (DOMString: string) => {
    return Dompurify.sanitize(DOMString);
  };

  const { id } = params;
  const idValue = typeof id === 'string' ? id : '';

  const { data, isLoading, error } = useSWR(['portfolio', idValue], () =>
    projectRepository.getById(idValue),
  );

  const handleProjectListClick = () => {
    router.push('/projects');
  };

  const handleEditProjectClick = () => {
    router.push(`/projects/${idValue}/update`);
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
    return <Error>Error loading portfolio</Error>;
  }

  return (
    <Wrapper>
      {data && (
        <div className='projectInfo__container'>
          <div className='projectInfo__title-container'>
            <div className='projectInfo__title'>{data.name}</div>
            <div className='projectInfo__date-container'>
              <div>
                <div>등록일 : {formatDate(data.createdDate)}</div>
                <div>
                  수정일 : {data.updatedDate ? formatDate(data.updatedDate) : '수정이력없음'}
                </div>
              </div>
            </div>
          </div>
          <hr />
          {data.thumbnailImageUrl && (
            <div className='projectInfo__image-container'>
              <img src={data.thumbnailImageUrl} className='projectInfo__img' alt='project' />
            </div>
          )}
        </div>
      )}
      <div className='projectInfo__info-button-container'>
        <Button
          variant='contained'
          onClick={handleProjectListClick}
          sx={{ ml: 'auto' }}
          className='projectInfo__info-cancle-btn'
        >
          목록
        </Button>
        <Button
          variant='contained'
          onClick={handleEditProjectClick}
          sx={{ ml: 'auto' }}
          className='projectInfo__info-submit-btn'
        >
          수정
        </Button>
      </div>
    </Wrapper>
  );
};

export default ProjectInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .projectInfo__container {
    padding: 32px;
    margin-bottom: 100px;
    @media only screen and (max-width: 600px) {
      padding: 16px 8px;
      margin-bottom: 0px;
    }

    .projectInfo__title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px 0;

      @media only screen and (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        gap: 16px;
      }

      .projectInfo__title {
        font-size: 32px;
        font-weight: 600;
        @media only screen and (max-width: 600px) {
          font-size: 26px;
        }
      }
      .projectInfo__date-container {
        display: flex;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: 600px) {
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }
      }
    }
    .projectInfo__image-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 100px 0 100px;

      @media only screen and (max-width: 600px) {
        margin: 25px 0 25px;
      }

      .projectInfo__img {
        width: 100%;
        height: auto;
      }
    }
  }

  .projectInfo__info-button-container {
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
