import { useRouteError } from 'react-router-dom';

interface ErrorMessage {
  statusText?: string;
  message?: string;
}

function ErrorPage() {
  const error = useRouteError() as ErrorMessage;

  return (
    <div className="text-center min-h-[70vh] flex flex-col items-center justify-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
