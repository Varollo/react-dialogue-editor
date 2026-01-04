import styles from "./GenericButton.module.css";

type GenericButtonProps = {
  children?: React.ReactNode;
  size?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function GerenicButton({
  size,
  children,
  ...props
}: GenericButtonProps) {
  return (
    <button
      className={styles.genericButton}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
