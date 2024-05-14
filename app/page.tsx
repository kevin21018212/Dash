import React from 'react';
import styles from './homepage.module.css';

const Page = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Todo List</h1>
        <h3>This is the homepage login to see your tasks at the dashboard</h3>
      </header>
    </div>
  );
};

export default Page;
