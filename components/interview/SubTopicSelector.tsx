'use client';

import { useEffect, useRef, useState } from 'react';

import { Check, MessageCircleQuestionMark } from 'lucide-react';

import api from '@/lib/api';

import type { SubTopicOption } from '@/types/questionTypes';

type SubTopicSelectorProps = {
  value: SubTopicOption | null;
  onChange: (subTopic: SubTopicOption) => void;
};

export default function SubTopicSelector({
  value,
  onChange,
}: SubTopicSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [topics, setTopics] = useState<SubTopicOption[]>([]);

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
      setTopics([]);
      return;
    }

    const controller = new AbortController();

    const searchTopics = async () => {

      try {

        setLoading(true);

        const response = await api.get('/interviews/questions/subtopic/search', {
          params: {
            query: debouncedValue,
          },
          signal: controller.signal,
        });

        const mappedtopics: SubTopicOption[] =
          response.data.data.map((topic: any) => ({
            type: 'existing',
            ...topic,
          }));

        setTopics(mappedtopics);

      } catch (error: any) {

        if (
          error.name === 'CanceledError' ||
          error.code === 'ERR_CANCELED'
        ) {
          return;
        }

        console.error('Failed to search topics:', error);

      } finally {
        setLoading(false);
      }
    };

    searchTopics();

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

  const handleSelect = (topic: SubTopicOption) => {

    onChange(topic);

    setInputValue(topic.name);

    setIsOpen(false);
  };

  const showCreateOption =
    debouncedValue.trim() &&
    !topics.some(
      (topic) =>
        topic.name.toLowerCase() ===
        debouncedValue.trim().toLowerCase()
    );

  return (
    <div className="relative" ref={wrapperRef}>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        Sub Topic
      </label>

      <div className="relative">

        <MessageCircleQuestionMark className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search topic..."
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

          {!loading && topics.length > 0 && (
            <div className="p-1">

              {topics.map((topic) => {

                const isSelected =
                  value?.type === 'existing' &&
                  topic.type === 'existing' &&
                  value._id === topic._id;

                return (
                  <button
                    key={
                      topic.type === 'existing'
                        ? topic._id
                        : topic.name
                    }
                    type="button"
                    onClick={() => handleSelect(topic)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-gray-100"
                  >

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {topic.name}
                      </p>

                      {topic.type === 'existing' &&
                        topic.description && (
                          <p className="text-xs text-gray-500">
                            {topic.description}
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

          {/* Create New Topic */}

          {!loading && showCreateOption && (
            <button
              type="button"
              onClick={() => {

                const newTopic: SubTopicOption = {
                  type: 'new',
                  name: inputValue.trim(),
                };

                onChange(newTopic);

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
            topics.length === 0 &&
            !showCreateOption && (
              <div className="px-3 py-3 text-sm text-gray-500">
                No Sub topics found
              </div>
            )}
        </div>
      )}
    </div>
  );
}