'use client';

import { useEffect, useRef, useState } from 'react';

import { Check, MessageCircleQuestionMark } from 'lucide-react';

import api from '@/lib/api';

export type TypeOption =
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

type QuestionTypeSelectorProps = {
  value: TypeOption | null;
  onChange: (questionType: TypeOption) => void;
};

export default function QuestionTypeSelector({
  value,
  onChange,
}: QuestionTypeSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [questionType, setQuestionType] = useState<TypeOption[]>([]);

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
      setQuestionType([]);
      return;
    }

    const controller = new AbortController();

    const searchQuestionTypes = async () => {

      try {

        setLoading(true);

        const response = await api.get('/interviews/questions/question-type/search', {
          params: {
            query: debouncedValue,
          },
          signal: controller.signal,
        });

        const mappedQuestionTypes: TypeOption[] =
          response.data.data.map((quesType: any) => ({
            type: 'existing',
            ...quesType,
          }));

        setQuestionType(mappedQuestionTypes);

      } catch (error: any) {

        if (
          error.name === 'CanceledError' ||
          error.code === 'ERR_CANCELED'
        ) {
          return;
        }

        console.error('Failed to search question types:', error);

      } finally {
        setLoading(false);
      }
    };

    searchQuestionTypes();

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

  const handleSelect = (quesType: TypeOption) => {

    onChange(quesType);

    setInputValue(quesType.name);

    setIsOpen(false);
  };

  const showCreateOption =
    debouncedValue.trim() &&
    !questionType.some(
      (type) =>
        type.name.toLowerCase() ===
        debouncedValue.trim().toLowerCase()
    );

  return (
    <div className="relative" ref={wrapperRef}>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        Question Type
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
          placeholder="Search question type..."
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

          {!loading && questionType.length > 0 && (
            <div className="p-1">

              {questionType.map((type) => {

                const isSelected =
                  value?.type === 'existing' &&
                  type.type === 'existing' &&
                  value._id === type._id;

                return (
                  <button
                    key={
                      type.type === 'existing'
                        ? type._id
                        : type.name
                    }
                    type="button"
                    onClick={() => handleSelect(type)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-gray-100"
                  >

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {type.name}
                      </p>

                      {type.type === 'existing' &&
                        type.description && (
                          <p className="text-xs text-gray-500">
                            {type.description}
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

          {/* Create New Question Type */}

          {!loading && showCreateOption && (
            <button
              type="button"
              onClick={() => {

                const newQuestionType: TypeOption = {
                  type: 'new',
                  name: inputValue.trim(),
                };

                onChange(newQuestionType);

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
            questionType.length === 0 &&
            !showCreateOption && (
              <div className="px-3 py-3 text-sm text-gray-500">
                No question types found
              </div>
            )}
        </div>
      )}
    </div>
  );
}