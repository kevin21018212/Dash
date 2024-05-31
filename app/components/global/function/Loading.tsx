import React from "react";
import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
