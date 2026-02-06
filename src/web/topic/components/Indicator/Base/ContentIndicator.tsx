import { Indicator, IndicatorProps } from "@/web/topic/components/Indicator/Base/Indicator";
import { useEnableContentIndicators } from "@/web/view/userConfigStore/store";

export const ContentIndicator = ({
  Icon,
  title,
  onClick,
  bgColor,
  filled = false,
}: Omit<IndicatorProps, "className">) => {
  const enableContentIndicators = useEnableContentIndicators();

  if (!enableContentIndicators) return;

  return (
    <Indicator Icon={Icon} title={title} onClick={onClick} bgColor={bgColor} filled={filled} />
  );
};
