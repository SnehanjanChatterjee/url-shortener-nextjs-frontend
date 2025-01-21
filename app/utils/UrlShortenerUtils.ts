'use client';

import { UrlResponse } from "../models/UrlShortenerModels";

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};

export const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const toast = document.getElementById('toast') as HTMLDivElement;
    if (toast) {
      toast.className = `alert alert-${type}`;
      // toast.className = `alert ${type === 'success' ? 'alert-success' : (type === 'info' ? 'alert-info' : 'alert-error')}`;
      toast.textContent = message;
      toast.style.display = 'flex';
      toast.style.visibility = 'visible'; // This would preoccupy space and not change the input field's positioning when this is appearing / disappearing
      setTimeout(() => {
        // toast.style.display = 'none';
        toast.style.visibility = 'hidden';
      }, 3000);
    }
};

export const sortUrlsByCreationDate = (urls: UrlResponse[], ascending: boolean = true): UrlResponse[] => {
  return urls.sort((a, b) => {
    const dateA = new Date(a.creationDateTime).getTime();
    const dateB = new Date(b.creationDateTime).getTime();
    
    if (ascending) {
      return dateA - dateB;  // Ascending
    } else {
      return dateB - dateA;  // Descending
    }
  });
};

export function handleCopyToClipboard(shortUrl: string) {
  navigator.clipboard.writeText(shortUrl);
  showToast('Successfully copied to Clipboard!', 'info');
};

// Set the data-theme attribute on the <html> tag
export const setHtmlThemeTag = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
};