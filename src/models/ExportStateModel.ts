export type ExportStateModel = {
  id: string;
  sourceId: string | undefined;
  targetId: string | undefined;

  actor: string;
  line: string;

  answers: {
    id: string;
    targetId: string | undefined;
    answer: string;
  }[]
}[]