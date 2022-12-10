
export default function ErrorFallback ({error, resetErrorBoundary}) {

    return (
      <div role="alert" className="text-center">
        <p>Something went wrong :</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }