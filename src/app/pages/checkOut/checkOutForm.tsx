import * as React from "react";
import { OrderSummary } from "./OrderSummary";

interface FormFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  pattern?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  required, 
  placeholder,
  type = "text",
  pattern 
}) => (
  <div className="flex flex-col w-full leading-6">
    <label className="text-gray-600">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      aria-label={label}
      required={required}
      placeholder={placeholder}
      pattern={pattern}
      className="flex mt-2 w-full rounded border border-gray-300 min-h-[50px] px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);

export function CheckoutForm() {
  const formFields = [
    { label: "First Name", required: true },
    { label: "Last Name", required: true },
    { label: "Company Name" },
    { label: "Street Address", required: true },
    { label: "Apartment, floor, etc.", placeholder: "optional" },
    { label: "Town/City", required: true },
    { label: "Phone Number", required: true, type: "tel", pattern: "[0-9]{10}" },
    { label: "Email Address", required: true, type: "email" }
  ];

  return (
    <main className="flex gap-8 px-4 py-8 max-w-7xl mx-auto max-md:flex-col">
      <section 
        className="flex-1 max-md:w-full" 
        aria-label="Billing Information"
      >
        <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>
        <form className="flex flex-col w-full">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {formFields.map((field, index) => (
              <div 
                key={index} 
                className={field.label === "Street Address" ? "col-span-2" : ""}
              >
                <FormField {...field} />
              </div>
            ))}
          </div>
          
          <div className="flex gap-4 items-center mt-6">
            <input
              type="checkbox"
              id="save-info"
              className="w-5 h-5 rounded border-gray-300 text-red-500"
              aria-label="Save information for next time"
            />
            <label 
              htmlFor="save-info" 
              className="text-gray-700"
            >
              Save this information for faster check-out next time
            </label>
          </div>
        </form>
      </section>
      <OrderSummary />
    </main>
  );
}