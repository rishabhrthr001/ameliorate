import { memo } from "react";

import { IndicatorGroup } from "@/web/topic/components/Indicator/Base/IndicatorGroup";
import { CommentIndicator } from "@/web/topic/components/Indicator/CommentIndicator";
import { FoundResearchIndicator } from "@/web/topic/components/Indicator/FoundResearchIndicator";
import { JustificationIndicator } from "@/web/topic/components/Indicator/JustificationIndicator";
import { QuestionIndicator } from "@/web/topic/components/Indicator/QuestionIndicator";
import { GraphPartType } from "@/web/topic/utils/graph";

interface Props {
  graphPartId: string;
  graphPartType: GraphPartType;
  bgColor: string;
  className?: string;
}

const ContentIndicatorGroupBase = ({ graphPartId, graphPartType, bgColor, className }: Props) => {
  return (
    <IndicatorGroup className={className}>
      <JustificationIndicator graphPartId={graphPartId} bgColor={bgColor} />
      <QuestionIndicator graphPartId={graphPartId} bgColor={bgColor} />
      <FoundResearchIndicator graphPartId={graphPartId} bgColor={bgColor} />
      <CommentIndicator graphPartId={graphPartId} graphPartType={graphPartType} bgColor={bgColor} />
    </IndicatorGroup>
  );
};

export const ContentIndicatorGroup = memo(ContentIndicatorGroupBase);
