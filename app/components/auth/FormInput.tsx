import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-slate-300"
        >
          {label}
        </label>
        <div className="mt-1">
          <input
            ref={ref}
            className={`appearance-none block w-full px-4 py-3 border ${
              error
                ? "border-red-300 dark:border-red-500"
                : "border-gray-300 dark:border-slate-600"
            } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white ${className}`}
            {...props}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput; 