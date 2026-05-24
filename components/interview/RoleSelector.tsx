'use client';

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Check } from 'lucide-react';

import { RoleOption } from '@/types/interviewTypes';
import api from '@/lib/api';
import { ApiError } from '@/types/apiTypes';

type RoleSelectorProps = {
  value: RoleOption | null;
  onChange: (role: RoleOption) => void;
};


export default function RoleSelector({
  value,
  onChange,
}: RoleSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [roles, setRoles] = useState<RoleOption[]>([]);

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value?.title) {
      setInputValue(value.title);
    }
  }, [value]);

   useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);

    return () => clearTimeout(timer);

  }, [inputValue]);

  // Filter roles
  useEffect(() => {

    if (debouncedValue.trim().length < 2) {
      setRoles([]);
      return;
    }

    const controller = new AbortController();

    const searchRoles = async () => {

      try {

        setLoading(true);

        const response = await api.get('/roles/search', {
          params: {
            q: debouncedValue,
          },
          signal: controller.signal,
        });

        const mappedRoles: RoleOption[] = response.data.data.map(
          (role: any) => ({
            type: 'existing',
            _id: role._id,
            title: role.title,
            slug: role.slug,
            category: role.category,
          })
        );

        setRoles(mappedRoles);

      } 
      catch(error:any) {
        console.error("Failed to fetch companies:", error.message);
      }
      finally {
        setLoading(false);
      }
    };

    searchRoles();

    return () => {
      controller.abort();
    };

  }, [debouncedValue]);

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

    const handleSelect = (role: RoleOption) => {
        onChange(role);
        setInputValue(role.title);
        setIsOpen(false);
  };

  const showCreateOption =
    debouncedValue.trim() &&
    !roles.some(
      (role) =>
        role.title.toLowerCase() ===
        debouncedValue.trim().toLowerCase()
    );

  return (
    <div className="relative" ref={wrapperRef}>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        Role
      </label>

      <div className="relative">

        <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search role..."
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

          {!loading && roles.length > 0 && (
            <div className="p-1">

              {roles.map((role) => {

                const isSelected =
                  value?.type === 'existing' &&
                  role.type === 'existing' &&
                  value._id === role._id;

                return (
                  <button
                    key={
                      role.type === 'existing'
                        ? role._id
                        : role.title
                    }
                    type="button"
                    onClick={() => handleSelect(role)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-gray-100"
                  >

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {role.title}
                      </p>

                      {role.type === 'existing' &&
                        role.category && (
                          <p className="text-xs text-gray-500 capitalize">
                            {role.category}
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

          {!loading && showCreateOption && (
            <button
              type="button"
              onClick={() => {

                const newRole: RoleOption = {
                  type: 'new',
                  title: inputValue.trim(),
                };

                onChange(newRole);

                setInputValue(inputValue.trim());

                setIsOpen(false);
              }}
              className="w-full border-t border-gray-100 px-3 py-3 text-left text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              Create "{inputValue.trim()}"
            </button>
          )}

          {!loading &&
            roles.length === 0 &&
            !showCreateOption && (
              <div className="px-3 py-3 text-sm text-gray-500">
                No roles found
              </div>
            )}
        </div>
      )}
    </div>
  );
}