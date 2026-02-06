import { Indicator, IndicatorProps } from "@/web/topic/components/Indicator/Base/Indicator";
import { useEnableViewIndicators } from "@/web/view/userConfigStore/store";

export const ViewIndicator = ({
  Icon,
  title,
  onClick,
  bgColor,
  filled = true,
}: Omit<IndicatorProps, "className">) => {
  const enableViewIndicators = useEnableViewIndicators();

  if (!enableViewIndicators) return;

  return (
    <Indicator Icon={Icon} title={title} onClick={onClick} bgColor={bgColor} filled={filled} />
  );
};
