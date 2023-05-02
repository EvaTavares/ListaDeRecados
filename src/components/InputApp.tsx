import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface InputProps {
  id?: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Input: React.FC<InputProps> = ({
  id = 'demo-helper-text-misaligned-no-helper',
  type = 'text',
  onChange,
  label
}: InputProps) => {
  return <TextField fullWidth id={id} type={type} label={label} onChange={onChange} />;
};

export default Input;
