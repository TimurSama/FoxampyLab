// Analytics utility for tracking events

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);
};

// Track page view
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;
  
  (window as any).gtag?.('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  (window as any).gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track CTA clicks
export const trackCTA = (ctaName: string, location: string) => {
  event({
    action: 'click',
    category: 'CTA',
    label: `${ctaName} - ${location}`,
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string, success: boolean) => {
  event({
    action: success ? 'submit_success' : 'submit_error',
    category: 'Form',
    label: formName,
  });
};

// Track navigation
export const trackNavigation = (destination: string) => {
  event({
    action: 'navigate',
    category: 'Navigation',
    label: destination,
  });
};

// Track 3D component interactions
export const track3DInteraction = (componentName: string, interactionType: string) => {
  event({
    action: interactionType,
    category: '3D Component',
    label: componentName,
  });
};





















