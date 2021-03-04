import React, { Component } from 'react';

import logo from '../assets/zooplus.jpg';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
interface State {
  hasError: boolean;
}
// This class component catchs errors when a micro frontend is impossible to load and displays a fallback
export default class ImportWrapper extends Component<Props, State> {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch() {}

  public render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p>An unexpected error occured, our services may be down. Try again later</p>;
    }

    return (
      <React.Suspense
        fallback={
          this.props.fallback || (
            <div
              style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={logo} style={{ position: 'absolute', maxHeight: '80px' }} alt="zoop" />
            </div>
          )
        }
      >
        {this.props.children}
      </React.Suspense>
    );
  }
}
