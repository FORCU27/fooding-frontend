import type { Meta, StoryObj } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';
import { ImageUploader } from './ImageUploader';
import { useState } from 'react';
import { Button } from './Button';

const meta = {
  title: 'Components/ceo/ImageUploader',
  component: ImageUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <ImageUploader />,
};

export const PositionRight: Story = {
  render: () => <ImageUploader position='right' />,
};

export const Controlled: Story = {
  render: () => {
    const ControlledWrapper = () => {
      const [images, setImages] = useState<string[]>([]);
      return <ImageUploader images={images} onChange={setImages} />;
    };
    return <ControlledWrapper />;
  },
};

export const ControlledWithForm: Story = {
  render: () => {
    const FormWrapper = () => {
      const { handleSubmit, control } = useForm<{ images: string[] }>({
        defaultValues: { images: [] },
      });

      const onSubmit = (data: { images: string[] }) => {
        console.log('업로드된 이미지:', data.images);
      };

      return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center justify-center'
        >
          <Controller
            name='images'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ImageUploader
                images={field.value}
                onChange={field.onChange}
                maxImages={8}
                position='left'
              />
            )}
          />

          <Button className='mt-8'>제출</Button>
        </form>
      );
    };

    return <FormWrapper />;
  },
};
