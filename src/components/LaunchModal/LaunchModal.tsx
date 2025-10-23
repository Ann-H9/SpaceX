import ReactDOM from "react-dom";
import { type Launch } from "../../types/spacex";
import styles from "./LaunchModal.module.css";

type Props = {
  launch: Launch;
  onClose: () => void;
};

export function LaunchModal({ launch, onClose }: Props) {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <img src={launch.links.mission_patch} alt={launch.mission_name} />

        <div>
          <p className={styles.label}>Mission name:</p>
          <p className={styles.value}>{launch.mission_name}</p>

          <p className={styles.label}>Rocket name:</p>
          <p className={styles.value}>{launch.rocket.rocket_name}</p>

          <p className={styles.label}>Details:</p>
          <p className={styles.value}>{launch.details}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}