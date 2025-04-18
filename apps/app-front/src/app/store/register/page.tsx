'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { MemberCountStep } from './components/MemberCountStep';
import { NameStep } from './components/NameStep';
import { TermsStep } from './components/TermsStep';
import { WaitingStep } from './components/WaitingStep';
import { WaitingRegisterData } from './types';

const STEPS = ['TERMS', 'MEMBER_COUNT', 'NAME', 'WAITING'] as const;
type Step = (typeof STEPS)[number];

const STEP_ORDER: Record<Step, number> = {
  TERMS: 1,
  MEMBER_COUNT: 2,
  NAME: 3,
  WAITING: 4,
};

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('TERMS');
  const [formData, setFormData] = useState<WaitingRegisterData>({
    terms: {
      service: false,
      privacy: false,
      privacy2: false,
      marketing: false,
    },
    members: {
      adult: 0,
      child: 0,
      childChair: 0,
    },
    name: '',
  });

  const updateFormData = <K extends keyof WaitingRegisterData>(
    key: K,
    value: WaitingRegisterData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const nextStep = () => {
    const currentIndex = STEPS.indexOf(step);
    const nextStep = STEPS[currentIndex + 1];
    if (nextStep) {
      setStep(nextStep);
    }
  };

  const prevStep = () => {
    const currentIndex = STEPS.indexOf(step);
    const prevStep = STEPS[currentIndex - 1];
    if (prevStep) {
      setStep(prevStep);
    }
  };

  const handleCancel = () => router.push('/store/waiting');

  const COUNTDOWN = 3;
  const [countdownTime, setCountdownTime] = useState(COUNTDOWN);

  useEffect(() => {
    if (step === 'WAITING') {
      const timer = setInterval(() => {
        setCountdownTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (countdownTime === 0) {
      router.push('/store/waiting');
    }
  }, [countdownTime, router]);

  const renderStep = () => {
    switch (step) {
      case 'TERMS':
        return <TermsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />;
      case 'MEMBER_COUNT':
        return (
          <MemberCountStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 'NAME':
        return (
          <NameStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  if (step === 'WAITING') {
    return <WaitingStep countdownTime={countdownTime} />;
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-8'>
          <div className='flex gap-2'>
            {STEPS.map((stepName) => (
              <div
                key={stepName}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  step === stepName ? 'bg-orange-500 text-white' : 'bg-gray-200'
                }`}
              >
                {STEP_ORDER[stepName]}
              </div>
            ))}
          </div>
          <button onClick={handleCancel} className='text-gray-500 hover:text-gray-700'>
            취소
          </button>
        </div>
      </div>
      <div className='max-w-2xl mx-auto px-4'>{renderStep()}</div>
    </div>
  );
}
