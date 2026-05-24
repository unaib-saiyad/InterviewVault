'use client';

import { useEffect, useRef, useState } from 'react';

import { Check, Globe } from 'lucide-react';

import api from '@/lib/api';

export type SourceOption =
  | {
      type: 'existing';
      _id: string;
      name: string;
      description?: string;
    }
  | {
      type: 'new';
      name: string;
    };

type SourceSelectorProps = {
  value: SourceOption | null;
  onChange: (source: SourceOption) => void;
};

export default function SourceSelector({
  value,
  onChange,
}: SourceSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [sources, setSources] = useState<SourceOption[]>([]);

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value?.name) {
      setInputValue(value.name);
    }
  }, [value]);

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);

    return () => clearTimeout(timer);

  }, [inputValue]);

  useEffect(() => {

    if (debouncedValue.trim().length < 2) {
      setSources([]);
      return;
    }

    const controller = new AbortController();

    const searchSources = async () => {

      try {

        setLoading(true);

        const response = await api.get('/sources/search', {
          params: {
            query: debouncedValue,
          },
          signal: controller.signal,
        });

        const mappedSources: SourceOption[] =
          response.data.data.map((source: any) => ({
            type: 'existing',
            ...source,
          }));

        setSources(mappedSources);

      } catch (error: any) {

        if (
          error.name === 'CanceledError' ||
          error.code === 'ERR_CANCELED'
        ) {
          return;
        }

        console.error('Failed to search sources:', error);

      } finally {
        setLoading(false);
      }
    };

    searchSources();

    return () => {
      controller.abort();
    };

  }, [debouncedValue]);

  useEffect(() => {

    const handleOutsideClick = (event: MouseEvent) => {

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );
    };

  }, []);

  const handleSelect = (source: SourceOption) => {

    onChange(source);

    setInputValue(source.name);

    setIsOpen(false);
  };

  const showCreateOption =
    debouncedValue.trim() &&
    !sources.some(
      (source) =>
        source.name.toLowerCase() ===
        debouncedValue.trim().toLowerCase()
    );

  return (
    <div className="relative" ref={wrapperRef}>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        Source
      </label>

      <div className="relative">

        <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search source..."
          className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          required
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">

          {loading && (
            <div className="px-3 py-3 text-sm text-gray-500">
              Searching...
            </div>
          )}

          {!loading && sources.length > 0 && (
            <div className="p-1">

              {sources.map((source) => {

                const isSelected =
                  value?.type === 'existing' &&
                  source.type === 'existing' &&
                  value._id === source._id;

                return (
                  <button
                    key={
                      source.type === 'existing'
                        ? source._id
                        : source.name
                    }
                    type="button"
                    onClick={() => handleSelect(source)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-gray-100"
                  >

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {source.name}
                      </p>

                      {source.type === 'existing' &&
                        source.description && (
                          <p className="text-xs text-gray-500">
                            {source.description}
                          </p>
                        )}
                    </div>

                    {isSelected && (
                      <Check className="h-4 w-4 text-brand-600" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Create New Source */}

          {!loading && showCreateOption && (
            <button
              type="button"
              onClick={() => {

                const newSource: SourceOption = {
                  type: 'new',
                  name: inputValue.trim(),
                };

                onChange(newSource);

                setInputValue(inputValue.trim());

                setIsOpen(false);
              }}
              className="w-full border-t border-gray-100 px-3 py-3 text-left text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              Create "{inputValue.trim()}"
            </button>
          )}

          {/* Empty State */}

          {!loading &&
            debouncedValue.trim().length >= 2 &&
            sources.length === 0 &&
            !showCreateOption && (
              <div className="px-3 py-3 text-sm text-gray-500">
                No sources found
              </div>
            )}
        </div>
      )}
    </div>
  );
}