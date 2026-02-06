import { memo } from "react";

import { ForceShownIndicator } from "@/web/topic/components/Indicator/ForceShownIndicator";
import { NotesIndicator } from "@/web/topic/components/Indicator/NotesIndicator";
import { visibleOnPartHoverSelectedClasses } from "@/web/topic/utils/styleUtils";
import { useWhenToShowIndicators } from "@/web/view/userConfigStore/store";

interface Props {
  graphPartId: string;
  bgColor: string;
  notes: string;
  className?: string;
}

/**
 * Future: e.g. controversial, hot, solid
 */
const StatusIndicatorGroupBase = ({ graphPartId, bgColor, notes, className }: Props) => {
  const whenToShowIndicators = useWhenToShowIndicators();
  const showIndicatorsOnHoverSelect = whenToShowIndicators === "onHoverOrSelect";

  return (
    <div
      className={
        `m-0.5 flex flex-row gap-0.5 ${className} ` +
        (showIndicatorsOnHoverSelect ? `invisible ${visibleOnPartHoverSelectedClasses}` : "")
      }
    >
      <ForceShownIndicator nodeId={graphPartId} bgColor={bgColor} />

      {/* This is more of a content indicator, but there isn't enough space to show 5 content indicators */}
      {/* to the right of the node handle, so we're putting it here as an easy hack. */}
      {/* TODO: https://github.com/amelioro/ameliorate/issues/630 */}
      <NotesIndicator graphPartId={graphPartId} notes={notes} bgColor={bgColor} />
    </div>
  );
};

export const StatusIndicatorGroup = memo(StatusIndicatorGroupBase);
