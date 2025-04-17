'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TermsStep } from './components/TermsStep';
import { MemberCountStep } from './components/MemberCountStep';
import { NameStep } from './components/NameStep';
import { WaitingStep } from './components/WaitingStep';
import { useEffect } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleCancel = () => router.push('/store/waiting');

  const countdown = 3;
  const [countdownTime, setCountdownTime] = useState(countdown);

  useEffect(() => {
    if (step === 4) {
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
  }, [countdownTime]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <TermsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />;
      case 2:
        return (
          <MemberCountStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
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

  if (step === 4) {
    return <WaitingStep countdownTime={countdownTime} />;
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-8'>
          <div className='flex gap-2'>
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  step === num ? 'bg-orange-500 text-white' : 'bg-gray-200'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          {step < 4 && (
            <button onClick={handleCancel} className='text-gray-500 hover:text-gray-700'>
              취소
            </button>
          )}
        </div>
      </div>
      <div className='max-w-2xl mx-auto px-4'>{renderStep()}</div>
    </div>
  );
}
