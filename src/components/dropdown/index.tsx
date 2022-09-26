import styles from "src/components/dropdown/dropdown.module.css";

// types
import { IProject } from "src/types/project";

// config
import { PlusIcon } from "src/config/icons";

type DropdownProps = {
  menu: IProject[];
  onItemClick: (project_id: string) => void;
  onNewClick: () => void;
  visibility: boolean;
};

function Dropdown(props: DropdownProps) {
  if (!props.visibility) return null;

  return (
    <div role="dialog" tabIndex={1} className={styles.dropdown}>
      {props.menu.map((item: IProject, i: number) => (
        <div
          key={i}
          className={styles.dropdown_item}
          onClick={() => props.onItemClick(item.id)}
        >
          <div className={styles.project_icon}>
            <img src={item.avatar} alt={item.name} />
          </div>
          <div className={styles.project_metadata}>
            <h6 className={styles.project_name} title={item.name}>
              {item.name}
            </h6>
            <p className={styles.project_desc} title={item.description}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
      <div className={styles.dropdown_item} onClick={() => props.onNewClick()}>
        <div className={styles.project_icon}>
          <PlusIcon />
        </div>
        <div className={styles.project_metadata}>
          <h6 className={styles.project_name}>Create new project</h6>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
