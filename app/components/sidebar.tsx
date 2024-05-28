import React from "react";
import styles from "./sidebar.module.scss";

interface SidebarProps {
  isExpanded: boolean;
  onCollapse: () => void;
  children: React.ReactNode;
}

const Sidebar = ({ isExpanded, onCollapse, children }: SidebarProps) => {
  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ""}`}>
      <button className={styles.collapseButton} onClick={onCollapse}>
        ✖
      </button>
      {children}
    </div>
  );
};

export default Sidebar;
