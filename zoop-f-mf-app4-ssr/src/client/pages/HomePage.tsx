import React from 'react';
import { lazy, LazyBoundary } from 'react-imported-component';
const Header = lazy(() => import('app1/Header'));
function HomePage() {
  return (
    <div>
      <div>I'm the home Test component</div>
      <button onClick={() => console.log('Hi')}>Press me</button>
      <LazyBoundary fallback={<p>Loading</p>}>
        <Header />
      </LazyBoundary>
    </div>
  );
}

export default {
  component: HomePage,
};
