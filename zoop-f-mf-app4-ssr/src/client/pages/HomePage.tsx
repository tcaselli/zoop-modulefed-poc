import React from 'react';
const Header = (await import('app1/Header')).default;

function HomePage() {
  return (
    <div>
      <div>I'm the home Test component</div>
      <button onClick={() => console.log('Hi')}>Press me</button>
      <Header />
    </div>
  );
}

export default {
  component: HomePage,
};
