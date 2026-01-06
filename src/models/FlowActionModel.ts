import type { Connection, Edge, EdgeChange, Node, NodeChange } from "@xyflow/react";
import type { FlowStateModel } from "./FlowStateModel";

export const FlowActions = {
  ADD_NODE: 'ADD_NODE',
  REMOVE_NODE: 'REMOVE_NODE',
  UPDATE_NODES: 'UPDATE_NODES',
  UPDATE_EDGES: 'UPDATE_EDGES',
  CONNECT_NODES: 'CONNECT_NODES',
  UPDATE_NODE_DATA: 'UPDATE_NODE_DATA',
  SET_STATE: 'SET_STATE',
} as const;
export type FlowActions = (typeof FlowActions)[keyof typeof FlowActions];

export type FlowActionModel =
  {
    type: typeof FlowActions.ADD_NODE;
    payload: Node;
  } |

  {
    type: typeof FlowActions.REMOVE_NODE;
    payload: { id: string };
  } |

  {
    type: typeof FlowActions.UPDATE_NODES;
    payload: NodeChange<Node>[];
  } |

  {
    type: typeof FlowActions.UPDATE_EDGES;
    payload: EdgeChange<Edge>[];
  } |

  {
    type: typeof FlowActions.CONNECT_NODES;
    payload: Connection;
  } |

  {
    type: typeof FlowActions.UPDATE_NODE_DATA;
    payload: { id: string, data: Record<string, unknown> }
  } |

  {
    type: typeof FlowActions.SET_STATE;
    payload: FlowStateModel;
  }