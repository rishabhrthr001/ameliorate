/**
 * This allows us to hide other hover-to-show elements when we're hovering one that's interactable.
 *
 * Generally if an element is interactable and we hover, it seems nicer to hide other interactable
 * things so that we can more clearly see what we're about to interact with.
 *
 * For example, when we hover a node, we show the add node buttons. But if we hover an indicator,
 * which has its own hover/click effects, it's nicer if we hide the add node buttons, because at
 * that time we don't really benefit from seeing them.
 *
 * We considered moving all interactable elements outside of being a child of the node, but many of
 * them are positioned relative to the node and don't make sense to popper out (e.g. indicators), so
 * they need to be children of the node container element.
 */
export const interactableClass = "interactable";
export const graphPartClass = "graphPart";

// keep these next to `interactableClass` because tailwind doesn't let us reference the `interactableClass` variable and we need to hardcode the class as a string
// `:not(:has(:not(&).interactable:hover))` is so that we don't show this element if we're hovering another interactable element
// TODO: seems like the `not().interactable` part isn't working?
/**
 * Convenient selector for showing elements when hovering/selecting the parent graph part.
 *
 * `String.raw` in order to allow underscores to be escaped for tailwind, so they don't get converted to spaces
 *
 * Considered separating a variable for selecting based on `react-flow__node` and not `graphPart`, but this
 * caused elements to have different hover timings e.g. node attachment would show when hovering the
 * hover bridge content indicators would only show when hovering the inner `EditableNode`.
 */
export const visibleOnPartHoverSelectedClasses = String.raw` [:is(.react-flow\_\_node,.graphPart):not(:has(:not(&).interactable:hover)):hover_&]:visible in-[.react-flow\_\_node:has(.graphPart.selected),.graphPart.selected]:visible`;
