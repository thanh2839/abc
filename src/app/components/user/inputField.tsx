import * as React from "react";
import { InputFieldProps } from "./user";

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, width = "446px", height = "42px", type = "text" }) => {
  const inputId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
      <div className="flex flex-col w-60">
        <label htmlFor={inputId} className="text-xl tracking-normal leading-none text-zinc-600">
          {label}
        </label>
      </div>
      {type === "textarea" ? (
        <textarea
          id={inputId}
          value={value}
          onChange={onChange}
          className={`flex shrink-0 bg-white rounded border border-solid border-gray-700 border-opacity-10 min-w-[240px]`}
          style={{ width, height }}
          aria-label={label}
        />
      ) : (
        <input
          type={type}
          id={inputId}
          value={value}
          onChange={onChange}
          className={`flex shrink-0 bg-white rounded border border-solid border-gray-700 border-opacity-10 min-w-[240px]`}
          style={{ width, height }}
          aria-label={label}
        />
      )}
    </div>
  );
};

export default InputField;