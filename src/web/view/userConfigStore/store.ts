import { create } from "zustand";
import { persist } from "zustand/middleware";

import { migrate } from "@/web/view/userConfigStore/migrate";

type WhenToShowIndicators = "always" | "onHoverOrSelect";

interface UserConfigStoreState {
  zenMode: boolean;
  fillNodesWithColor: boolean;
  /**
   * Have this because there's visual conflict with scores, but it can be nice sometimes to have the
   * hint of which node types are hidden.
   *
   * Default on, assuming that we'll default "show scores" to on-hover/select so there isn't as much
   * visual conflict.
   *
   * We'll want to keep an eye on this to see if on/off feels best; ideally we wouldn't have to have
   * a config for this.
   */
  fillNodeAttachmentWithColor: boolean;
  expandDetailsTabs: boolean;
  /**
   * Use a group of AddNodeButtons instead of a menu.
   *
   * Menu is clearer and more friendly for beginners. Keeping the buttons around for power users in
   * case it seems very convenient to have quicker ways to add nodes. Might remove the option to
   * expand buttons if that doesn't seem very worthwhile.
   */
  expandAddNodeButtons: boolean;
  /**
   * When true, show score pies by hovering rather than just via click. Can be nice to score many
   * nodes quickly on desktop. Don't want this on all the time because it's pretty annoying for
   * pies to show when you're not intending to set scores.
   */
  quickScoring: boolean;

  whenToShowIndicators: WhenToShowIndicators;

  enableScoresToShow: boolean;
  enableContentIndicators: boolean;
  enableViewIndicators: boolean;
  enableForceShownIndicators: boolean;
}

const initialState: UserConfigStoreState = {
  zenMode: false,
  fillNodesWithColor: false,
  fillNodeAttachmentWithColor: true,
  expandDetailsTabs: true,
  expandAddNodeButtons: false,
  quickScoring: false,

  whenToShowIndicators: "onHoverOrSelect",
  enableScoresToShow: true,
  enableContentIndicators: true,
  enableViewIndicators: false,
  enableForceShownIndicators: false,
};

const useUserConfigStore = create<UserConfigStoreState>()(
  persist(() => initialState, {
    name: "user-config-storage",
    version: 2,
    migrate: migrate,
  }),
);

// hooks
export const useZenMode = () => {
  return useUserConfigStore((state) => state.zenMode);
};

export const useFillNodesWithColor = () => {
  return useUserConfigStore((state) => state.fillNodesWithColor);
};

export const useFillNodeAttachmentWithColor = () => {
  return useUserConfigStore((state) => state.fillNodeAttachmentWithColor);
};

export const useExpandDetailsTabs = () => {
  return useUserConfigStore((state) => state.expandDetailsTabs);
};

export const useExpandAddNodeButtons = () => {
  return useUserConfigStore((state) => state.expandAddNodeButtons);
};

export const useQuickScoring = () => {
  return useUserConfigStore((state) => state.quickScoring);
};

export const useWhenToShowIndicators = () => {
  return useUserConfigStore((state) => state.whenToShowIndicators);
};

export const useEnableScoresToShow = () => {
  return useUserConfigStore((state) => state.enableScoresToShow);
};

export const useEnableContentIndicators = () => {
  return useUserConfigStore((state) => state.enableContentIndicators);
};

export const useEnableViewIndicators = () => {
  return useUserConfigStore((state) => state.enableViewIndicators);
};

export const useEnableForceShownIndicators = () => {
  return useUserConfigStore((state) => state.enableForceShownIndicators);
};

// actions
export const toggleZenMode = () => {
  useUserConfigStore.setState((state) => ({ zenMode: !state.zenMode }));
};

export const toggleFillNodesWithColor = (fill: boolean) => {
  useUserConfigStore.setState({ fillNodesWithColor: fill });
};

export const toggleFillNodeAttachmentWithColor = (fill: boolean) => {
  useUserConfigStore.setState({ fillNodeAttachmentWithColor: fill });
};

export const toggleExpandDetailsTabs = () => {
  useUserConfigStore.setState((state) => ({ expandDetailsTabs: !state.expandDetailsTabs }));
};

export const toggleExpandAddNodeButtons = () => {
  useUserConfigStore.setState((state) => ({ expandAddNodeButtons: !state.expandAddNodeButtons }));
};

export const toggleQuickScoring = () => {
  useUserConfigStore.setState((state) => ({ quickScoring: !state.quickScoring }));
};

export const setWhenToShowIndicators = (whenToShowIndicators: WhenToShowIndicators) => {
  useUserConfigStore.setState({ whenToShowIndicators });
};

export const toggleEnableScoresToShow = () => {
  useUserConfigStore.setState((state) => ({ enableScoresToShow: !state.enableScoresToShow }));
};

export const toggleEnableContentIndicators = () => {
  useUserConfigStore.setState((state) => ({
    enableContentIndicators: !state.enableContentIndicators,
  }));
};

export const toggleEnableViewIndicators = () => {
  useUserConfigStore.setState((state) => ({ enableViewIndicators: !state.enableViewIndicators }));
};

export const toggleEnableForceShownIndicators = () => {
  useUserConfigStore.setState((state) => ({
    enableForceShownIndicators: !state.enableForceShownIndicators,
  }));
};
