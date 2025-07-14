import type { StoryObj } from '@storybook/react';
import { CheckSelectBoxGroup } from './CheckSelectBoxGroup';
import { useState } from 'react';
import { Button } from './Button';

const meta = {
  title: 'components/b2c/CheckSelectBoxGroup',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <CheckSelectBoxGroup>
        <CheckSelectBoxGroup.Item value='1'>강남</CheckSelectBoxGroup.Item>
        <CheckSelectBoxGroup.Item value='2'>서초</CheckSelectBoxGroup.Item>
      </CheckSelectBoxGroup>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    return (
      <CheckSelectBoxGroup defaultValue={['1']}>
        <CheckSelectBoxGroup.Item value='1'>강남</CheckSelectBoxGroup.Item>
        <CheckSelectBoxGroup.Item value='2'>서초</CheckSelectBoxGroup.Item>
      </CheckSelectBoxGroup>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const districts = ['강남', '서초'];

    const [value, setValue] = useState<string[]>([]);

    return (
      <div className='w-full'>
        <CheckSelectBoxGroup value={value} onChange={setValue}>
          {districts.map((district) => (
            <CheckSelectBoxGroup.Item key={district} value={district}>
              {district}
            </CheckSelectBoxGroup.Item>
          ))}
        </CheckSelectBoxGroup>
        <div className='flex mt-4 gap-2 justify-end'>
          <Button variant='gray' size='banner' onClick={() => setValue(districts)}>
            모두 선택
          </Button>
          <Button variant='gray' size='banner' onClick={() => setValue([])}>
            모두 선택 해제
          </Button>
        </div>
      </div>
    );
  },
};

export const WithLiteralValues: Story = {
  render: () => {
    const districts = ['강남', '서초'] as const;

    const [value, setValue] = useState<(typeof districts)[number][]>([]);

    return (
      <CheckSelectBoxGroup value={value} onChange={setValue}>
        {districts.map((district) => (
          <CheckSelectBoxGroup.Item key={district} value={district}>
            {district}
          </CheckSelectBoxGroup.Item>
        ))}
      </CheckSelectBoxGroup>
    );
  },
};
