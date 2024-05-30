'use client';

import React, {useEffect, useState} from 'react';
import {useSession, signIn} from 'next-auth/react';
import styles from './projectContent.module.scss';

import {Feature} from '@prisma/client';
import CreateComponent from '../cards/form/create';
import FeatureContent from './featureContent';
import EditableContent from './modules/editContent';
import {handleSaveProject, handleDeleteProject} from './modules/contentHandlers';

const ProjectContent = ({project, onProjectUpdate}) => {
  const {data: session, status} = useSession();
  const [features, setFeatures] = useState([]);
  const [editedProject, setEditedProject] = useState({...project});

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  useEffect(() => {
    const fetchFeatures = async () => {
      const response = await fetch(`/api/get/feature?project_id=${project.project_id}`);
      const data = await response.json();
      setFeatures(data.features || []);
    };

    fetchFeatures();
  }, [project.project_id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const backgroundImageStyle = project.image_url
    ? {backgroundImage: `url(${project.image_url})`, backgroundSize: 'cover'}
    : {backgroundColor: '#0070f3'};

  return (
    <div className={styles.container}>
      <EditableContent
        initialContent={project}
        onSave={(updatedProject) => handleSaveProject(project, updatedProject, onProjectUpdate)}
        onDelete={() => handleDeleteProject(project, onProjectUpdate)}>
        {({editedContent, handleInputChange, isEditing}) => (
          <section className={styles.projectInfo}>
            {isEditing ? (
              <>
                <input type='text' name='title' value={editedContent.title} onChange={handleInputChange} className={styles.input} />
                <textarea name='description' value={editedContent.description} onChange={handleInputChange} className={styles.textarea} />
                <input type='text' name='link' value={editedContent.link} onChange={handleInputChange} className={styles.input} />
                <input type='text' name='image_url' value={editedContent.image_url} onChange={handleInputChange} className={styles.input} />
              </>
            ) : (
              <>
                <div className={styles.titleContent} style={backgroundImageStyle}>
                  <h1 className={styles.title}>{editedContent.title}</h1>
                </div>
                <div className={styles.descriptionContent}>
                  <p className={styles.description}>{editedContent.description}</p>
                  {editedContent.link && (
                    <a href={editedContent.link} target='_blank' rel='noopener noreferrer' className={styles.link}>
                      Project Link
                    </a>
                  )}
                </div>
              </>
            )}
          </section>
        )}
      </EditableContent>
      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.createCard}>
            <CreateComponent type='feature' parentId={project.project_id} onCancel={null} />
          </div>
          {features.map((feature: Feature) => (
            <FeatureContent key={feature.feature_id} feature={feature} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectContent;
