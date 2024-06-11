import React, {useState, useEffect, useRef} from 'react';
import {useContentHandlers} from '@/app/utils/contentHandlers';
import styles from './projectContent.module.scss';
import common from '@/app/common.module.scss';
import FeatureContent from '../feature/featureContent';
import {EditableField} from '../global/form/edit';
import {FiEdit} from 'react-icons/fi';
import CreateComponent from '../global/form/create';
import {Project} from '@/app/types';
import {useAtom} from 'jotai';
import {projectAtom} from '@/app/utils/projectAtom';

const ProjectContent: React.FC = () => {
  const {handleFieldChange, saveProject, deleteProject} = useContentHandlers();
  const [project, setProject] = useAtom(projectAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project>(project);
  const projectInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectInfoRef.current && !projectInfoRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const backgroundImageStyle = project.image_url ? {backgroundImage: `url(${project.image_url})`, backgroundSize: 'cover'} : {};

  return (
    <>
      {isEditing ? (
        <div className={common.pageContainer}>
          <section ref={projectInfoRef} className={styles.projectInfo}>
            <div className={styles.infoLeft} style={backgroundImageStyle}>
              <EditableField value={editedProject.title} onSave={(value) => handleFieldChange('title', value, editedProject, setEditedProject)} />
            </div>
            <div className={styles.infoRight}>
              {project.link && (
                <a href={project.link} target='_blank' rel='noopener noreferrer' className={styles.link}>
                  Project Link
                </a>
              )}
              <EditableField
                value={editedProject.description}
                onSave={(value) => handleFieldChange('description', value, editedProject, setEditedProject)}
                type='textArea'
              />
            </div>
            <div className={common.actionButtons}>
              <button onClick={() => saveProject(project, editedProject, setIsEditing)} className={common.saveButton}>
                Save
              </button>
              <button onClick={() => deleteProject(project)} className={common.deleteButton}>
                Delete
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className={common.pageContainer}>
          <section className={styles.projectInfo}>
            <div className={styles.infoLeft} style={backgroundImageStyle}>
              <h1 className={styles.title}>{project.title}</h1>
            </div>
            <div className={styles.infoRight}>
              {project.link && (
                <a href={project.link} target='_blank' rel='noopener noreferrer' className={styles.link}>
                  Project Link
                </a>
              )}
              <p className={styles.description}>{project.description}</p>
              <FiEdit className={common.editIcon} onClick={() => setIsEditing(true)} />
            </div>
          </section>
          <section className={styles.featuresSection}>
            <div className={common.cornerTitle}>
              <h2 className={styles.featuresTitle}>Features</h2>
            </div>
            <div className={styles.featuresGrid}>
              <div className={common.cardLarge}>
                <CreateComponent type='feature' parentId={project.project_id} onCancel={null} />
              </div>
              {project.features.map((feature) => (
                <FeatureContent key={feature.feature_id} feature={feature} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProjectContent;
