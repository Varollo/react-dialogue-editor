import type { XYPosition } from "@xyflow/react";

export type ExportStateModel = {
  id: string;
  position: XYPosition;

  sourceId: string | undefined;
  targetId?: string | undefined;

  actor: string;
  line: string;

  answers: {
    id: string;
    targetId: string | undefined;
    answer: string;
  }[]
}[]