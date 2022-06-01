import React, { InputHTMLAttributes, useState } from "react";
import styles from "./inputbox.module.scss";

export interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  styleClass?: string;
  name?: string;
  label?: string;
  defaultStyling?: boolean;
}
function InputBox({
  styleClass,
  defaultStyling,
  label,
  name,
  ...rest
}: InputBoxProps) {
  
  const InputBoxStyleClass = defaultStyling
    ? `${styleClass} ${styles.inputbox}`
    : styleClass;
  return (
    <article
      className={InputBoxStyleClass}
    >
      {label && (
        <label className={`${styleClass}__label ${rest.value && styles.filled}`} htmlFor={name}>
          {label}
        </label>
      )}
      <input {...rest} name={name} />
    </article>
  );
}

export default InputBox;
