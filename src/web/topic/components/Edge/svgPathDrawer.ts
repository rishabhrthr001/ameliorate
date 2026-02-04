import { Position, getBezierPath } from "@xyflow/react";

import { throwError } from "@/common/errorHandling";
import { scalePxViaDefaultFontSize } from "@/pages/_document.page";
import { EdgeLayoutData } from "@/web/topic/utils/diagram";
import { labelWidthPx } from "@/web/topic/utils/layout";

interface Point {
  x: number;
  y: number;
}

/**
 * For the calculation, uses proper handle `Position` values based on which of start/end is above the other.
 */
const getSimpleBezierPath = (start: Point, end: Point) => {
  const [pathDefinition, labelX, labelY] = getBezierPath({
    sourceX: start.x,
    sourceY: start.y,
    sourcePosition: start.y > end.y ? Position.Top : Position.Bottom,
    targetX: end.x,
    targetY: end.y,
    targetPosition: start.y > end.y ? Position.Bottom : Position.Top,
  });

  return { pathDefinition, labelX, labelY };
};

/**
 * If `avoidEdgeLabelOverlap` is true and there are edge bendpoints from the ELK layout, use the
 * bend points to draw a complex path; otherwise draw a simple bezier between the source and target.
 *
 * TODO: modify complex-path algorithm such that curve has vertical slopes at start and end points.
 * Tried inserting a control point directly below `startPoint` and above `endPoint`, and that
 * resulted in vertical slopes, but the curve to/from the next bend points became jagged.
 */
export const getPathDefinitionForEdge = (
  edgeLayoutData: EdgeLayoutData,
  avoidEdgeLabelOverlap: boolean,
) => {
  const { sourcePoint, targetPoint, bendPoints, labelPosition } = edgeLayoutData;
  if (!avoidEdgeLabelOverlap || bendPoints.length === 0) {
    // TODO: probably ideally would draw this path through the ELK label position if that's provided
    return getSimpleBezierPath(edgeLayoutData.sourcePoint, edgeLayoutData.targetPoint);
  }

  /**
   * Note: source/end points will be off a little because they don't include the size of the handles.
   * `flowEdge.source`/`.target` do, but they require a little hackery to work with flipped edges, and
   * they don't have anything to do with ELK's bendpoints.
   *
   * However: the layout's bend points near the start/end might be too high/low and need to shift
   * down/up in order to make the curve smooth when pointing to the node handles.
   */
  const points = [sourcePoint, ...bendPoints, targetPoint];

  // Awkwardly need to filter out duplicates because of a bug in the layout algorithm.
  // Should be able to remove this logic after https://github.com/eclipse/elk/issues/1085.
  const pointsWithoutDuplicates = points.filter((point, index) => {
    const pointBefore = points[index - 1];
    if (index === 0 || pointBefore === undefined) return true;
    return pointBefore.x !== point.x || pointBefore.y !== point.y;
  });
  const bendPointsWithoutDuplicates = pointsWithoutDuplicates.slice(1, -1);

  const pathDefinition = drawBezierCurvesFromPoints(
    sourcePoint,
    bendPointsWithoutDuplicates,
    targetPoint,
  );

  const { x: labelX, y: labelY } = labelPosition
    ? // Note: ELK label position is moved left by half of its width in order to center it.
      { x: labelPosition.x + 0.5 * scalePxViaDefaultFontSize(labelWidthPx), y: labelPosition.y }
    : getPathMidpoint(pathDefinition);

  return { pathDefinition, labelX, labelY };
};

const getPathMidpoint = (pathDefinition: string) => {
  // This seems like a wild solution to calculate label position based on svg path,
  // but on average, this takes 0.05ms per edge; 100 edges would take 5ms, which seems plenty fast enough.
  // Note: got this from github copilot suggestion.
  // Also tried reusing one `path` element globally, re-setting its `d` attribute each time,
  // but that didn't seem to save any significant amount of performance.
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathDefinition);
  const pathLength = path.getTotalLength();

  return path.getPointAtLength(pathLength / 2);
};

interface Point {
  x: number;
  y: number;
}

/**
 * Copied mostly from https://github.com/eclipse/elk/issues/848#issuecomment-1248084547
 *
 * Could refactor to ensure everything is safer, but logic seems fine enough to trust.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statements */
/* eslint-disable functional/immutable-data */
const drawBezierCurvesFromPoints = (
  startPoint: Point,
  bendPoints: Point[],
  endPoint: Point,
): string => {
  // If no bend points, we should've drawn a simple curve before getting here
  if (bendPoints.length === 0) throwError("Expected bend points", startPoint, bendPoints, endPoint);

  // not sure why end is treated as a control point, but algo seems to work and not sure a better name
  const controlPoints = [...bendPoints, endPoint];

  const path = [`M ${ptToStr(startPoint)}`];

  // if there are groups of 3 points, draw cubic bezier curves
  if (controlPoints.length % 3 === 0) {
    for (let i = 0; i < controlPoints.length; i = i + 3) {
      const [c1, c2, p] = controlPoints.slice(i, i + 3);
      path.push(`C ${ptToStr(c1!)}, ${ptToStr(c2!)}, ${ptToStr(p!)}`);
    }
  }
  // if there's an even number of points, draw quadratic curves
  else if (controlPoints.length % 2 === 0) {
    for (let i = 0; i < controlPoints.length; i = i + 2) {
      const [c, p] = controlPoints.slice(i, i + 2);
      path.push(`Q ${ptToStr(c!)}, ${ptToStr(p!)}`);
    }
  }
  // else, add missing points and try again
  // https://stackoverflow.com/a/72577667/1010492
  else {
    for (let i = controlPoints.length - 3; i >= 2; i = i - 2) {
      const missingPoint = midPoint(controlPoints[i - 1]!, controlPoints[i]!);
      controlPoints.splice(i, 0, missingPoint);
    }
    const newBendPoints = controlPoints.slice(0, -1);
    return drawBezierCurvesFromPoints(startPoint, newBendPoints, endPoint);
  }

  return path.join(" ");
};

export const midPoint = (pt1: Point, pt2: Point) => {
  return {
    x: (pt2.x + pt1.x) / 2,
    y: (pt2.y + pt1.y) / 2,
  };
};

export const ptToStr = ({ x, y }: Point) => {
  return `${x} ${y}`;
};
