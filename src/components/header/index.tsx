import { ReactComponent as IgniteLogo } from "../../assets/ignite-logo.svg";

import styles from "./styles.module.scss";

type HeaderProps = {};

export function Header() {
  return (
    <header className={styles["header"]}>
      <IgniteLogo className={styles["ignite-logo"]} />
      <strong className={styles["application-name"]}>Ignite Feed</strong>
    </header>
  );
}
