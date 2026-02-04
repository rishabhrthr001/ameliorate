import { type Edge, type Node } from "@/web/topic/utils/graph";
import { LayoutedEdge } from "@/web/topic/utils/layout";

export interface Diagram {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Used for rendering paths and labels. If we have ELK layout data, we should use that. Otherwise,
 * e.g. for StandaloneEdge outside of the diagram, we can set `handlePositions`.
 */
export type EdgeLayoutData = Pick<
  LayoutedEdge,
  "sourcePoint" | "targetPoint" | "bendPoints" | "labelPosition"
>;
