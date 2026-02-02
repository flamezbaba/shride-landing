"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error("Captured Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mt-2 text-gray-600">
        We encountered an issue while loading this page. Our team has been
        notified.
      </p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => reset()} // Attempt to recover by re-rendering the segment
          className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700"
        >
          Try again
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
