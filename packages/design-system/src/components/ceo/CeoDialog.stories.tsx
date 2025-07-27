import type { Meta, StoryObj } from '@storybook/react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  CeoDialog,
  CeoDialogTrigger,
  CeoDialogContent,
  CeoDialogHeader,
  CeoDialogTitle,
  CeoDialogDescription,
  CeoDialogFooter,
} from './CeoDialog';
import { CeoButton } from './CeoButton';

const meta: any = {
  title: 'Components/ceo/CeoDialog',
  component: CeoDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <CeoDialog {...args}>
      <CeoDialogTrigger asChild>
        <CeoButton>다이얼로그 열기</CeoButton>
      </CeoDialogTrigger>
      <CeoDialogContent>
        <CeoDialogHeader>
          <CeoDialogTitle>다이얼로그 제목</CeoDialogTitle>
          <CeoDialogDescription>
            이것은 다이얼로그의 설명입니다. 사용자에게 추가 정보를 제공합니다.
          </CeoDialogDescription>
        </CeoDialogHeader>
        <div className='py-4'>
          <p>다이얼로그 내용이 여기에 들어갑니다.</p>
        </div>
        <CeoDialogFooter>
          <Dialog.Close asChild>
            <CeoButton variant='outline'>취소</CeoButton>
          </Dialog.Close>
          <CeoButton>확인</CeoButton>
        </CeoDialogFooter>
      </CeoDialogContent>
    </CeoDialog>
  ),
};

export const WithoutCloseButton: Story = {
  args: {},
  render: (args) => (
    <CeoDialog {...args}>
      <CeoDialogTrigger asChild>
        <CeoButton>닫기 버튼 없는 다이얼로그</CeoButton>
      </CeoDialogTrigger>
      <CeoDialogContent showCloseButton={false}>
        <CeoDialogHeader>
          <CeoDialogTitle>닫기 버튼이 없는 다이얼로그</CeoDialogTitle>
          <CeoDialogDescription>
            이 다이얼로그는 우측 상단에 X 버튼이 없습니다.
          </CeoDialogDescription>
        </CeoDialogHeader>
        <div className='py-4'>
          <p>ESC 키나 배경 클릭으로만 닫을 수 있습니다.</p>
        </div>
        <CeoDialogFooter>
          <Dialog.Close asChild>
            <CeoButton variant='outline'>취소</CeoButton>
          </Dialog.Close>
          <CeoButton>확인</CeoButton>
        </CeoDialogFooter>
      </CeoDialogContent>
    </CeoDialog>
  ),
};

export const LargeContent: Story = {
  args: {},
  render: (args) => (
    <CeoDialog {...args}>
      <CeoDialogTrigger asChild>
        <CeoButton>긴 내용 다이얼로그</CeoButton>
      </CeoDialogTrigger>
      <CeoDialogContent className='max-w-2xl'>
        <CeoDialogHeader>
          <CeoDialogTitle>긴 내용이 있는 다이얼로그</CeoDialogTitle>
          <CeoDialogDescription>이 다이얼로그는 더 넓고 긴 내용을 포함합니다.</CeoDialogDescription>
        </CeoDialogHeader>
        <div className='py-4 space-y-4'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h4 className='font-semibold mb-2'>추가 정보</h4>
            <ul className='list-disc list-inside space-y-1'>
              <li>첫 번째 항목</li>
              <li>두 번째 항목</li>
              <li>세 번째 항목</li>
            </ul>
          </div>
        </div>
        <CeoDialogFooter>
          <Dialog.Close asChild>
            <CeoButton variant='outline'>취소</CeoButton>
          </Dialog.Close>
          <CeoButton>저장</CeoButton>
        </CeoDialogFooter>
      </CeoDialogContent>
    </CeoDialog>
  ),
};

export const ConfirmationDialog: Story = {
  args: {},
  render: (args) => (
    <CeoDialog {...args}>
      <CeoDialogTrigger asChild>
        <CeoButton variant='outline'>삭제</CeoButton>
      </CeoDialogTrigger>
      <CeoDialogContent>
        <CeoDialogHeader>
          <CeoDialogTitle>정말 삭제하시겠습니까?</CeoDialogTitle>
          <CeoDialogDescription>
            이 작업은 되돌릴 수 없습니다. 선택한 항목이 영구적으로 삭제됩니다.
          </CeoDialogDescription>
        </CeoDialogHeader>
        <CeoDialogFooter>
          <Dialog.Close asChild>
            <CeoButton variant='outline'>취소</CeoButton>
          </Dialog.Close>
          <CeoButton variant='secondary'>삭제</CeoButton>
        </CeoDialogFooter>
      </CeoDialogContent>
    </CeoDialog>
  ),
};
