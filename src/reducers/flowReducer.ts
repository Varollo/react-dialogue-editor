import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { FlowActions, type FlowActionModel } from "../models/FlowActionModel";
import type { FlowStateModel } from "../models/FlowStateModel";

export function flowReducer(state: FlowStateModel, action: FlowActionModel): FlowStateModel {
  switch (action.type) {
    case FlowActions.ADD_NODE: {
      return {
        ...state,
        nodes: [
          ...state.nodes,
          action.payload,
        ]
      };
    }

    case FlowActions.UPDATE_NODES: {
      return {
        ...state,
        nodes: applyNodeChanges(action.payload, state.nodes),
      };
    }

    case FlowActions.UPDATE_EDGES: {
      return {
        ...state,
        edges: applyEdgeChanges(action.payload, state.edges),
      };
    }

    case FlowActions.CONNECT_NODES: {
      return {
        ...state,
        edges: addEdge(action.payload, state.edges),
      };
    }

    case FlowActions.UPDATE_NODE_DATA: {
      const index = state.nodes.findIndex(node => node.id === action.payload.id);

      const newList = [...state.nodes];
      newList[index].data = action.payload.data;
      
      return {
        ...state,
        nodes: newList,
      }
    }

    default:
      return state;
  }
}