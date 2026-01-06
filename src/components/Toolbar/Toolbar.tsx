import { DownloadIcon, SpeechIcon/*, UploadIcon*/ } from "lucide-react";
import styles from "./Toolbar.module.css";
import { useFlowContext } from "../../contexts/useFlowContext";
import { formatExportState } from "../../utils/formatExportState";

export function Toolbar() {
  const { state } = useFlowContext();

  // function handleImportClick(): void {}

  function handleExportClick(): void {
    const jsonString = JSON.stringify(formatExportState(state), null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'dialogue.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <nav className={styles.toolbar}>
      <SpeechIcon />
      <ul>
        {/* <li>
          <button onClick={handleImportClick}>
            <UploadIcon /> Import...
          </button>
        </li> */}
        <li>
          <button onClick={handleExportClick}>
            <DownloadIcon /> Export...
          </button>
        </li>
      </ul>
    </nav>
  );
}
