/**
 * Format a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Nov 23, 2025")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format currency amount in UGX
 * @param amount - Amount to format
 * @returns Formatted currency string (e.g., "UGX 40,000")
 */
export const formatCurrency = (amount: number): string => {
  return `UGX ${amount.toLocaleString()}`;
};

/**
 * Calculate the number of days between two dates
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Number of days
 */
export const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Get icon component by name
 * @param iconName - Name of the icon
 * @returns Icon component
 */
import {
  Globe,
  Camera,
  MapPin,
  Heart,
  Plane,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Camera,
  MapPin,
  Heart,
  Plane
};

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Globe;
};

/**
 * Check if a destination is available for booking
 * @param startDate - Destination start date
 * @param endDate - Destination end date
 * @param isActive - Whether destination is active
 * @returns Boolean indicating availability
 */
export const isDestinationAvailable = (
  startDate: string,
  endDate: string,
  isActive: boolean
): boolean => {
  if (!isActive) return false;

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  return now <= end && start >= now;
};

/**
 * Get urgency label for a destination based on booking deadline
 * @param startDate - Destination start date
 * @returns Urgency label or null
 */
export const getUrgencyLabel = (startDate: string): string | null => {
  const now = new Date();
  const start = new Date(startDate);
  const daysUntilStart = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilStart < 0) return null;
  if (daysUntilStart <= 7) return 'Booking closes soon!';
  if (daysUntilStart <= 14) return 'Limited availability';

  return null;
};

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Generate a slug from a string
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};