"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-base-100 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-error font-semibold tracking-widest uppercase">
          Unexpected Error
        </p>

        <h1 className="mt-3 text-6xl md:text-7xl font-black">
          Oops!
        </h1>

        <p className="mt-6 text-base-content/70 leading-8">
          Something went wrong while loading this page.
          Please try again.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-xl bg-base-200 p-4 text-left overflow-auto">
            <p className="font-semibold mb-2 text-error">
              Error Message
            </p>

            <code className="text-sm break-all">
              {error.message}
            </code>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="btn btn-outline"
          >
            Go Home
          </Link>
        </div>

        <div className="mt-12 divider">
          LUXE Marketplace
        </div>
      </div>
    </main>
  );
}