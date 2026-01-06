import type { ExportStateModel } from "../models/ExportStateModel";
import type { FlowStateModel } from "../models/FlowStateModel";

export function formatExportState(state: FlowStateModel): ExportStateModel {
  const exportState: ExportStateModel = [];

  state.nodes.forEach(node => {
    exportState.push({
      id: node.id,
      actor: node.data.actor as string,
      line: node.data.line as string,
      
      sourceId: state.edges.find(edge => edge.target === node.id)?.source,
      targetId: state.edges.find(edge => edge.source === node.id)?.target,

      answers: [],
    });
  });

  return exportState;
}