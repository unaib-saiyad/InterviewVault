'use client';

import { useEffect, useRef, useState } from 'react';
import { Building2, Check } from 'lucide-react';

import { CompanyOption } from '@/types/interviewTypes';
import api from '@/lib/api';
import { ApiError } from '@/types/apiTypes';

type CompanySelectorProps = {
  value: CompanyOption | null;
  onChange: (company: CompanyOption) => void;
};


export default function CompanySelector({
  value,
  onChange,
}: CompanySelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInput, setDebouncedInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCompanies, setFilteredCompanies] =
    useState<CompanyOption[]>([]);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync selected value to input
  useEffect(() => {
    if (value?.name) {
      setInputValue(value.name);
    }
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(inputValue);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // Filter companies
  useEffect(() => {
    const searchCompanies = async () => {
      // Simulate API call
      if(debouncedInput.trim().length < 2) {
        setFilteredCompanies([]);
        return;
      }
      const controller = new AbortController();
      try{
        setLoading(true);
        const response = await api.get(
          `/companies/search?query=${debouncedInput}`, 
          { signal: controller.signal }
        );
        setFilteredCompanies(response.data.data.map((company: any): CompanyOption => ({
          type: 'existing',
          ...company,
        })));

      }
      catch(error){
        const apiError = error as ApiError;
        console.error("Failed to fetch companies:", apiError.message);
        setFilteredCompanies([]);
      }
      finally{
        setLoading(false);
      }

      return () => {
        controller?.abort();
      };
    };

    searchCompanies();
  }, [debouncedInput]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (company: CompanyOption) => {
    onChange(company);
    setInputValue(company.name);
    setIsOpen(false);
  };

  const showCreateOption =
    debouncedInput.trim() &&
    !filteredCompanies.some(
      (company) =>
        company.name.toLowerCase() === debouncedInput.trim().toLowerCase()
    );

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Company
      </label>

      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search company..."
          className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          required
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {filteredCompanies.length > 0 && (
            <div className="p-1">
              {filteredCompanies.map((company) => {
                const isSelected = value?.name === company.name;

                return (
                  <button
                    key={company.type === 'existing' ? company._id : company.name}
                    type="button"
                    onClick={() => handleSelect(company)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    <span>{company.name}</span>

                    {isSelected && (
                      <Check className="h-4 w-4 text-brand-600" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {loading && (
            <div className="px-3 py-3 text-sm text-gray-500">
              Searching...
            </div>
          )}

          {showCreateOption && !loading && (
            <button
              type="button"
              onClick={() =>
                handleSelect({
                  type: "new",
                  name: debouncedInput.trim(),
                })
              }
              className="w-full border-t border-gray-100 px-3 py-3 text-left text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              Create "{debouncedInput.trim()}"
            </button>
          )}

          {!filteredCompanies.length && !showCreateOption && !loading && (
            <div className="px-3 py-3 text-sm text-gray-500">
              No companies found
            </div>
          )}
        </div>
      )}
    </div>
  );
}