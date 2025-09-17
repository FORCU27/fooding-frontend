import { PropsWithoutRef, useState } from 'react';

import { CreateReportBody, Review, StoreInfo } from '@repo/api/user';
import { Button, Checkbox, Dialog } from '@repo/design-system/components/b2c';
import { Controller, useForm } from 'react-hook-form';

import { StoreCard } from '@/components/Store/ReviewDetailCard';

export interface ReviewReportFormProps {
  review: Review;
  store: StoreInfo;
  handleSubmit: (data: CreateReportBody & { reasons: string[] }) => void;
}

export const ReviewReportForm = ({
  review,
  store,
  handleSubmit,
}: PropsWithoutRef<ReviewReportFormProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const maxLength = 150;

  const {
    register,
    control,
    formState: { errors },
    handleSubmit: onSubmit,
    watch,
  } = useForm<
    CreateReportBody & {
      reasons: string[];
    }
  >({
    mode: 'onSubmit',
    defaultValues: {
      reasons: [],
      description: '',
    },
  });

  const description = watch('description') || '';
  const reasons = watch('reasons');

  const onFormSubmit = (data: CreateReportBody & { reasons: string[] }) => {
    handleSubmit(data);
  };

  const reasonOptions = [
    '욕설, 비방, 혐오표현을 해요',
    '음란성 글이나 사진이 포함되어 있어요',
    '개인정보가 노출되었어요',
    '업체와 관련이 없는 내용이에요',
    '명예훼손, 사생활 침해, 업무방해에 해당하는 내용이 있어요',
    '신뢰할 수 없는 홍보 또는 광고에요',
  ];

  return (
    <form
      onSubmit={onSubmit(onFormSubmit)}
      className='flex flex-col justify-between gap-10 h-screen py-5'
    >
      <div className='flex flex-col p-5'>
        <h3 className='subtitle-4'>신고사유</h3>
        <div className='flex flex-col gap-4 mt-5'>
          {reasonOptions.map((label, idx) => (
            <Controller
              key={idx}
              name='reasons'
              control={control}
              rules={{
                validate: (value) => value.length > 0 || '신고 사유를 선택해주세요',
              }}
              render={({ field: { value, onChange } }) => {
                const checked = value?.includes(label) ?? false;
                return (
                  <div>
                    <Checkbox.Label>
                      <Checkbox
                        checked={checked}
                        onChange={(isChecked) => {
                          if (isChecked) {
                            onChange([...(value || []), label]);
                          } else {
                            onChange((value || []).filter((v: string) => v !== label));
                          }
                        }}
                      />
                      <Checkbox.LabelText className='text-black'>{label}</Checkbox.LabelText>
                    </Checkbox.Label>
                    {errors && (
                      <p className='text-error-red text-sm mt-1'>{errors.reasons?.message}</p>
                    )}
                  </div>
                );
              }}
            />
          ))}
        </div>

        <div className='flex flex-col mt-10 gap-3'>
          <p className='subtitle-4'>상세내용</p>
          <div className='relative'>
            <textarea
              {...register('description')}
              maxLength={maxLength}
              placeholder='타당한 사유가 없는 허위 신고의 경우, 이용 제한이 가해질 수 있으므로, 신중하게 제보해주세요. 신고된 내용은 7일 이내의 검수과정을 거친 후 적용됩니다.'
              className='w-full border border-gray-2 rounded-2xl p-6 h-[200px] resize-none body-3-2 focus:outline-none focus:border-gray-4 placeholder:body-3-2'
            />
            <div className='text-right text-gray-5 body-8 mt-2 absolute p-6 bottom-1 right-1'>
              {description.length} / {maxLength}
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full justify-center'>
        <Button
          type='button'
          onClick={() => setIsOpen(true)}
          className='w-[90%] mt-6'
          disabled={!reasons?.length}
        >
          신고하기
        </Button>

        <Dialog open={isOpen}>
          <Dialog.Content className='p-5'>
            <Dialog.Title className='text-center'>리뷰 신고</Dialog.Title>
            <Dialog.Body className='flex flex-col text-center py-10'>
              <p className='subtitle-1'>리뷰를 신고하시겠습니까?</p>
              <p className='body-6 text-gray-5'>신고 후에는 취소할 수 없습니다.</p>
              <div className='p-5 gap-3 rounded-xl bg-gray-1 mt-10'>
                <StoreCard review={review} store={store} />
              </div>
            </Dialog.Body>
            <Dialog.Footer className='gap-4'>
              <Dialog.Close asChild>
                <Button className='w-[136px]' variant='outlined' onClick={() => setIsOpen(false)}>
                  취소
                </Button>
              </Dialog.Close>
              <Button type='button' onClick={onSubmit(onFormSubmit)}>
                신고하기
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>
    </form>
  );
};
