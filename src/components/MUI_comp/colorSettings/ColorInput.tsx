import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const ColorInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 65px;
  height: 65px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  
  &::-webkit-color-swatch {

    width: 100%;
    border: none;

  }
  &::-moz-color-swatch {
    border-radius: 15px;
    border: none;
  }
`;
interface Props {
  value: string;
  onChange: (value: string) => void;
}
const ColorInputs: React.FC<Props> = ({ value, onChange }) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return <ColorInput value={value} type="color" onChange={handleColorChange} />;
};

export default ColorInputs;
