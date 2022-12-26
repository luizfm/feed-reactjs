import { PencilLine } from "phosphor-react";

import { Avatar } from "../avatar";

import styles from "./styles.module.scss";

export function Sidebar() {
  return (
    <aside className={styles["sidebar-container"]}>
      <img src={"https://picsum.photos/400/72"} className={styles["cover"]} />

      <div className={styles["profile"]}>
        <Avatar src="https://github.com/luizfm.png" />
        <strong className={styles["username"]}>Luiz Fernando de Morais</strong>
        <span className={styles["occupation"]}>
          Software Engineer - Frontend
        </span>
      </div>
      <footer className={styles["footer"]}>
        <a href="/" className={styles["edit-profile-link"]}>
          <PencilLine size={20} />
          Edit your profile
        </a>
      </footer>
    </aside>
  );
}
