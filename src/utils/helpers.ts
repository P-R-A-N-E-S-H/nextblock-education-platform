import confetti from 'canvas-confetti';

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -80; // Header offset
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B']
    });
  } catch (e) {
    console.error('Confetti error', e);
  }
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export const getStreamFallbackImage = (stream?: string): string => {
  if (!stream) return 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80';
  const s = stream.toLowerCase();
  if (s.includes('medical') || s.includes('health') || s.includes('dental') || s.includes('doctor')) {
    return 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80';
  }
  if (s.includes('arts') || s.includes('science') || s.includes('commerce') || s.includes('humanities')) {
    return 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80';
  }
  return 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80';
};
