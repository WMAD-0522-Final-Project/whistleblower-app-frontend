import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const ColorInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100px;
  height: 100px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &::-webkit-color-swatch{
    border-radius: 15px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  }
  &::-moz-color-swatch{

    border-radius: 15px;
    border: none;
  }

`

interface Props {
  value: string;
  onChange: (value: string) => void;
}
const ColorInputs: React.FC<Props> = ({ value, onChange }) => {
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <ColorInput type="color" onChange={handleColorChange}/>
  );
}

export default ColorInputs;
