import { useCallback, useRef, useState } from "react";
import styles from "src/features/project/projectModal.module.css";
import html2canvas from "html2canvas";

// components
import Button from "src/components/button";

// redux
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  create_project,
  create_project_modal
} from "src/features/project/projectSlice";

// config
import { Palette, Icons } from "src/config/avatar";
import { XIcon } from "src/config/icons";

function ProjectModal() {
  const dispatch = useAppDispatch();
  const { projects, project_modal_visibility } = useAppSelector(
    state => state.project
  );
  const AvatarRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: ""
  });
  const [avatar, setAvatar] = useState<{ icon: string; color: string }>({
    icon: Icons[0],
    color: Palette[0]
  });
  const [state, setState] = useState<"idle" | "loading">("idle");

  // input handlers
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProject(prev => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [project]
  );

  // avatar handlers
  const handleAvatarChange = useCallback(
    (key: string, value: string) => {
      if (state === "idle") {
        setAvatar(prev => ({ ...prev, [key]: value }));
      }
    },
    [avatar, state]
  );

  // create project
  const createProject = useCallback(async () => {
    if (AvatarRef.current) {
      const canvas = await html2canvas(AvatarRef.current, {
        backgroundColor: null
      });
      const avatar = await canvas.toDataURL();

      dispatch(create_project({ ...project, avatar }));
      setState("idle");

      if (project_modal_visibility) {
        dispatch(create_project_modal(false));
      }
    }
  }, [project, AvatarRef.current]);

  if (!project_modal_visibility) return null;

  return (
    <div className={styles.project_modal} role="dialog">
      <div className={styles.modal}>
        {projects.length > 0 && (
          <button
            type="button"
            className={styles.close}
            onClick={() => dispatch(create_project_modal(false))}
          >
            <XIcon />
          </button>
        )}
        <header className={styles.modal_header}>
          <h1 className={styles.modal_title}>Create a new project</h1>
          <div className={styles.avatar_maker}>
            <div
              ref={AvatarRef}
              className={styles.project_avatar}
              style={{ backgroundColor: avatar.color }}
            >
              {avatar.icon}
            </div>
            <div className={styles.avatar_palette}>
              {Palette.map((color: string, index: number) => (
                <span
                  key={index}
                  className={`${styles.avatar_palette_item} ${
                    color === avatar.color ? styles.active : undefined
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleAvatarChange("color", color)}
                />
              ))}
            </div>
            <div className={styles.emoji_palette}>
              {Icons.map((icon: string, index: number) => (
                <span
                  key={index}
                  className={`${styles.emoji_palette_item} ${
                    icon === avatar.icon ? styles.active : undefined
                  }`}
                  onClick={() => handleAvatarChange("icon", icon)}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </header>
        <main className={styles.modal_body}>
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Project Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <Button
              type="button"
              title="Create Project"
              onClick={createProject}
              loading={state === "loading"}
            >
              Create Project
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectModal;
