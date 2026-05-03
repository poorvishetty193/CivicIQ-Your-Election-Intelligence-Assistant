import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merges Tailwind classes safely */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/** Strips HTML tags and trims input to max 1000 chars */
export const sanitizeInput = (input: string): string =>
  input.replace(/<[^>]*>/g, '').trim().slice(0, 1000);

/** Formats a date string to human-readable format */
export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

/** Returns number of days until a date */
export const getDaysUntil = (dateStr: string): number =>
  Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

/** Generates a unique session ID */
export const generateSessionId = (): string =>
  typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2);

/** Truncates a string with ellipsis */
export const truncate = (str: string, maxLength: number): string =>
  str.length <= maxLength ? str : `${str.slice(0, maxLength)}...`;

/** Decodes an encoded Google Maps polyline */
export const decodePolyline = (encoded: string): { lat: number; lng: number }[] => {
  const points: { lat: number; lng: number }[] = [];
  let index = 0, lat = 0, lng = 0;
  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;
    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return points;
};
