import { useInput } from '@com.zooplus/f-shared';
import React from 'react';
import { Form } from 'react-bootstrap';

function Input() {
  const { value, onChange } = useInput({ id: 'name' });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e?.target?.value;
    onChange(inputValue);
  };
  return (
    <Form.Control
      id="name"
      type="text"
      placeholder="Please enter your name..."
      value={value}
      onChange={handleOnChange}
    />
  );
}

export default Input;
