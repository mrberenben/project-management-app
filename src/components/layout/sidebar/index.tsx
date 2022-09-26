import { useCallback, useState } from "react";
import styles from "src/components/layout/sidebar/sidebar.module.css";

// components
import Dropdown from "src/components/dropdown";

// redux
import { useAppSelector, useAppDispatch } from "src/app/hooks";
import {
  create_project_modal,
  switch_project
} from "src/features/project/projectSlice";

// config
import { ChevronVertical } from "src/config/icons";

function Sidebar() {
  const { projects, active: project } = useAppSelector(state => state.project);
  const dispatch = useAppDispatch();
  const [switchProjectDropdown, setSwitchProjectDropdown] =
    useState<boolean>(false);

  // toggle switch project dropdown
  const toggleDropdown = useCallback(() => {
    setSwitchProjectDropdown(prev => !prev);
  }, [switchProjectDropdown]);

  // switch project
  const switchProject = useCallback(
    (project_id: string) => {
      dispatch(switch_project(project_id));
      toggleDropdown();
    },
    [project]
  );

  // create new project
  const createNewProject = useCallback(() => {
    dispatch(create_project_modal(true));
    toggleDropdown();
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.project_wrapper}>
        <div className={styles.project} onClick={toggleDropdown}>
          <div className={styles.project_icon}>
            <img src={project?.avatar} alt={project?.name} />
          </div>
          <div className={styles.project_metadata}>
            <h6 className={styles.project_name} title={project?.name}>
              {project?.name}
            </h6>
            <p className={styles.project_desc}>Team Project</p>
          </div>
          <div className={styles.project_switcher}>
            <ChevronVertical />
          </div>
        </div>

        <Dropdown
          visibility={switchProjectDropdown}
          menu={projects.filter(p => p.id !== project?.id)}
          onItemClick={switchProject}
          onNewClick={createNewProject}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
