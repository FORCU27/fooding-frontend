import { GetAuthVerifyPhoneResponse } from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/api/v1/ceo/auth';

export const authApi = {
  // 휴대폰 인증 확인
  getVerifyPhone: async (phoneNumber: string, code: number) => {
    const response = await api.get(
      `${ENDPOINT}/verify/phone?phoneNumber=${phoneNumber}&code=${code}`,
    );
    return GetAuthVerifyPhoneResponse.parse(response);
  },
  // SMS를 통한 비밀번호 재설정 주소 전달
  postFindPasswordSms: async ({
    name,
    phoneNumber,
    code,
  }: {
    name: string;
    phoneNumber: string;
    code: number;
  }) => {
    await api.post(
      `${ENDPOINT}/find/password/sms?name=${name}&phoneNumber=${phoneNumber}&code=${code}`,
    );
  },
  // 이메일을 통한 비밀번호 재설정 주소 전달
  postFindPasswordEmail: async ({
    name,
    phoneNumber,
    code,
  }: {
    name: string;
    phoneNumber: string;
    code: number;
  }) => {
    await api.post(
      `${ENDPOINT}/find/password/email?name=${name}&phoneNumber=${phoneNumber}&code=${code}`,
    );
  },
  // 아이디 찾기 결과 전달
  getFindEmailResult: async (phoneNumber: string, code: number) => {
    const response = await api.get(
      `${ENDPOINT}/find/email?phoneNumber=${phoneNumber}&code=${code}`,
    );
    return response;
  },
  // 휴대폰 인증 진행
  postVerifyPhone: async (name: string, phoneNumber: string) => {
    await api.post(`${ENDPOINT}/verify/phone?name=${name}&phoneNumber=${phoneNumber}`);
  },
  // 비밀번호 변경
  resetPassword: async (encodedLine: string, password: string) => {
    await api.post(`${ENDPOINT}/reset/password/${encodedLine}?password=${password}`);
  },
};
