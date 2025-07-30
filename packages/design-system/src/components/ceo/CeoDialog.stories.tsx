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
          <CeoDialogTitle>스크롤이 가능한 긴 내용 다이얼로그</CeoDialogTitle>
          <CeoDialogDescription>내용이 길어지면 스크롤로 확인할 수 있습니다.</CeoDialogDescription>
        </CeoDialogHeader>
        <div className='py-4 space-y-6'>
          <section>
            <h3 className='text-lg font-semibold mb-3'>첫 번째 섹션</h3>
            <p className='mb-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className='mb-4'>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
              illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </section>

          <section className='bg-gray-50 p-6 rounded-lg'>
            <h3 className='text-lg font-semibold mb-3'>두 번째 섹션 - 상세 정보</h3>
            <div className='grid grid-cols-1 gap-4'>
              <div className='bg-white p-4 rounded border'>
                <h4 className='font-medium mb-2'>항목 1</h4>
                <p className='text-sm text-gray-600'>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                  quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                </p>
              </div>
              <div className='bg-white p-4 rounded border'>
                <h4 className='font-medium mb-2'>항목 2</h4>
                <p className='text-sm text-gray-600'>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                  praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                  excepturi sint occaecati cupiditate non provident, similique sunt in culpa.
                </p>
              </div>
              <div className='bg-white p-4 rounded border'>
                <h4 className='font-medium mb-2'>항목 3</h4>
                <p className='text-sm text-gray-600'>
                  Qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
                  nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className='text-lg font-semibold mb-3'>세 번째 섹션 - 긴 목록</h3>
            <ul className='space-y-3'>
              {Array.from({ length: 15 }, (_, i) => (
                <li key={i} className='flex items-start gap-3 p-3 bg-gray-50 rounded'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600'>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className='font-medium mb-1'>목록 항목 {i + 1}</h4>
                    <p className='text-sm text-gray-600'>
                      이것은 {i + 1}번째 항목입니다. 각 항목은 충분히 긴 설명을 포함하고 있어서
                      전체 다이얼로그의 높이를 늘리는 역할을 합니다. 스크롤 기능을 테스트하기 위한
                      더미 텍스트입니다.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className='text-lg font-semibold mb-3'>네 번째 섹션 - 추가 내용</h3>
            <div className='space-y-4'>
              <p>
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum
                rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
                consequatur aut perferendis doloribus asperiores repellat.
              </p>
              <p>
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
                dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
                necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae.
              </p>
              <div className='bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400'>
                <h4 className='font-semibold text-yellow-800 mb-2'>중요한 알림</h4>
                <p className='text-yellow-700'>
                  이 다이얼로그는 스크롤 기능을 테스트하기 위해 매우 긴 내용을 포함하고 있습니다.
                  실제 사용 시에는 이렇게 긴 내용보다는 적절한 길이의 내용을 사용하시기 바랍니다.
                  사용자 경험을 위해 너무 긴 내용은 피하는 것이 좋습니다.
                </p>
              </div>
              <p>
                마지막 문단입니다. 여기까지 스크롤해서 내려왔다면 다이얼로그의 스크롤 기능이
                정상적으로 작동하고 있는 것입니다. 이제 아래의 버튼들도 확인해보세요.
              </p>
            </div>
          </section>
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
