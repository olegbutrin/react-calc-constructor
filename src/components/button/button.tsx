import { MouseEventHandler } from "react";
import styles from "./button.module.css";

import { TWidgetActivityMode } from "../../utils/types";

const Button = (props: {
  label: string;
  mode: TWidgetActivityMode;
  onClick?: MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}) => {
  return (
    <div
      className={styles.button}
      style={props.style}
      onClick={
        props.mode === "constructor"
          ? () => {}
          : props.onClick
          ? props.onClick
          : () => {}
      }
    >
      <div className={styles.label} style={props.textStyle}>
        {props.label}
      </div>
    </div>
  );
};

export default Button;
