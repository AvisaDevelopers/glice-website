"use client";

import { useEffect, useState } from "react";

/** True only after the component has mounted — use to avoid SSR/client markup mismatches. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;  
}
