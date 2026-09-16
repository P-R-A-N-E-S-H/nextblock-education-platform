import React from 'react';
import { University } from '../types';

interface UniversityModalProps {
  university: University | null;
  onClose: () => void;
  isShortlisted: boolean;
  onToggleShortlist: (uni: University) => void;
  onOpenBooking: () => void;
}

export const UniversityModal: React.FC<UniversityModalProps> = () => {
  return null;
};
