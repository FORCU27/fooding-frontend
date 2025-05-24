'use client';

import {
  BottomSheet,
  Button,
  ChipTabs,
  Dialog,
  Tabs,
  Tag,
} from '@repo/design-system/components/b2c';

export default function DesignSystemExamplePage() {
  return (
    <main className='h-dvh flex items-center justify-center flex-col gap-4'>
      <div className='flex flex-col gap-4 px-4 mt-4 w-full'>
        <Button>버튼</Button>
        <Button variant='gray'>버튼</Button>
        <Button variant='outlined'>버튼</Button>
        <Button disabled>버튼</Button>
        <div className='flex gap-2'>
          <Button size='small'>버튼</Button>
          <Button size='small' variant='gray'>
            버튼
          </Button>
          <Button size='small' variant='outlined'>
            버튼
          </Button>
          <Button size='small' disabled>
            버튼
          </Button>
        </div>
        <div className='flex gap-2'>
          <Button size='banner'>버튼</Button>
          <Button size='banner' variant='gray'>
            버튼
          </Button>
          <Button size='banner' variant='outlined'>
            버튼
          </Button>
          <Button size='banner' disabled>
            버튼
          </Button>
        </div>
        <div className='flex gap-2'>
          <Tag variant='red'>태그</Tag>
          <Tag variant='gray'>태그</Tag>
        </div>
        <DialogExample />
        <BottomSheetExample />
      </div>
      <ChipTabsExample />
      <TabsExample />
      <TabsExampleFullWidth />
    </main>
  );
}

const DialogExample = () => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button className='w-fit' size='small'>
          모달 열기
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title className='text-center'>쿠폰 사용</Dialog.Title>
        </Dialog.Header>
        <div className='w-full h-[320px]' />
        <Dialog.Footer className='gap-[10px]'>
          <Dialog.Close asChild>
            <Button className='w-[136px]' variant='outlined'>
              취소
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>사용하기</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

const BottomSheetExample = () => {
  return (
    <BottomSheet>
      <BottomSheet.Trigger asChild>
        <Button className='w-fit' size='small'>
          바텀시트 열기
        </Button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <BottomSheet.Title className='sr-only'>쿠폰 받기</BottomSheet.Title>
        <BottomSheet.Body>
          <div className='border border-gray-2 rounded-[8px] p-5'>
            <Tag variant='red'>단골 전용</Tag>
          </div>
          <div className='w-full h-[320px]' />
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <Button>쿠폰 받기</Button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const ChipTabsExample = () => {
  return (
    <ChipTabs defaultValue='1'>
      <ChipTabs.List className='px-5 overflow-x-auto w-full scrollbar-hide'>
        <ChipTabs.Trigger value='1'>홈</ChipTabs.Trigger>
        <ChipTabs.Trigger value='2'>소식</ChipTabs.Trigger>
        <ChipTabs.Trigger value='3'>메뉴</ChipTabs.Trigger>
        <ChipTabs.Trigger value='4'>사진</ChipTabs.Trigger>
        <ChipTabs.Trigger value='5'>리뷰</ChipTabs.Trigger>
        <ChipTabs.Trigger value='6'>매장정보</ChipTabs.Trigger>
        <ChipTabs.Trigger value='7'>매장정보</ChipTabs.Trigger>
        <ChipTabs.Trigger value='8'>매장정보</ChipTabs.Trigger>
        <ChipTabs.Trigger value='9'>매장정보</ChipTabs.Trigger>
        <ChipTabs.Trigger value='10'>매장정보</ChipTabs.Trigger>
      </ChipTabs.List>
    </ChipTabs>
  );
};

const TabsExample = () => {
  return (
    <Tabs defaultValue='1'>
      <Tabs.List className='overflow-x-auto w-full scrollbar-hide'>
        <Tabs.Trigger value='1'>사용 가능 쿠폰</Tabs.Trigger>
        <Tabs.Trigger value='2'>사용 완료 쿠폰</Tabs.Trigger>
        <Tabs.Trigger value='3'>사용 완료 쿠폰</Tabs.Trigger>
        <Tabs.Trigger value='4'>사용 완료 쿠폰</Tabs.Trigger>
        <Tabs.Trigger value='5'>사용 완료 쿠폰</Tabs.Trigger>
        <Tabs.Trigger value='6'>사용 완료 쿠폰</Tabs.Trigger>
        <Tabs.Trigger value='7'>사용 완료 쿠폰</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
};

const TabsExampleFullWidth = () => {
  return (
    <Tabs defaultValue='1'>
      <Tabs.List fullWidth>
        <Tabs.Trigger value='1'>사용 가능 쿠폰</Tabs.Trigger>
        <Tabs.Trigger value='2'>사용 완료 쿠폰</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
};
