import classnames from "classnames";

import styles from "./styles.module.scss";

export enum AvatarVariants {
  Default = "default",
  Borderless = "borderless",
}

type AvatarProps = {
  src: string;
  variant?: "default" | "borderless";
};

export function Avatar({ variant = "default", src }: AvatarProps) {
  return (
    <img
      src={src}
      className={classnames(styles["avatar-image"], styles[variant])}
    />
  );
}
