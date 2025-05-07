'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { NavigationItem } from '@/app/utils/navigation'

interface DocPaginationProps {
  prevPage?: NavigationItem
  nextPage?: NavigationItem
}

export function DocPagination({ prevPage, nextPage }: DocPaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-4 py-6 sm:px-6">
      <div className="flex flex-1">
        {prevPage ? (
          <Link
            href={prevPage.href}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <ChevronLeft className="mr-3 h-5 w-5" />
            <span className="flex flex-col items-start">
              <span className="text-xs text-gray-500 dark:text-gray-400">Anterior</span>
              <span>{prevPage.label}</span>
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div className="flex flex-1 justify-end">
        {nextPage ? (
          <Link
            href={nextPage.href}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <span className="flex flex-col items-end">
              <span className="text-xs text-gray-500 dark:text-gray-400">Próximo</span>
              <span>{nextPage.label}</span>
            </span>
            <ChevronRight className="ml-3 h-5 w-5" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
} 