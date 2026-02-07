export const graphPartClass = "graphPart";

/**
 * Convenient selector for showing elements when hovering/selecting the parent graph part.
 *
 * `String.raw` in order to allow underscores to be escaped for tailwind, so they don't get converted to spaces
 *
 * Keep this next to `graphPartClass` because tailwind doesn't let us reference the `graphPartClass`
 * variable and we need to hardcode the class as a string.
 *
 * Considered separating a variable for selecting based on `react-flow__node` and not `graphPart`, but this
 * caused elements to have different hover timings e.g. node attachment would show when hovering the
 * hover bridge content indicators would only show when hovering the inner `EditableNode`.
 */
export const visibleOnPartHoverSelectedClasses = String.raw` [:is(.react-flow\_\_node,.graphPart):hover_&]:visible in-[.react-flow\_\_node:has(.graphPart.selected),.graphPart.selected]:visible`;
