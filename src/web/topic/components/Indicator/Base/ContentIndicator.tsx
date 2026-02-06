import { useContext } from "react";

import { Indicator, IndicatorProps } from "@/web/topic/components/Indicator/Base/Indicator";
import { WorkspaceContext } from "@/web/topic/components/TopicWorkspace/WorkspaceContext";
import { useEnableContentIndicators } from "@/web/view/userConfigStore/store";

export const ContentIndicator = ({
  Icon,
  title,
  onClick,
  bgColor,
  filled = false,
}: Omit<IndicatorProps, "className">) => {
  const workspaceContext = useContext(WorkspaceContext);
  const enableContentIndicators = useEnableContentIndicators();

  // Always show in details and summary because selection completely changes these views and isn't
  // convenient for quickly checking if there might be more content.
  const show = ["details", "summary"].includes(workspaceContext) || enableContentIndicators;

  if (!show) return;

  return (
    <Indicator Icon={Icon} title={title} onClick={onClick} bgColor={bgColor} filled={filled} />
  );
};
