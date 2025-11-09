'use client';

import {
  CardForm,
  Button,
  Card,
  Input,
  SelectBox,
  TextArea,
  CardSubtitle,
  Dialog,
} from '@repo/design-system/components/ceo';

const NewsCreatePage = () => {
  return (
    <CardForm>
      <div className='headline-2'>소식 작성</div>
      <Card>
        <CardSubtitle label='제목'>
          <Input
            id='name'
            // value={formData.name}
            // onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='내용'>
          <textarea
            placeholder='상품 또는 서비스를 소개하거나 이벤트를 알려보세요'
            id='contents'
            className='min-h-[200px] px-[20px] py-[12px] border border-gray-3 rounded-[8px] resize-none outline-none focus:border-fooding-purple body-2 placeholder:text-gray-4'
            // value={formData.name}
            // onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </CardSubtitle>
      </Card>
    </CardForm>
  );
};

export default NewsCreatePage;
