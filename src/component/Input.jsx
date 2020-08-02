import React from "react";
import { TextField } from "@material-ui/core";
export default function Input({ name, value, onChange, label, type, errors }) {
  return (
    <div>
      <TextField
        type={type}
        label={label}
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        helperText={errors && <span>{errors}</span>}
      />
    </div>
  );
}
