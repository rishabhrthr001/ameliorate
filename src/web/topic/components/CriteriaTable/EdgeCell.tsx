import { openContextMenu } from "@/web/common/store/contextMenuActions";
import { CommonIndicatorGroup } from "@/web/topic/components/Indicator/Base/CommonIndicatorGroup";
import { ContentIndicatorGroup } from "@/web/topic/components/Indicator/Base/ContentIndicatorGroup";
import { StatusIndicatorGroup } from "@/web/topic/components/Indicator/Base/StatusIndicatorGroup";
import { Edge } from "@/web/topic/utils/graph";
import { graphPartClass } from "@/web/topic/utils/styleUtils";
import { setSelected, useIsGraphPartSelected } from "@/web/view/selectedPartStore";

export const EdgeCell = ({ edge }: { edge: Edge }) => {
  const selected = useIsGraphPartSelected(edge.id);

  return (
    <div
      className={
        graphPartClass +
        (selected ? " selected" : "") +
        " flex h-full flex-col items-center justify-center" +
        // `rounded-md` so that rings match a node's rounding
        " rounded-md" +
        // ensure it's obvious when a cell is selected/hovered
        " hover:inset-ring-2 hover:inset-ring-info-main/30" +
        " [&.selected]:inset-ring-2 [&.selected]:inset-ring-info-main"
      }
      onClick={() => setSelected(edge.id)}
      onContextMenu={(event) => openContextMenu(event, { edge })}
      role="button"
    >
      <CommonIndicatorGroup graphPart={edge} />
      <div className="flex">
        <StatusIndicatorGroup
          graphPartId={edge.id}
          bgColor="white"
          notes={edge.data.notes}
          className="my-0 mr-0"
        />
        <ContentIndicatorGroup
          className="my-0"
          graphPartId={edge.id}
          graphPartType="edge"
          bgColor="white"
        />
      </div>
    </div>
  );
};
