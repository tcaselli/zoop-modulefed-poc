import { Alert, Button } from 'react-bootstrap';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import React from 'react';

type FallbackComponentProps = FallbackProps & { className?: string };

export type ErrorHandlerProps = {
  children?: React.ReactNode;
  className?: string;
};

const FallbackComponent: React.FC<FallbackComponentProps> = ({
  className,
  error,
  resetErrorBoundary,
}) => {
  const message =
    'An internal error happened' + (error.message ? ' : ' + error.message : '');

  return (
    <div className={'mt-3' + (className ? ' ' + className : '')}>
      <Alert variant="danger">
        {message}
        <div className="mt-2">
          <Button variant="danger" onClick={resetErrorBoundary}>
            Retry
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  children,
  className,
}) => {
  const handleError = (error: Error, info: { componentStack: string }) => {
    console.info(`ERROR :`, error);
    console.info('STACKTRACE :', info);
  };

  const fallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
      <FallbackComponent
        className={className}
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
  };

  // https://www.npmjs.com/package/react-error-boundary#error-recovery
  return (
    <ErrorBoundary fallbackRender={fallbackRender} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};
