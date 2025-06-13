import { useState, useEffect } from 'react';

type DeviceType = 'desktop' | 'mobile';

/**
 * Hook that analyzes the viewport width and returns 'desktop' or 'mobile'
 * @param breakpoint - The width in pixels that separates mobile from desktop (default: 768px)
 * @returns Device type ('desktop' or 'mobile') based on viewport width
 */
export const useViewport = (breakpoint: number = 768): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDeviceType = (): void => {
      setDeviceType(window.innerWidth < breakpoint ? 'mobile' : 'desktop');
    };

    updateDeviceType();

    window.addEventListener('resize', updateDeviceType);

    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, [breakpoint]);

  return deviceType;
};

export default useViewport;
