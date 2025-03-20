interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
  }
  
  export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <div className="text-red-500 text-lg font-semibold mb-4">{message}</div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-[#014F86] text-white px-6 py-2 rounded-lg hover:bg-[#FC9B89] transition"
          >
            Réessayer
          </button>
        )}
      </div>
    );
  }