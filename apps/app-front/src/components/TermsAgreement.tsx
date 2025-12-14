import { useState } from 'react';

import { Checkbox } from '@repo/design-system/components/b2b';
import { ArrowLeftIcon } from '@repo/design-system/icons';

type CheckedKeys = 'termsAgreed' | 'privacyPolicyAgreed' | 'thirdPartyAgreed' | 'marketingConsent';

type Term = {
  key: CheckedKeys;
  label: string;
  required: boolean;
  detailTitle: string;
  detailContent: string;
};

interface TermsAgreementProps {
  onClose: (value: React.SetStateAction<boolean>) => void;
  formData: Record<CheckedKeys, boolean>;
  updateFormData: (value: Record<CheckedKeys, boolean>) => void;
}

// 약관 상세 내용
const TERMS_DETAIL_CONTENT = {
  termsAgreed: `제1조 (목적)
본 약관은 푸딩(이하 "회사"라 함)이 제공하는 모든 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무, 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
1. "서비스"라 함은 회사가 온라인 또는 모바일 환경에서 제공하는 매장 관리, 웨이팅, 리워드 적립 등 관련 모든 서비스를 말합니다.
2. "이용자"라 함은 본 약관에 동의하고 회사의 서비스를 이용하는 회원 및 비회원을 의미합니다.
3. "회원"이라 함은 회사와 서비스 이용계약을 체결하고 아이디(ID)를 부여받은 자를 말합니다.

제3조 (약관의 효력 및 변경)
1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.
2. 회사는 필요 시 관계법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시 사전 공지합니다.

제4조 (서비스 이용 계약의 체결)
1. 이용계약은 서비스 가입 신청자가 본 약관에 동의하고 회사가 승낙함으로써 성립합니다.
2. 회사는 아래 각 호의 경우에는 이용계약의 승낙을 유보하거나 거절할 수 있습니다.
   (1) 허위 정보를 기재한 경우
   (2) 서비스 목적에 부합하지 않는 가입 신청인 경우
   (3) 기타 회사의 합리적 사유가 있는 경우

제5조 (서비스의 제공 및 변경)
1. 회사는 이용자에게 다음 각 호의 서비스를 제공합니다.
   (1) 매장 관리 서비스
   (2) 웨이팅 관리 서비스
   (3) 리워드 적립 및 쿠폰 발급 서비스
   (4) 기타 회사가 정하는 부가 서비스
2. 회사는 서비스 운영상 필요 시 서비스 내용을 변경할 수 있으며, 변경 시 사전 공지합니다.

제6조 (이용자의 의무)
1. 이용자는 관계법령, 본 약관, 서비스 이용 안내 및 공지사항을 준수하여야 합니다.
2. 이용자는 서비스 이용과 관련하여 다음 행위를 하여서는 안 됩니다.
   (1) 타인의 개인정보 도용
   (2) 서비스 운영을 방해하는 행위
   (3) 회사 또는 제3자의 권리 침해
   (4) 범죄행위와 관련된 행위

제7조 (이용계약 해지 및 이용제한)
1. 이용자는 언제든지 서비스 탈퇴를 요청할 수 있으며, 회사는 관련 법령이 정하는 바에 따라 즉시 처리합니다.
2. 회사는 이용자가 본 약관을 위반한 경우 사전 통지 후 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.

제8조 (면책조항)
1. 회사는 다음 각 호의 사유로 인하여 발생한 손해에 대하여 책임을 지지 않습니다.
   (1) 천재지변, 불가항력적 사유
   (2) 이용자의 귀책사유
   (3) 제3자의 불법적 침해 행위

제9조 (준거법 및 관할법원)
  본 약관과 관련된 분쟁은 대한민국 법령에 따르며, 회사의 본사 소재지를 관할하는 법원을 관할법원으로 합니다.

시행일: 2025년 8월 1일`,

  privacyPolicyAgreed: `개인정보 수집 및 이용 동의

1. 수집 항목
필수 정보: 이름, 휴대전화번호, 이메일, 매장명, 사업자등록번호, 로그인 ID
선택 정보: 프로필 사진, 마케팅 수신 여부

2. 수집 및 이용 목적
회원 가입 및 본인 확인
서비스 제공 및 계약 이행
고객 문의 및 상담 처리
통계·분석 및 서비스 개선

3. 보유 및 이용 기간
회원 탈퇴 시까지
다만, 관련 법령에 따라 보존할 필요가 있는 경우에는 해당 기간까지 보관됩니다.
예)
전자상거래 등에서의 소비자 보호에 관한 법률: 계약 또는 청약철회 등에 관한 기록 (5년), 대금결제 및 재화 등의 공급에 관한 기록 (5년)
통신비밀보호법: 접속 로그 (3개월)

4. 동의 거부 권리 및 불이익
귀하는 개인정보 수집·이용에 동의하지 않을 권리가 있으며, 동의 거부 시 서비스 이용이 제한될 수 있습니다.`,

  thirdPartyAgreed: `1. 제공받는 자
결제대행사(PG사)
배송업체
CRM 마케팅 대행사

2. 제공 항목
이름, 휴대전화번호, 이메일, 매장정보, 결제 및 거래내역

3. 제공 목적
결제 및 정산 처리
배송 서비스 제공
고객 상담 및 마케팅 지원

4. 보유 및 이용 기간
계약 종료 후 5년 또는 법령에서 정하는 기간

5. 동의 거부 권리 및 불이익
귀하는 개인정보 제3자 제공에 동의하지 않을 권리가 있으며, 동의하지 않더라도 서비스 이용에 제한은 없습니다. 다만, 일부 부가서비스 제공이 제한될 수 있습니다.`,

  marketingConsent: `1. 수신 항목 및 방법
이메일, 문자메시지, 푸시 알림

2. 수신 목적
신규 서비스 및 이벤트 안내
혜택 및 프로모션 정보 제공

3. 보유 및 이용 기간
회원 탈퇴 또는 동의 철회 시까지

4. 동의 철회 방법
앱 내 설정 메뉴에서 철회 가능
고객센터를 통한 철회 신청 가능

5. 동의 거부 권리 및 불이익
귀하는 마케팅 정보 수신에 동의하지 않을 수 있으며, 동의하지 않더라도 서비스 이용에는 제한이 없습니다.`,
};

const TermsAgreement = ({ onClose, formData, updateFormData }: TermsAgreementProps) => {
  const [selectedTerm, setSelectedTerm] = useState<CheckedKeys | null>(null);

  const terms: Term[] = [
    {
      key: 'termsAgreed',
      label: '서비스 이용약관 동의',
      required: true,
      detailTitle: '푸딩 서비스 이용약관 동의 안내',
      detailContent: TERMS_DETAIL_CONTENT.termsAgreed,
    },
    {
      key: 'privacyPolicyAgreed',
      label: '개인정보 수집 및 이용 동의',
      required: true,
      detailTitle: '개인정보 수집 및 이용 동의 안내',
      detailContent: TERMS_DETAIL_CONTENT.privacyPolicyAgreed,
    },
    {
      key: 'thirdPartyAgreed',
      label: '개인정보 제3자 제공 동의',
      required: true,
      detailTitle: '개인정보 제3자 제공 동의 안내',
      detailContent: TERMS_DETAIL_CONTENT.thirdPartyAgreed,
    },
    {
      key: 'marketingConsent',
      label: '마케팅 정보 수신 동의',
      required: false,
      detailTitle: '마케팅 정보 수신 동의 안내',
      detailContent: TERMS_DETAIL_CONTENT.marketingConsent,
    },
  ];

  const toggleCheck = (key: CheckedKeys) => {
    updateFormData({ ...formData, [key]: !formData[key] });
  };

  const allAgreed = terms.every((term) => formData[term.key]);

  const toggleAll = () => {
    const newValue = !allAgreed;
    const updated = terms.reduce(
      (acc, t) => {
        acc[t.key] = newValue;
        return acc;
      },
      {} as Record<CheckedKeys, boolean>,
    );
    updateFormData(updated);
  };

  const isAllRequiredAgreed = terms.filter((t) => t.required).every((t) => formData[t.key]);

  const handleSubmit = () => {
    if (!isAllRequiredAgreed) return;
    onClose(false);
  };

  const currentTerm = selectedTerm ? terms.find((t) => t.key === selectedTerm) : null;

  // 약관 상세 팝업이 열려있을 때
  if (selectedTerm && currentTerm) {
    return (
      <main className='flex flex-col items-center relative'>
        <div className='absolute left-[0px] w-[20px] h-screen bg-primary-pink' />
        <header className='py-[58px]'>
          <nav
            className='absolute left-[80px] top-[50px] cursor-pointer z-50'
            onClick={() => setSelectedTerm(null)}
            aria-label='이전 페이지로 돌아가기'
          >
            <ArrowLeftIcon />
          </nav>
          <h1 className='headline-5 text-center'>{currentTerm.detailTitle}</h1>
        </header>

        <section className='flex flex-col w-full flex-1 h-full px-[80px] pt-[30px] max-h-[80vh] overflow-y-auto'>
          <pre className='whitespace-pre-wrap font-sans text-gray-700 leading-relaxed body-3'>
            {currentTerm.detailContent}
          </pre>
        </section>
      </main>
    );
  }

  return (
    <main className='flex flex-col items-center relative'>
      <div className='absolute left-[0px] w-[20px] h-screen bg-primary-pink' />
      <header className='py-[58px]'>
        <nav
          className='absolute left-[80px] top-[50px] cursor-pointer z-50'
          onClick={() => onClose(false)}
          aria-label='이전 페이지로 돌아가기'
        >
          <ArrowLeftIcon />
        </nav>
        <h1 className='headline-5 text-center'>이용약관 동의</h1>
      </header>

      <section className='flex flex-col justify-center w-[640px] pt-[50px] relative'>
        <button
          type='button'
          onClick={toggleAll}
          aria-pressed={allAgreed}
          className='rounded-full border-2 border-gray-2 py-[28px] px-[40px] flex items-center justify-between cursor-pointer w-full'
        >
          <span className='subtitle-2-1'>전체 동의</span>
          <Checkbox size='large' checked={allAgreed} />
        </button>

        <ul className='px-[40px] pt-[10px]'>
          {terms.map((term) => (
            <li key={term.key} className='flex justify-between items-center pt-[30px]'>
              <div className='flex gap-[8px] items-center'>
                <span
                  className='subtitle-4-1 text-gray-5 underline cursor-pointer hover:text-primary-pink'
                  onClick={() => setSelectedTerm(term.key)}
                >
                  {term.label}
                </span>
                <span
                  className={
                    term.required ? 'text-red-500 subtitle-4-2' : 'text-gray-500 subtitle-4-1'
                  }
                >
                  ({term.required ? '필수' : '선택'})
                </span>
              </div>
              <div
                onClick={() => toggleCheck(term.key)}
                className='cursor-pointer'
                role='checkbox'
                aria-checked={formData[term.key]}
                tabIndex={0}
              >
                <Checkbox size='large' checked={formData[term.key]} />
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          disabled={!isAllRequiredAgreed}
          className={`mt-[80px] subtitle-2-2 w-full py-[29px] text-center rounded-full ${isAllRequiredAgreed ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          aria-disabled={!isAllRequiredAgreed}
        >
          동의하기
        </button>
      </section>
    </main>
  );
};

export default TermsAgreement;

