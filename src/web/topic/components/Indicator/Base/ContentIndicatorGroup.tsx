import { memo } from "react";

import { CommentIndicator } from "@/web/topic/components/Indicator/CommentIndicator";
import { FoundResearchIndicator } from "@/web/topic/components/Indicator/FoundResearchIndicator";
import { JustificationIndicator } from "@/web/topic/components/Indicator/JustificationIndicator";
import { QuestionIndicator } from "@/web/topic/components/Indicator/QuestionIndicator";
import { GraphPartType } from "@/web/topic/utils/graph";
import { visibleOnPartHoverSelectedClasses } from "@/web/topic/utils/styleUtils";
import { useWhenToShowIndicators } from "@/web/view/userConfigStore/store";

interface Props {
  graphPartId: string;
  graphPartType: GraphPartType;
  bgColor: string;
  className?: string;
}

const ContentIndicatorGroupBase = ({ graphPartId, graphPartType, bgColor, className }: Props) => {
  const whenToShowIndicators = useWhenToShowIndicators();
  const showIndicatorsOnHoverSelect = whenToShowIndicators === "onHoverOrSelect";

  return (
    <div
      className={
        `m-0.5 flex flex-row gap-0.5 ${className} ` +
        (showIndicatorsOnHoverSelect ? `invisible ${visibleOnPartHoverSelectedClasses}` : "")
      }
    >
      <JustificationIndicator graphPartId={graphPartId} bgColor={bgColor} />
      <QuestionIndicator graphPartId={graphPartId} bgColor={bgColor} />
      <FoundResearchIndicator graphPartId={graphPartId} bgColor={bgColor} />
      <CommentIndicator graphPartId={graphPartId} graphPartType={graphPartType} bgColor={bgColor} />
    </div>
  );
};

export const ContentIndicatorGroup = memo(ContentIndicatorGroupBase);
