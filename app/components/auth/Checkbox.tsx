interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

const Checkbox = ({ label, error, className = "", ...props }: CheckboxProps) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className={`h-4 w-4 rounded border-gray-300 dark:border-slate-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 ${
            error ? "border-red-500 dark:border-red-500" : ""
          } ${className}`}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={props.id}
          className={`font-medium ${
            error
              ? "text-red-500 dark:text-red-400"
              : "text-gray-700 dark:text-slate-300"
          }`}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Checkbox; 