import { useCallback, useState } from "react";
import { useAppDispatch } from "src/app/hooks";
import { create_project } from "src/features/project/projectSlice";
import styles from "src/features/project/projectModal.module.css";

function ProjectModal() {
  const dispatch = useAppDispatch();
  const [project, setProject] = useState<{ name: string; description: string }>(
    {
      name: "",
      description: ""
    }
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProject(prev => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [project]
  );

  const projectAvatar = useCallback((): string => {
    const first = project.name.split(" ")[0];
    const second = project.name.split(" ")[1];

    return `${first[0] ? first[0] : ""}${second ? second[0] : ""}`;
  }, [project.name]);

  return (
    <div className={styles.project_modal} role="dialog">
      <div className={styles.modal}>
        <header className={styles.modal_header}>
          <h1 className={styles.modal_title}>Create a new project</h1>
          <div className={styles.project_avatar}>{projectAvatar()}</div>
        </header>
        <main className={styles.modal_body}>
          <div className={styles.form_group}>
            <label htmlFor="name">Project name</label>
            <input id="name" name="name" type="text" onChange={handleChange} />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="description">Project Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
            />
          </div>

          <div className={styles.form_group}>
            <button
              type="button"
              onClick={() => dispatch(create_project(project))}
            >
              Create Project
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectModal;
