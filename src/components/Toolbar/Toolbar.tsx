import { DownloadIcon, SpeechIcon, UploadIcon } from "lucide-react";
import styles from "./Toolbar.module.css";
import { useFlowContext } from "../../contexts/useFlowContext";
import { formatExportState } from "../../utils/formatExportState";
import type { ExportStateModel } from "../../models/ExportStateModel";
import { FlowActions } from "../../models/FlowActionModel";
import { formatImportState } from "../../utils/formatImportState";

export function Toolbar() {
  const { state, dispatch } = useFlowContext();

  function handleImportClick(): void {
    const input = document.createElement("input");
    input.type = "file";
    document.body.appendChild(input);

    input.addEventListener("change", async () => {
      if (!input.files || input.files.length == 0) return;

      const jsonString = await input.files[0].text();
      const data = JSON.parse(jsonString) as ExportStateModel;

      dispatch({
        type: FlowActions.SET_STATE,
        payload: formatImportState(data),
      });
    });

    input.click();
    document.body.removeChild(input);
  }

  function handleExportClick(): void {
    const jsonString = JSON.stringify(formatExportState(state), null, 2);
    const blob = new Blob([jsonString], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "dialogue.json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
