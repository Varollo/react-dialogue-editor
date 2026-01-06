import type { ExportStateModel } from "../models/ExportStateModel";
import type { FlowStateModel } from "../models/FlowStateModel";

export function formatExportState(state: FlowStateModel): ExportStateModel {
  type SingleExportNode = ExportStateModel[number];
  const exportState: ExportStateModel = [];

  state.nodes.forEach(node => {
    const exportNode: SingleExportNode = {
      id: node.id,
      position: node.position,

      actor: node.data.actor as string,
      line: node.data.line as string,

      sourceId: state.edges.find(edge => edge.target === node.id)?.source,

      answers: (node.data.answers as [])?.map((answer: { id: string, text: string }) => ({
        id: answer.id,
        targetId: state.edges.find(edge => edge.sourceHandle && edge.sourceHandle === answer.id)?.target,
        answer: answer.text,
      })),
    }

    if (exportNode.answers.length == 0) {
      const targetId = state.edges.find(edge => edge.source === node.id)?.target;

      if (targetId) {
        exportNode.targetId = targetId;
      }
    }

    exportState.push(exportNode);
  });

  return exportState;
}