/* eslint-disable -- don't really care to make this file meet eslint standards, since store type is changing between each migration */

export const migrate = (persistedState: any, version: number) => {
  const migrations = [migrate_1_to_2];

  let state = persistedState;

  // thanks for this style to migrate one version at a time https://github.com/pmndrs/zustand/issues/984#issuecomment-1144661466
  migrations.forEach((migration, i) => {
    // i + 1 because these versions started from 1, not 0
    if (i + 1 >= version) {
      state = migration(state);
    }
  });

  return state;
};

interface FromState1 {
  showScores?: boolean;
  showContentIndicators?: boolean;
  showViewIndicators?: boolean;
  indicateWhenNodeForcedToShow?: boolean;
}

/**
 * Renaming to these names, but we're just dropping the old values instead of migrating, since we
 * slightly changed functionality (hover/selecting) and want to modify the defaults.
 */
// interface ToState2 {
//   enableScoreShowing: boolean;
//   enableContentIndicators: boolean;
//   enableViewIndicators: boolean;
//   enableForceShownIndicators: boolean;
// }

export const migrate_1_to_2 = (state: FromState1) => {
  delete state.showScores;
  delete state.showContentIndicators;
  delete state.showViewIndicators;
  delete state.indicateWhenNodeForcedToShow;

  return state;
};
