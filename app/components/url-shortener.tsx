'use client';

import { useEffect, useState } from 'react';
import { Copy, ExternalLink, Trash2, Trash, Link, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UrlFormData, UrlResponse } from '../models/UrlShortenerModels';
import { URL_SHORTENER_GENERATE_ENDPOINT, URL_SHORTENER_GET_ALL_ENDPOINT, TABLE_COLUMNS, URL_SHORTENER_DELETE_ALL_ENDPOINT } from '../constants/UrlShortenerConstants';
import { formatDate, handleCopyToClipboard, showToast, sortUrlsByCreationDate } from '../utils/UrlShortenerUtils';
import { motion } from 'framer-motion';

export default function UrlShortener() {
  const [urls, setUrls] = useState<UrlResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [newlyAddedUrl, setNewlyAddedUrl] = useState<string | null>(null);
  const [showInfoMessage, setInfoShowMessage] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UrlFormData>();

  useEffect(() => {
    getAllUrls(); 
  }, []);

  const getAllUrls = async () => {
    setIsInitialLoading(true);
    try {
      const response = await fetch(URL_SHORTENER_GET_ALL_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const apiResponse = await response.json();
      console.log("get all apiResponse = ", apiResponse);

      const result = apiResponse?.result;

      if (!response.ok) {
        throw new Error(apiResponse?.error || 'Failed to get all shortened URLs');
      }

      setTimeout(() => {
        const updatedUrls = [...result, ...urls];
        const sortedUrls = sortUrlsByCreationDate(updatedUrls, false); // Sorting in descending order
        setUrls(sortedUrls);
        setIsInitialLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      showToast(error instanceof Error ? error?.message : 'Failed to get all shortened URL', 'error');
      setIsInitialLoading(false);
    }
  };

  const onSubmit = async (urlFormData: UrlFormData) => {
    console.log("generate urlFormData = ", urlFormData)

    try {
      setIsLoading(true);
      const response = await fetch(URL_SHORTENER_GENERATE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlFormData.url }),
      });
      
      const apiResponse = await response.json();
      console.log("generate apiResponse = ", apiResponse);

      const result = apiResponse?.result;

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to shorten URL');
      }
      
      // setTimeout(() => {
        const updatedUrls = [result, ...urls];
        const sortedUrls = sortUrlsByCreationDate(updatedUrls, false); // Sorting in descending order
        setUrls(sortedUrls);
        setNewlyAddedUrl(result?.shortUrl);
        reset();
        showToast('URL shortened successfully!', 'success');
        setIsLoading(false);
        setTimeout(() => setNewlyAddedUrl(null), 3000); // Reset the active effect of newly added url after 3 seconds
      // }, 1000);
    } catch (error) {
      console.log(error);
      showToast(error instanceof Error ? error?.message : 'Failed to shorten URL', 'error');
      setIsLoading(false);
    }
  };

  const handleDelete = async (shortUrl: string) => {
    console.log("delete shortUrl = ", shortUrl)
    try {
      await fetch(shortUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setUrls((prev) => prev.filter((urlResponse) => urlResponse?.shortUrl !== shortUrl));
      showToast('URL deleted successfully', 'success');
    } catch (error) {
      console.log(error);
      showToast(error instanceof Error ? error?.message : 'Failed to delete URL', 'error');
    }
  };

  const handleDeleteAll = async () => {
    if (!urls.length) {
      showToast('No URLs to delete', 'info');
      return;
    }

    if (!window.confirm('Are you sure you want to delete all shortened URLs? This action cannot be undone.')) {
      return;
    }

    setIsDeletingAll(true);
    try {
      await fetch(URL_SHORTENER_DELETE_ALL_ENDPOINT, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setUrls([]);
      showToast('All URLs deleted successfully', 'success');
    } catch (error) {
      console.log(error);
      showToast(error instanceof Error ? error?.message : 'Failed to delete all URLs', 'error');
    } finally {
      setIsDeletingAll(false);
    }
  };

  const handleUrlClick = (originalUrl: string) => {
    setValue('url', originalUrl);  // Set the value of the input field to the original URL
  };

  return (
    <div className="space-y-8">
      
      {/* Floating Button */}
      {(process.env.NEXT_PUBLIC_SHOW_INFO_BUTTON && (process.env.NEXT_PUBLIC_INFO_MESSAGE_LINE1 || process.env.NEXT_PUBLIC_INFO_MESSAGE_LINE2)) && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.button
            onClick={() => setInfoShowMessage(!showInfoMessage)}
            onMouseEnter={() => setInfoShowMessage(true)}
            onMouseLeave={() => setInfoShowMessage(false)}
            className="btn btn-circle btn-sm btn-primary shadow-lg hover:shadow-xl transition-shadow"
            animate={{
              scale: [1, 1.1, 1], // Pulsing effect
              y: [0, -8, 0], // Bouncing effect
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
          >
            <Info className="h-6 w-6" />
          </motion.button>
          {showInfoMessage && (
            <div className="absolute bottom-14 right-0 w-64 p-4 bg-base-100 border border-base-200 rounded-lg shadow-lg">
              <p className="text-sm">
                {process.env.NEXT_PUBLIC_INFO_MESSAGE_LINE1}
                {process.env.NEXT_PUBLIC_INFO_MESSAGE_LINE2 && (
                  <>
                    <br /><br />
                    {process.env.NEXT_PUBLIC_INFO_MESSAGE_LINE2}
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Toast message */}
      <div id="toast" className="toast invisible fixed top-4 right-4 z-50"></div>
      
      {/* Input field and button form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <div className="flex-1">
          <input
            {...register('url', {
              required: 'URL is required',
              pattern: {
                value: /^(https?:\/\/)(www\.)?([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,6}(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/,
                message: 'Please enter a valid URL',
              },
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
          className="btn btn-primary"
          disabled={isLoading}
        >
          <Link className="h-4 w-4" />
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
        {urls.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="btn btn-secondary"
            disabled={isDeletingAll}
          >
            <Trash className="h-4 w-4" />
            {isDeletingAll ? 'Deleting...' : 'Delete All'}
          </button>
        )}
      </form>

      {/* Table Header */}
      <div className="text-center w-full">
        <h2 className="text-xl font-semibold">All Shortened URLs</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[500px]">
        <table className="table table-pin-rows table-pin-cols">
          <thead>
            <tr>
              {TABLE_COLUMNS.map((column, columnIndex) => (
                <th key={columnIndex}>{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {isInitialLoading ? (
              <>
                <tr>
                  <td colSpan={TABLE_COLUMNS.length}>
                    <div className={`grid grid-cols-${TABLE_COLUMNS.length} gap-4`}>
                      {TABLE_COLUMNS.map((column, columnIndex) => (
                        <div
                          key={columnIndex}
                          className={`skeleton ${
                            (["Delete", "Copy"].includes(column.name)) ? "skeleton-button" : "skeleton-text"
                          } col-span-1 h-6`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              </>
            ) : urls.length > 0 ? (
              urls.map((urlResponse) => (
                <tr key={urlResponse.shortUrl} className={`${newlyAddedUrl === urlResponse.shortUrl ? 'bg-base-200' : ''} hover`}>
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
                      className="link link-primary no-underline flex items-center justify-between w-full truncate"
                    >
                      <span className="truncate">{urlResponse.shortUrl}</span>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 ml-1" />
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
                  <td>
                    <button
                      onClick={() => handleCopyToClipboard(urlResponse.shortUrl)}
                      className="btn btn-ghost btn-sm text-green-500 hover:text-green-700"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TABLE_COLUMNS.length} className="text-center h-32 text-base-content/60">
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