'use client'
import * as React from "react";
import { useState, useEffect } from "react";
import { OrderSummary } from "./OrderSummary";
import { fetchGetAllShipping, FormValues } from "./TypeCheckOut";

interface FormFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  pattern?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ShippingMethod {
  id: number;
  name: string;
  cost: string;
  estimatedShipping: string;
  isInner: boolean;
}

// Define formValues as a mapped type

const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  placeholder,
  type = "text",
  pattern,
  name,
  value,
  onChange,
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
      name={name}
      value={value}
      onChange={onChange}
      className="flex mt-2 w-full rounded border border-gray-300 min-h-[50px] px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);

export function CheckoutForm() {
  const [isInner, setIsInner] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState<number>(1);
  const [shippingMethods, setShippingMethod] = useState<ShippingMethod[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Define formValues state with correct type
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    phoneNumber: '',
    emailAddress: ''
  });

  const idUser = sessionStorage.getItem('UserId');
  const accessToken = sessionStorage.getItem('accessToken');

  const formFields = [
    { label: "First Name", required: true, name: "firstName" },
    { label: "Last Name", required: true, name: "lastName" },
    { label: "Street Address", required: true, name: "streetAddress" },
    { label: "Phone Number", required: true, type: "tel", pattern: "[0-9]{10}", name: "phoneNumber" },
    { label: "Email Address", required: true, type: "email", name: "emailAddress" }
  ];

  useEffect(() => {
    const fetchCart = async () => {
      if (!idUser || !accessToken) {
        setError("Please log in to view your cart");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const dataShipping = await fetchGetAllShipping(accessToken)
        setShippingMethod(dataShipping)
        setError(null);
      } catch (err) {
        setError("Failed to load shipping methods. Please try again later.");
        console.error("Error fetching shipping methods:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [idUser, accessToken]);

  const filteredShippingMethods = shippingMethods.filter(method => method.isInner === isInner);
  const selectedShippingMethod = shippingMethods.find(method => method.id === selectedShipping);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // This works now because FormValues allows string indexing
    }));
  };

  const handlePlaceOrder = () => {
    console.log("Form Values:", formValues);
    console.log("Selected Shipping Method:", selectedShippingMethod);
    // Optionally log the payment method if you have one
    // console.log("Selected Payment Method:", selectedPaymentMethod);

    // You can add further logic for processing the order
  };

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
                <FormField
                  {...field}
                  value={formValues[field.name]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-4">Shipping Method</h3>
            <div className="mb-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsInner(true)}
                  className={`px-4 py-2 rounded ${isInner ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                >
                  Nội thành
                </button>
                <button
                  type="button"
                  onClick={() => setIsInner(false)}
                  className={`px-4 py-2 rounded ${!isInner ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                >
                  Ngoại thành
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {filteredShippingMethods.map((method) => (
                <div key={method.id} className="flex gap-4 items-center">
                  <input
                    type="radio"
                    id={`shipping-${method.id}`}
                    name="shipping"
                    value={method.id}
                    checked={selectedShipping === method.id}
                    onChange={(e) => setSelectedShipping(Number(e.target.value))}
                    className="w-5 h-5 text-red-500 border-gray-300"
                  />
                  <label htmlFor={`shipping-${method.id}`} className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{method.name}</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                          useGrouping: true,
                        })
                          .format(parseInt(method.cost))
                          .replace(/,/g, '.')} VNĐ
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Thời gian dự kiến: {method.estimatedShipping} ngày
                    </p>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </section>

      {/* Pass the entire form and selected shipping method to OrderSummary */}
      <OrderSummary
        formValues={formValues}
        selectedShippingMethod={selectedShippingMethod}
      />
    </main>
  );
}
