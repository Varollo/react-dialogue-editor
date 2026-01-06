import { DownloadIcon, SpeechIcon, UploadIcon } from "lucide-react";
import styles from "./Toolbar.module.css";
import { useFlowContext } from "../../contexts/useFlowContext";
import { formatExportState } from "../../utils/formatExportState";

export function Toolbar() {
  const { state } = useFlowContext();

  function handleImportClick(): void {}

  function handleExportClick(): void {
    console.log(JSON.stringify(formatExportState(state)));
  }

  return (
    <nav className={styles.toolbar}>
      <SpeechIcon />
      <ul>
        <li>
          <button onClick={handleImportClick}>
            <UploadIcon /> Import...
          </button>
        </li>
        <li>
          <button onClick={handleExportClick}>
            <DownloadIcon /> Export...
          </button>
        </li>
      </ul>
    </nav>
  );
}
