import React, { FC } from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button: FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button type="button" className={styles.button} {...props}>
      {label}
    </button>
  );
};
