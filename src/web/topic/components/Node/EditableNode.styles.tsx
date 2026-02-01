import styled from "@emotion/styled";

import { htmlDefaultFontSize } from "@/pages/_document.page";

export const nodeWidthRem = 11;
const nodeHeightRem = 3.5625; // 1 line of text results in 57px height, / 16px = 3.5625rem
export const maxNodeHeightRem = 5.5625; // 3 lines of text results in 89px height, / 16px = 5.5625rem

export const nodeWidthPx = nodeWidthRem * htmlDefaultFontSize;
export const nodeHeightPx = nodeHeightRem * htmlDefaultFontSize;

export const TopDiv = styled.div``;
export const NodeTypeDiv = styled.div``;

export const NodeTypeSpan = styled.span``;

export const IndicatorDiv = styled.div`
  display: flex;
`;

// allow handling mouse events for whole node without mouse icon changing to input for textarea
export const MiddleDiv = styled.div``;
export const BottomDiv = styled.div``;
