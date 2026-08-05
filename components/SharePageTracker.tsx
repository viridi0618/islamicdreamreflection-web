"use client";

import { useEffect } from "react";
import { track } from "@/lib/events";

/** Fires the share_page_viewed event once per share page load. */
export function SharePageTracker() {
  useEffect(() => {
    track("share_page_viewed");
  }, []);
  return null;
}
