import { useContext } from "react";

import { Indicator, IndicatorProps } from "@/web/topic/components/Indicator/Base/Indicator";
import { WorkspaceContext } from "@/web/topic/components/TopicWorkspace/WorkspaceContext";
import { interactableClass, visibleOnPartHoverSelectedClasses } from "@/web/topic/utils/styleUtils";
import { useShowContentIndicators } from "@/web/view/userConfigStore";

export const ContentIndicator = ({
  Icon,
  title,
  onClick,
  bgColor,
  filled = false,
}: Omit<IndicatorProps, "className">) => {
  const workspaceContext = useContext(WorkspaceContext);
  const showContentIndicators = useShowContentIndicators();

  // Always show in details and summary because selection completely changes these views and isn't
  // convenient for quickly checking if there might be more content.
  const alwaysShow = ["details", "summary"].includes(workspaceContext) || showContentIndicators;

  return (
    <Indicator
      Icon={Icon}
      title={title}
      onClick={onClick}
      bgColor={bgColor}
      filled={filled}
      className={
        interactableClass + (alwaysShow ? "" : ` invisible ${visibleOnPartHoverSelectedClasses}`)
      }
    />
  );
};
