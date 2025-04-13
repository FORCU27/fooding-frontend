'use client';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import 'animate.css';

import Layout from '@/components/Home/layout';

const Home: NextPage = () => {
  return (
    <Wrapper themeColor='light'>
      <h1>Hello</h1>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled(Layout)``;
