import React from 'react';
import InputContainer from '../InputContainer/InputContainer';

function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    // Defaults
    switch (error.type) {
      case 'required':
        return 'This Field Is Required';
      case 'minLength':
        return 'Field Is Too Short';
      default:
        return '*';
    }
  };

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className="w-full h-full border-none border-b-0 transition-[border-width] ease-out bg-white text-[1.1rem] outline-none
         placeholder:text-[#dfdfdf] placeholder:text-[0.95rem] focus:border-b-[2.9px]"
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && (
        <div className="flex justify-center items-center absolute top-0 right-[1rem] h-full w-[12rem] text-red-500 text-center text-[0.95rem]">
          {getErrorMessage()}
        </div>
      )}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
