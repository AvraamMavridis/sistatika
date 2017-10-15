import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Steps from './Steps.js';

storiesOf('Button', module)
  .add('with text', withInfo('doc string about my component')(() =>
    <Steps
      steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      selectedIndex={1}
      onSelect={(index) => action(`Clicked ${index}`)}/>
  ));