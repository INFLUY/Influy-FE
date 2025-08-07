interface ErrorContentProps {
  message: string;
  buttonText: string;
  onClickHandler: () => void;
}

const ErrorContent = ({
  message,
  buttonText,
  onClickHandler,
}: ErrorContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center break-words whitespace-break-spaces">
        {message}
      </div>
      <button
        type="button"
        onClick={onClickHandler}
        className="bg-grey11 cursor-pointer rounded-sm px-10 py-2 text-white"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ErrorContent;
