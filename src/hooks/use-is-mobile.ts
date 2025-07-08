"use client";

import { useWindowSize } from "usehooks-ts";

export function useIsMobile(widthThreshold?: number) {
  const { width } = useWindowSize();

  return width <= (widthThreshold ?? 768);
}
