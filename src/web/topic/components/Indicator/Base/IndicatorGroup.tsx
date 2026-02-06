import { type ReactNode } from "react";

import { visibleOnPartHoverSelectedClasses } from "@/web/topic/utils/styleUtils";
import { useWhenToShowIndicators } from "@/web/view/userConfigStore/store";

interface Props {
  className?: string;
  children: ReactNode;
}

export const IndicatorGroup = ({ className, children }: Props) => {
  const whenToShowIndicators = useWhenToShowIndicators();
  const showIndicatorsOnHoverSelect = whenToShowIndicators === "onHoverOrSelect";

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
