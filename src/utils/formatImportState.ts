import type { Node } from "@xyflow/react";
import type { ExportStateModel } from "../models/ExportStateModel";
import type { FlowStateModel } from "../models/FlowStateModel";

export function formatImportState(state: ExportStateModel): FlowStateModel {
  const importState: FlowStateModel = {
    nodes: [],
    edges: [],
  };

  state.forEach(node => {
    const importNode: Node = {
      id: node.id,
      position: node.position,
      data: {
        actor: node.actor,
        line: node.line,
        answers: node.answers.map(a => ({ id: a.id, text: a.answer })),
      },
      type: "questionNode",
    }

    importState.nodes.push(importNode);

    if (node.targetId) {
      const targetId = state.find(n => n.id === node.targetId)?.id;

      if (targetId) {
        importState.edges.push({
          id: generateEdgeId(node.id, targetId),
          source: node.id,
          target: targetId,
        });
      }
    } else {
      node.answers.forEach(answer => {
        if (answer.targetId) {
          importState.edges.push({
            id: generateEdgeId(answer.id, answer.targetId),
            source: node.id,
            target: answer.targetId,
            sourceHandle: answer.id,
          });
        }
      });
    }
  });

  return importState;
}

function generateEdgeId(sourceId: string, targetId: string): string {
  return `xy-${sourceId}-${targetId}`
}