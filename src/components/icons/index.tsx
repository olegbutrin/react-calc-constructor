import styles from "./index.module.css";

export const EyeIcon = (props: { active: boolean }) => {
  return (
    <div
      className={props.active ? styles.eyeEnabled : styles.eyeDisabled}
    ></div>
  );
};

export const SelectorIcon = (props: { active: boolean }) => {
  return (
    <div
      className={props.active ? styles.selectorEnabled : styles.selectorDisabled}
    ></div>
  );
};

export const DropIcon = () => {
  return <div className={styles.drop}></div>
}
