import React from "react";
import styles from "./featureDisplayCard.module.css";

const FeatureDisplayCard = ({ feature }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{feature.title}</h3>
      <p className={styles.description}>{feature.description}</p>
      {feature.image_url && (
        <img
          src={feature.image_url}
          alt={feature.title}
          className={styles.image}
        />
      )}
    </div>
  );
};

export default FeatureDisplayCard;
