// Device detection and performance utilities

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /iPad|Android/i.test(navigator.userAgent) && 
         window.innerWidth >= 768 && 
         window.innerWidth < 1024;
};

export const isLowPerformance = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for low-end device indicators
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = (navigator as any).deviceMemory || 4;
  
  // Low performance if:
  // - Slow connection (2G, 3G)
  // - Few CPU cores (< 4)
  // - Low device memory (< 4GB)
  const slowConnection = connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g');
  const lowCPU = hardwareConcurrency < 4;
  const lowMemory = deviceMemory < 4;
  
  return slowConnection || lowCPU || lowMemory;
};

export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getOptimal3DQuality = (): 'high' | 'medium' | 'low' => {
  if (typeof window === 'undefined') return 'high';
  
  if (isLowPerformance() || isMobile()) {
    return 'low';
  }
  
  if (isTablet()) {
    return 'medium';
  }
  
  return 'high';
};




















