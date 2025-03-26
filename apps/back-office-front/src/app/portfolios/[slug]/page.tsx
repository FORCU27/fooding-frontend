'use client';

import { useParams, useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Dompurify from 'isomorphic-dompurify';
import { NextPage } from 'next';
import useSWR from 'swr';

import { portfolioRepository } from '@/repository/portfolio-repository';

const PortfolioInfo: NextPage = () => {
  const params = useParams();
  const router = useRouter();

  const getPureDOM = (DOMString: string) => {
    return Dompurify.sanitize(DOMString);
  };

  const { slug } = params;
  const slugValue = typeof slug === 'string' ? slug : '';

  const { data, isLoading, error } = useSWR(['portfolio', slugValue], () =>
    portfolioRepository.getById(slugValue),
  );

  const handlePortfolioListClick = () => {
    router.push('/portfolios');
  };

  const handleEditPortfolioClick = () => {
    router.push(`/portfolios/${slug}/update`);
  };

  const tagFormatter = (tags: string) =>
    tags.split(',').map((tag, idx) => (
      <Tag key={`${tag}_${idx + 1}`} className='portfolioInfo__tag'>
        {tag.trim()}
      </Tag>
    ));

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
        <div className='portfolioInfo__container'>
          <div className='portfolioInfo__title-container'>
            <div className='portfolioInfo__title'>{data.title}</div>
            <div className='portfolioInfo__date-container'>
              <div>
                {data.roles && (
                  <div className='portfolioInfo__roles-container'>{tagFormatter(data.roles)}</div>
                )}
              </div>
              <div>
                <div>등록일 : {formatDate(data.createdDate)}</div>
                <div>
                  수정일 : {data.updatedDate ? formatDate(data.updatedDate) : '수정이력없음'}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className='portfolioInfo__descript-container'>
            {data.tags && (
              <div className='portfolioInfo__tag-container'>{tagFormatter(data.tags)}</div>
            )}
            <div
              className='portfolioInfo__info-summary'
              dangerouslySetInnerHTML={{ __html: getPureDOM(data.summary) }}
            />
          </div>
          <div className='portfolioInfo__image-container'>
            <img src={data.imgUrl} className='portfolioInfo__img' alt='portfolio' />
          </div>
        </div>
      )}
      <div className='portfolioInfo__info-button-container'>
        <Button
          variant='contained'
          onClick={handlePortfolioListClick}
          sx={{ ml: 'auto' }}
          className='portfolioInfo__info-cancle-btn'
        >
          목록
        </Button>
        <Button
          variant='contained'
          onClick={handleEditPortfolioClick}
          sx={{ ml: 'auto' }}
          className='portfolioInfo__info-submit-btn'
        >
          수정
        </Button>
      </div>
    </Wrapper>
  );
};

export default PortfolioInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .portfolioInfo__container {
    padding: 32px;
    margin-bottom: 100px;
    @media only screen and (max-width: 600px) {
      padding: 16px 8px;
      margin-bottom: 0px;
    }

    .portfolioInfo__title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px 0;

      @media only screen and (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        gap: 16px;
      }

      .portfolioInfo__title {
        font-size: 32px;
        font-weight: 600;
        @media only screen and (max-width: 600px) {
          font-size: 26px;
        }
      }
      .portfolioInfo__date-container {
        display: flex;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: 600px) {
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }

        .portfolioInfo__roles-container {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-right: 16px;
        }
      }
    }

    .portfolioInfo__descript-container {
      display: flex;
      justify-content: space-around;
      margin-top: 50px;

      @media only screen and (max-width: 600px) {
        justify-content: center;
        flex-direction: column;
        margin-top: 25px;
      }

      .portfolioInfo__tag-container {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 30%;
        @media only screen and (max-width: 600px) {
          width: 100%;
          margin-bottom: 16px;
        }
      }

      .portfolioInfo__info-summary {
        font-size: 18px;
      }
    }
    .portfolioInfo__image-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 100px 0 100px;

      @media only screen and (max-width: 600px) {
        margin: 25px 0 25px;
      }

      .portfolioInfo__img {
        width: 100%;
        height: auto;
      }
    }
  }

  .portfolioInfo__info-button-container {
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

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  color: #333;
  border-radius: 4px;
  padding: 4px;
  font-size: 14px;
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
