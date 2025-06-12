import { useState, useEffect } from 'react';

export interface NavbarItem {
  id: number;
  label: string;
  href: string;
  icon?: string;
}

export type NavbarItems = NavbarItem[];

type DeviceType = 'desktop' | 'mobile';

/**
 * Hook that analyzes the viewport width and returns 'desktop' or 'mobile'
 * @param breakpoint - The width in pixels that separates mobile from desktop (default: 768px)
 * @returns Device type ('desktop' or 'mobile') based on viewport width
 */
export const useViewport = (breakpoint: number = 768): DeviceType => {
  // Default to 'desktop' for SSR (server-side rendering)
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') return;

    // Function to update device type based on window width
    const updateDeviceType = (): void => {
      setDeviceType(window.innerWidth < breakpoint ? 'mobile' : 'desktop');
    };

    // Set initial device type
    updateDeviceType();

    // Add event listener to update device type on window resize
    window.addEventListener('resize', updateDeviceType);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, [breakpoint]); // Re-run effect if breakpoint changes

  return deviceType;
};

export default useViewport;
