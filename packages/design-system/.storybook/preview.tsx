import './font.css';
import './index.css';

import React from 'react';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='flex flex-col justify-center items-center'>
        <Story />
      </div>
    ),
  ],
};

export default preview;
