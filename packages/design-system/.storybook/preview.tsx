import './font.css';
import './index.css';

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
      <div className='w-[375px] flex flex-col justify-center items-center'>
        <Story />
      </div>
    ),
  ],
};

export default preview;
