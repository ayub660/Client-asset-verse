import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-base-300">
        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-error mb-4">
          {error?.status || 404}
        </h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold mb-2 text-base-content">
          Oops! Something went wrong
        </h2>

        {/* Description */}
        <p className="text-base-content/70 mb-6">
          {error?.statusText ||
            error?.message ||
            "The page you are looking for doesn't exist or an unexpected error occurred."}
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="btn btn-primary w-full py-3 text-lg font-medium transition-transform duration-200 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
