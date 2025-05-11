export type WaitingRegisterData = {
  name: string; // 이름
  phoneNumber: string; // 전화번호
  termsAgreed: boolean; // 이용약관 동의
  privacyPolicyAgreed: boolean; // 개인정보 수집 및 이용 동의
  thirdPartyAgreed: boolean; // 제3자 제공 동의
  marketingConsent: boolean; // 마케팅 정보 수신 동의
  infantChairCount: number; // 유아 의자 수
  infantCount: number; // 유아 수
  adultCount: number; // 성인 수
};

export type UpdateWaitingRegisterData = <K extends keyof WaitingRegisterData>(
  key: K,
  value: WaitingRegisterData[K],
) => void;

export type StepProps = {
  formData: WaitingRegisterData;
  updateFormData: UpdateWaitingRegisterData;
  onNext: () => void;
  onPrev: () => void;
};
