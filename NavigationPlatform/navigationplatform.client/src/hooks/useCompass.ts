import { useEffect, useState } from "react";

export function useCompass() {
  const [heading, setHeading] = useState<number | null>(null);
  const [supported, setSupported] = useState(true);

  async function startCompass() {
    if (!("DeviceOrientationEvent" in window)) {
      setSupported(false);
      return;
    }

    const DeviceOrientation = DeviceOrientationEvent as any;

    // Required on iOS/Safari
    if (typeof DeviceOrientation.requestPermission === "function") {
      const permission = await DeviceOrientation.requestPermission(true);
      if (permission !== "granted") return;
    }

    window.addEventListener("deviceorientation", handleOrientation, true);
  }

  function handleOrientation(event: DeviceOrientationEvent) {
    const safariHeading = (event as any).webkitCompassHeading;

    let compassHeading: number | null = null;

    if (typeof safariHeading === "number") {
      compassHeading = safariHeading;
    } else if (typeof event.alpha === "number") {
      compassHeading = 360 - event.alpha;
    }

    if (compassHeading !== null) {
      setHeading(Math.round(compassHeading));
    }
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  return { heading, supported, startCompass };
}