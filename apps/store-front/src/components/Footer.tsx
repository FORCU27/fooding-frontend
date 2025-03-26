'use client';

import Image from 'next/image';
import Link from 'next/link';

import styled from '@emotion/styled';

function Footer() {
  return (
    <Wrapper>
      <div className='footer-container'>
        <div className='footer-info__logo-wrapper'>
          <Link href='/' className='footer-info__logo-link'>
            <Image
              src='/images/logo.svg'
              alt='logo'
              className='footer-info__logo-icon'
              width={35}
              height={35}
              priority
            />
            <span className='footer-info__logo-text'>zapp</span>
          </Link>
        </div>
        <div className='footer-info__content-container'>
          <p className='footer-info__text'>
            07257 서울특별시 영등포구 국회대로36길 6-1, 2층
            <br />
            사업자등록번호 779-81-03359
            <br />
            TEL 0507-0178-7546
            <br />
          </p>
          <a href='mailto:support@hyper-x.im' className='footer-info__text-link'>
            support@hyper-x.im
          </a>
          <br />
        </div>
        <hr />
        <div className='footer-info__copy-right__container'>
          <p className='footer-info__copy-right__text'>ⓒ 2025. HYPER X All Right Reserved.</p>
        </div>
      </div>
    </Wrapper>
  );
}

export default Footer;

const Wrapper = styled.footer`
  width: 100%;
  height: 350px;
  background-color: #1a1a1a;
  overflow: hidden;
  z-index: 50;

  .footer-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-content: center;

    .footer-info__logo-wrapper {
      display: flex;
      margin-bottom: 16px;

      .footer-info__logo-link {
        display: flex;
        justify-content: center;
        align-items: center;
        .footer-info__logo-icon {
          border-radius: 20px;
        }
        .footer-info__logo-text {
          font-family: 'esamanru';
          font-weight: bold;
          font-size: 24px;
          color: #f2f2f2;
        }
      }
    }

    .footer-info__content-container {
      font-size: 16px;
      color: #9b9b9b;

      .footer-info__text {
        font-weight: 500;
        line-height: 1.5;
      }
      .footer-info__text-link {
        font-weight: 600;
        font-style: italic;
      }
    }
    hr {
      margin: 16px 0 16px;
      border-color: #9b9b9b;
    }
    .footer-info__copy-right__container {
      margin-top: 15px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      .footer-info__copy-right__text {
        font-family: 'Tomorrow';
        font-size: 18px;
        line-height: 2;
        font-weight: 600;
        color: #9b9b9b;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .footer-container {
      .footer-info__logo-wrapper {
        display: flex;

        .footer-info__logo-link {
          .footer-info__logo-icon {
            border-radius: 10px;
            width: 30px;
            height: 30px;
          }
          .footer-info__logo-text {
            font-family: 'esamanru';
            font-weight: bold;
            font-size: 18px;
            padding: 0 8px;
          }
        }
      }

      .footer-info__content-container {
        margin-top: 8px;
        font-size: 14px;

        .footer-info__text {
          font-weight: 500;
          line-height: 1.2;
          opacity: 80%;
        }
        .footer-info__text-link {
          font-weight: 600;
          font-style: italic;
        }
      }
      .footer-info__copy-right__container {
        .footer-info__copy-right__text {
          font-family: 'Tomorrow';
          font-size: 16px;
          line-height: 1.2;
        }
      }
    }
  }
`;
