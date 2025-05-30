// ModalContent.tsx (예시)
import { MemberCountStep } from './MemberCountStep';
import { NameStep } from './NameStep';
import { PhoneStep } from './PhoneStep';
import { Step, WaitingRegisterData } from '../types';

type ModalContentProps = {
  step: Step;
  formData: WaitingRegisterData;
  updateFormData: <K extends keyof WaitingRegisterData>(
    key: K,
    value: WaitingRegisterData[K],
  ) => void;
  onNext: () => void;
  onPrev: () => void;
  onClickTerms: () => void;
  onClickComplete: () => void;
};

export default function ModalContent({
  step,
  formData,
  updateFormData,
  onNext,
  onPrev,
  onClickTerms,
  onClickComplete,
}: ModalContentProps) {
  if (step === 'name') {
    return (
      <NameStep
        formData={formData}
        updateFormData={updateFormData}
        onNext={onNext}
        onPrev={onPrev}
        onClickComplete={onClickComplete}
      />
    );
  }
  if (step === 'member') {
    return (
      <MemberCountStep
        formData={formData}
        updateFormData={updateFormData}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
  }
  if (step === 'phone') {
    return (
      <PhoneStep
        formData={formData}
        updateFormData={updateFormData}
        onNext={onNext}
        onPrev={onPrev}
        onClickTerms={onClickTerms}
      />
    );
  }
  return null;
}
