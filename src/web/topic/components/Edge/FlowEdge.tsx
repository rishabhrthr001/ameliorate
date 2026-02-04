import { ScoreEdge } from "@/web/topic/components/Edge/ScoreEdge";
import { useEdge } from "@/web/topic/diagramStore/edgeHooks";
import { FlowEdgeProps } from "@/web/topic/utils/flowUtils";

export const FlowEdge = (flowEdge: FlowEdgeProps) => {
  const edge = useEdge(flowEdge.id);

  if (!edge) return null;

  return <ScoreEdge edge={edge} edgeLayoutData={flowEdge.data} inReactFlow={true} />;
};
