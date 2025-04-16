'use client';

import { useState, useRef, useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';

export default function LanguageSelector() {
  const t = useTranslations('LanguageSelector');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'ko', label: t('ko') },
    { code: 'en', label: t('en') },
    { code: 'zh-CN', label: t('zh-CN') },
    { code: 'zh-TW', label: t('zh-TW') },
    { code: 'ja', label: t('ja') },
  ];

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language: string) => {
    const locale = language as Locale;
    setUserLocale(locale);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        className='flex items-center gap-1 px-4 py-2 border rounded-md'
        onClick={toggleDropdown}
      >
        {t('myLanguage')}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-10'>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className='block w-full text-left px-4 py-2 hover:bg-gray-100'
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
