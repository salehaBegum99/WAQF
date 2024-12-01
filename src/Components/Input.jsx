import { Field, ErrorMessage } from "formik";
import React from "react";

const Input = ({ label, type, name, required, options }) => {
  return (
    <div
      className="w-full h-full justify-center pt-5 
    "
    >
      <label className="font-semibold pl-10 text-[20px]">{label}</label>
      {type === "dropdown" ? (
        <Field
          as="select"
          name={name}
          className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[20vw] m-2 mr-2 mt-0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={required}
        >
          <option value="">Select {label} </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : type === "textarea" ? (
        // Render a textarea if the type is "textarea"
        <Field
          as="textarea"
          name={name}
          rows="4"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required={required}
          placeholder={`Enter ${label}`}
        />
      ) : (
        <Field
          type={type}
          name={name}
          className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[20vw] m-2 mr-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={required}
        />
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="error text-lg text-red-500"
      />
    </div>
  );
};

export default Input;
