import { WbTwilight } from "@mui/icons-material";
import { MouseEventHandler, memo, useCallback } from "react";

import { Indicator } from "@/web/topic/components/Indicator/Base/Indicator";
import { stopForcingNodeToShow, useIsNodeForcedToShow } from "@/web/view/currentViewStore/filter";
import { useEnableForceShownIndicators } from "@/web/view/userConfigStore/store";

interface Props {
  nodeId: string;
  bgColor: string;
}

// TODO: only show if we're a FlowNode
const ForceShownIndicatorBase = ({ nodeId, bgColor }: Props) => {
  const enableForceShownIndicators = useEnableForceShownIndicators();

  const nodeIsForcedToShow = useIsNodeForcedToShow(nodeId);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => stopForcingNodeToShow(nodeId),
    [nodeId],
  );

  if (!enableForceShownIndicators || !nodeIsForcedToShow) return <></>;

  return (
    <Indicator
      Icon={WbTwilight}
      title={"Stop forcing node to show"}
      onClick={onClick}
      bgColor={bgColor}
    />
  );
};

export const ForceShownIndicator = memo(ForceShownIndicatorBase);
