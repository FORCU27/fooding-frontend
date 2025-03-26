'use client';

import { useRef } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import 'animate.css';

import HomeDescriptSection from '@/components/Home/HomeDescriptSection';
import HomeTitleSection from '@/components/Home/HomeTitleSection';
import Layout from '@/components/Home/layout';
import { useIsVisible } from '@/hooks/UseIsVisible';

const Home: NextPage = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptRef = useRef<HTMLDivElement>(null);
  // const hubRef = useRef<HTMLDivElement>(null);
  // const productionRef = useRef<HTMLDivElement>(null);
  // const serviceRef = useRef<HTMLDivElement>(null);
  // const marketingRef = useRef<HTMLDivElement>(null);
  // const pipelineRef = useRef<HTMLDivElement>(null);

  const titleVisible = useIsVisible(titleRef);
  const descriptVisible = useIsVisible(descriptRef);
  // const hubVisible = useIsVisible(hubRef);
  // const productionVisible = useIsVisible(productionRef);
  // const serviceVisible = useIsVisible(serviceRef);
  // const marketingVisible = useIsVisible(marketingRef);
  // const pipelineVisible = useIsVisible(pipelineRef);

  const getVisibilityClasses = (isVisible: boolean) =>
    isVisible ? 'animate__animated animate__fadeIn opacity-100' : 'opacity-0 ';

  return (
    <Wrapper themeColor='light'>
      <div
        ref={titleRef}
        className={`ease-in transition-all ${getVisibilityClasses(titleVisible)}`}
      >
        <HomeTitleSection />
      </div>
      <div
        ref={descriptRef}
        className={`ease-in transition-all ${getVisibilityClasses(descriptVisible)}`}
      >
        <HomeDescriptSection />
      </div>
      {/**FIXME: 추후 기능 개발 되는 대로 수정 후 주석해제 */}
      {/* <div ref={hubRef} className={`ease-in transition-all ${getVisibilityClasses(hubVisible)}`}>
        <HomeHubSection />
      </div>
      <div
        ref={productionRef}
        className={`ease-in transition-all ${getVisibilityClasses(productionVisible)}`}
      >
        <HomeProductionSection />
      </div>
      <div
        ref={serviceRef}
        className={`ease-in transition-all ${getVisibilityClasses(serviceVisible)}`}
      >
        <HomeServiceSection />
      </div>
      <div
        ref={marketingRef}
        className={`ease-in transition-all ${getVisibilityClasses(marketingVisible)}`}
      >
        <HomeMarketingSection />
      </div>
      <div
        ref={pipelineRef}
        className={`ease-in transition-all ${getVisibilityClasses(pipelineVisible)}`}
      >
        <HomePipelineSection />
      </div> */}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled(Layout)``;
