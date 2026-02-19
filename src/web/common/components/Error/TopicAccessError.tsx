import Link from "next/link";
import { useRouter } from "next/router";

export const TopicAccessError = ({ showLogin }: { showLogin: boolean }) => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-700">Topic not found</h1>

      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Either this topic doesn’t exist, or you don’t have permission to view it.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        {/* Primary action */}
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
        >
          Go Home
        </Link>

        {/* Secondary action */}
        {showLogin && (
          <Link
            href={{
              pathname: "/api/auth/login",
              query: { returnTo: router.asPath },
            }}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900"
          >
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};
