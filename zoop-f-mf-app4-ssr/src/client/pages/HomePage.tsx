import React from 'react';
import imported from 'react-imported-component';
const Counter = imported(() => import('app1/Counter'));
function HomePage() {
  return (
    <div>
      <div>I'm the home Test component</div>
      <button onClick={() => console.log('Hi')}>Press me</button>
      <Counter />
    </div>
  );
}

export default {
  component: HomePage,
};
