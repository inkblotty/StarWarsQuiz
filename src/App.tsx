import React, { useState } from 'react';

import { makeTheme } from './lib/helpers';
import Header from './components/Header';
import RadioButtons from './components/RadioButtons';

function App() {
  const [darkSideMode] = useState(false);

  const { theme: AppTheme } = makeTheme(darkSideMode);
  console.log('AppTheme: ', AppTheme);

  return (
    <div>
      <Header theme={AppTheme} />
      <RadioButtons
        label='Question'
        name='example-radio'
        options={[
          { name: 'opt-1', label: 'True' },
          { name: 'opt-2', label: 'False' },
        ]}
        theme={AppTheme}
      />
    </div>
  );
}

export default App;
