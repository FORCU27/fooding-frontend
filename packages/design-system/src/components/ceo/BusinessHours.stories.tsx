import type { Meta, StoryObj } from '@storybook/react';
import { BusinessHours, HoursByDay, OperatingMode } from './BusinessHours';
import { useState } from 'react';

const meta = {
  title: 'Components/ceo/BusinessHours',
  component: BusinessHours,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '640px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['same_everyday', 'different_by_day', 'open_24h'],
    },
    everydayHours: {
      control: 'object',
    },
    bydayHours: {
      control: 'object',
    },
    onModeChange: {
      action: 'modeChanged',
    },
    onEverydayHoursChange: {
      action: 'everydayHoursChanged',
    },
    onBydayHoursChange: {
      action: 'bydayHoursChanged',
    },
  },
} satisfies Meta<typeof BusinessHours>;

export default meta;
type Story = StoryObj<typeof meta>;

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const renderStory = (args: Story['args']) => <BusinessHours {...args} />;

const defaultBydayHours: HoursByDay = Object.fromEntries(
  daysOfWeek.map((day) => [day, { start: '09:00', end: '22:00', isClosed: false }]),
);

export const Default: Story = {
  args: {
    mode: 'same_everyday',
    everydayHours: { start: '09:00', end: '22:00' },
    bydayHours: defaultBydayHours,
  },
  render: renderStory,
};

export const DifferentByDay: Story = {
  args: {
    mode: 'different_by_day',
    everydayHours: { start: '09:00', end: '22:00' },
    bydayHours: defaultBydayHours,
  },
  render: renderStory,
};

export const Open24Hours: Story = {
  args: {
    mode: 'open_24h',
    everydayHours: { start: '09:00', end: '22:00' },

    bydayHours: defaultBydayHours,
  },
  render: renderStory,
};

export const Controlled: Story = {
  args: {
    mode: 'same_everyday',
    everydayHours: { start: '09:00', end: '22:00' },
    bydayHours: defaultBydayHours,
  },
  render: ({ ...args }) => {
    const [mode, setMode] = useState<OperatingMode>(args.mode || 'same_everyday');
    const [everydayHours, setEverydayHours] = useState<{ start: string; end: string }>(
      args.everydayHours || { start: '09:00', end: '22:00' },
    );
    const [bydayHours, setBydayHours] = useState<HoursByDay>(args.bydayHours ?? defaultBydayHours);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p>
            <strong>운영 모드:</strong>
            {mode === 'same_everyday'
              ? '매일 같아요'
              : mode === 'different_by_day'
                ? '요일마다 달라요'
                : '24시간 영업'}
          </p>
          {mode === 'same_everyday' && (
            <p>
              <strong>영업 시간:</strong> {everydayHours.start} ~ {everydayHours.end}
            </p>
          )}
          {mode === 'different_by_day' && (
            <div>
              <strong>요일별 영업 시간:</strong>
              <ul style={{ marginLeft: '16px' }}>
                {daysOfWeek.map((day) => (
                  <li key={day}>
                    {day}{' '}
                    {bydayHours[day]!.isClosed
                      ? '정기휴무'
                      : `${bydayHours[day]!.start} - ${bydayHours[day]!.end}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {mode === 'open_24h' && (
            <p>
              <strong>영업 시간:</strong> 00:00 ~ 24:00
            </p>
          )}
        </div>
        <BusinessHours
          {...args}
          mode={mode}
          everydayHours={everydayHours}
          bydayHours={bydayHours}
          onModeChange={setMode}
          onEverydayHoursChange={setEverydayHours}
          onBydayHoursChange={setBydayHours}
        />
      </div>
    );
  },
};
