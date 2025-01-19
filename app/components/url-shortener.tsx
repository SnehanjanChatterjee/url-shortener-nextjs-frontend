'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UrlFormData, UrlResponse } from '../models/url';

export default function UrlShortener() {
  const [urls, setUrls] = useState<UrlResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UrlFormData>();
  const { register, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = async (data: UrlFormData) => {
    console.log(data)
    // try {
    //   setIsLoading(true);
    //   const response = await fetch('/api/shorten', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ url: data.url }),
    //   });
      
    //   const result = await response.json();
      
    //   if (!response.ok) {
    //     throw new Error(result.error || 'Failed to shorten URL');
    //   }
      
    //   setUrls((prev) => [result, ...prev]);
    //   reset();
    //   showToast('URL shortened successfully!', 'success');
    // } catch (error) {
    //   showToast(error instanceof Error ? error.message : 'Failed to shorten URL', 'error');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleDelete = (shortUrl: string) => {
    setUrls((prev) => prev.filter((url) => url.shortUrl !== shortUrl));
    showToast('URL deleted successfully', 'success');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const toast = document.getElementById('toast') as HTMLDivElement;
    if (toast) {
      toast.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
      toast.textContent = message;
      toast.style.display = 'flex';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div id="toast" className="alert hidden fixed top-4 right-4 z-50"></div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <div className="flex-1">
          <input
            {...register('url', {
              required: 'URL is required',
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Please enter a valid URL'
              }
            })}
            type="text"
            placeholder="Enter URL to shorten"
            className={`input input-bordered w-full sm:w-[600px] lg:w-[800px] ${errors.url ? 'input-error' : ''}`}
          />
          {errors.url && (
            <p className="mt-1 text-sm text-error">{errors.url.message}</p>
          )}
        </div>
        <button 
          type="submit" 
          className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Created At</th>
              <th>Expires At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.length > 0 ? (
              urls.map((url) => (
                <tr key={url.shortUrl}>
                  <td className="max-w-[300px] truncate">
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-hover"
                    >
                      {url.originalUrl}
                    </a>
                  </td>
                  <td>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td>{formatDate(url.creationDateTime)}</td>
                  <td>{formatDate(url.expirationDateTime)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(url.shortUrl)}
                      className="btn btn-ghost btn-sm text-error"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center h-32 text-base-content/60">
                  No shortened URLs yet. Enter a URL above to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}