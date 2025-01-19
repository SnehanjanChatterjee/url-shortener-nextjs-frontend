'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UrlFormData, UrlResponse } from '../models/UrlShortenerModels';
import { GENERATE_SHORT_URL_ENDPOINT, GET_ALL_SHORT_URL_ENDPOINT } from '../constants/UrlShortenerConstants';
import { formatDate, showToast } from '../utils/UrlShortenerUtils';

export default function UrlShortener() {
  const [urls, setUrls] = useState<UrlResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UrlFormData>();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = form;

  useEffect(() => {
    const getAllUrls = async () => {
      try {
        const response = await fetch(GET_ALL_SHORT_URL_ENDPOINT, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const apiResponse = await response.json();
        console.log("get all apiResponse = ", apiResponse);

        const result = apiResponse.result;
  
        if (!response.ok) {
          throw new Error(apiResponse.error || 'Failed to get all shorten URLs');
        }
  
        setUrls((prev) => [...result, ...prev]);
      } catch (error) {
        console.error(error);
      }
    };
  
    getAllUrls(); 
  }, []);

  const onSubmit = async (urlFormData: UrlFormData) => {
    console.log("generate urlFormData = ", urlFormData)

    try {
      setIsLoading(true);
      const response = await fetch(GENERATE_SHORT_URL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlFormData.url }),
      });
      
      const apiResponse = await response.json();
      console.log("generate apiResponse = ", apiResponse);

      const result = apiResponse.result;

      if (!response.ok) {
        throw new Error(result.error || 'Failed to shorten URL');
      }
      
      setUrls((prev) => [result, ...prev]);
      reset();
      showToast('URL shortened successfully!', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to shorten URL', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (shortUrl: string) => {
    console.log("delete shortUrl = ", shortUrl)
    try {
      const response = await fetch(shortUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const apiResponse = await response.json();
      console.log("delete apiResponse = ", apiResponse);

      const result = apiResponse.result;

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete URL');
      }
      
      setUrls((prev) => prev.filter((urlResponse) => urlResponse.shortUrl !== shortUrl));
      showToast('URL deleted successfully', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to delete URL', 'error');
    }
  };

  const handleUrlClick = (originalUrl: string) => {
    setValue('url', originalUrl);  // Set the value of the input field to the original URL
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
        //   className={`btn btn-primary ${isLoading ? 'loading' : ''}`} // This will turn button into a loading spinner
          className="btn btn-primary"
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
              urls.map((urlResponse) => (
                <tr key={urlResponse.shortUrl}>
                  <td className="max-w-[300px] truncate">
                  <span
                    onClick={() => handleUrlClick(urlResponse.originalUrl)}
                    className="link link-hover cursor-pointer"
                    >
                    {urlResponse.originalUrl}
                  </span>

                  </td>
                  <td>
                    <a
                      href={urlResponse.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {urlResponse.shortUrl}
                    </a>
                  </td>
                  <td>{formatDate(urlResponse.creationDateTime)}</td>
                  <td>{formatDate(urlResponse.expirationDateTime)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(urlResponse.shortUrl)}
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