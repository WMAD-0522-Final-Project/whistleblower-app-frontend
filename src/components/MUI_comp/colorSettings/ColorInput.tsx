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

  &::-webkit-color-swatch{
    border-radius: 15px;
    border: none;
    box-shadow: rgba(240, 238, 238, 0.48) 0px 1px 3px 0px, rgba(240, 238, 238, 0.48) 0px 0px 0px 1px;

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
    <ColorInput  value={value} type="color" onChange={handleColorChange}/>
  );
}

export default ColorInputs;
