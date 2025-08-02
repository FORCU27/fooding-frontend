import type { Meta, StoryObj } from '@storybook/react';

import { DeviceCard } from './DeviceCard';

const meta: Meta<typeof DeviceCard> = {
  title: 'CEO/DeviceCard',
  component: DeviceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    deviceType: {
      control: 'select',
      options: ['android', 'ios'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    deviceName: '웨이팅 - 관리',
    deviceId: 'Device-R21322232',
    deviceModel: 'Galaxy Book5',
    deviceType: 'android',
    osVersion: '1.2.1',
    lastAccessDate: '2025-02-01 23:12:02',
    createdDate: '2025-02-01 23:12:02',
  },
};

export const IosDevice: Story = {
  args: {
    deviceName: '주문 관리 - iPad',
    deviceId: 'Device-IP15293847',
    deviceModel: 'iPad Pro',
    deviceType: 'ios',
    osVersion: '17.2',
    lastAccessDate: '2025-02-02 10:30:15',
    createdDate: '2025-01-15 14:22:30',
  },
};

export const ActiveDevice: Story = {
  args: {
    deviceName: '웨이팅 - 관리',
    deviceId: 'Device-R21322232',
    deviceModel: 'Galaxy Book5',
    deviceType: 'android',
    osVersion: '1.2.1',
    lastAccessDate: '2025-02-01 23:12:02',
    createdDate: '2025-02-01 23:12:02',
    isActive: true,
  },
};

export const MultipleDevices: Story = {
  render: () => (
    <div className="space-y-4">
      <DeviceCard
        deviceName="웨이팅 - 관리"
        deviceId="Device-R21322232"
        deviceModel="Galaxy Book5"
        deviceType="android"
        osVersion="1.2.1"
        lastAccessDate="2025-02-01 23:12:02"
        createdDate="2025-02-01 23:12:02"
      />
      <DeviceCard
        deviceName="주문 관리 - iPad"
        deviceId="Device-IP15293847"
        deviceModel="iPad Pro"
        deviceType="ios"
        osVersion="17.2"
        lastAccessDate="2025-02-02 10:30:15"
        createdDate="2025-01-15 14:22:30"
        isActive
      />
    </div>
  ),
};