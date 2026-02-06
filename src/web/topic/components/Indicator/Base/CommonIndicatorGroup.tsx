import { memo } from "react";

import { ContextIndicator } from "@/web/topic/components/Indicator/ContextIndicator";
import { CriteriaTableIndicator } from "@/web/topic/components/Indicator/CriteriaTableIndicator";
import { Score } from "@/web/topic/components/Score/Score";
import { GraphPart } from "@/web/topic/utils/graph";
import { visibleOnPartHoverSelectedClasses } from "@/web/topic/utils/styleUtils";
import { useWhenToShowIndicators } from "@/web/view/userConfigStore/store";

interface Props {
  graphPart: GraphPart;
  className?: string;
}

const CommonIndicatorGroupBase = ({ graphPart, className }: Props) => {
  const whenToShowIndicators = useWhenToShowIndicators();
  const showIndicatorsOnHoverSelect = whenToShowIndicators === "onHoverOrSelect";

  return (
    <div
      className={
        `m-0.5 flex flex-row gap-0.5 ${className} ` +
        (showIndicatorsOnHoverSelect ? `invisible ${visibleOnPartHoverSelectedClasses}` : "")
      }
    >
      {/* TODO: should this be moved because it's not used for all graph parts? */}
      <ContextIndicator graphPart={graphPart} />
      {/* TODO: should this be moved because it's only used for problem? */}
      <CriteriaTableIndicator nodeId={graphPart.id} />
      <Score graphPartId={graphPart.id} />
    </div>
  );
};

export const CommonIndicatorGroup = memo(CommonIndicatorGroupBase);
