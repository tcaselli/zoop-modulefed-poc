import React from 'react';
import importedComponent from 'react-imported-component';
const Test = importedComponent(() => import('app1/Test'));
function HomePage() {
  return (
    <div>
      <div>I'm the home Test component</div>
      <button onClick={() => console.log('Hi')}>Press me</button>
      <Test />
    </div>
  );
}

export default {
  component: HomePage,
};
