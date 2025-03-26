import { NextResponse, NextRequest } from 'next/server';

import axios from 'axios';

import { env } from '@/config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Boolean 필드 변환 (isTermsAgree, isPrivacyAgree, isMarketingAgree)
    const transformedData = {
      ...body,
      isTermsAgree: body.isTermsAgree === 'true',
      isPrivacyAgree: body.isPrivacyAgree === 'true',
      isMarketingAgree: body.isMarketingAgree === 'true',
    };

    // API로 POST 요청
    const response = await axios.post(`${env.publicEnv.apiUrl}/auth/register`, transformedData);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: '가입 실패했습니다.' }, { status: 401 });
  }
}
