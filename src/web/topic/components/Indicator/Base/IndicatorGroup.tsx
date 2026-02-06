import { type ReactNode, useContext } from "react";

import { WorkspaceContext } from "@/web/topic/components/TopicWorkspace/WorkspaceContext";
import { visibleOnPartHoverSelectedClasses } from "@/web/topic/utils/styleUtils";
import { useWhenToShowIndicators } from "@/web/view/userConfigStore/store";

interface Props {
  className?: string;
  children: ReactNode;
}

export const IndicatorGroup = ({ className, children }: Props) => {
  const workspaceContext = useContext(WorkspaceContext);
  const inDiagram = workspaceContext === "diagram";

  const whenToShowIndicators = useWhenToShowIndicators();

  // When we're e.g. in details/summary/table, just always show the enabled indicators, because
  // there isn't as much worry about overcluttering.
  const showIndicatorsOnHoverSelect = inDiagram && whenToShowIndicators === "onHoverOrSelect";

  return (
    <div
      className={
        "m-0.5 flex flex-row gap-0.5" +
        (showIndicatorsOnHoverSelect ? ` invisible ${visibleOnPartHoverSelectedClasses}` : "") +
        (className ? ` ${className}` : "")
      }
    >
      {children}
    </div>
  );
};
