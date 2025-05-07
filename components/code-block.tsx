'use client';

import { useEffect, useState } from 'react';
import * as shiki from 'shiki';
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  title?: string;
}

export function CodeBlock({ code, language: initialLanguage, showLineNumbers = true, title }: CodeBlockProps) {
  const [html, setHtml] = useState('');
  const [language] = useState(initialLanguage);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    shiki.createHighlighter({
      themes: ['github-light', 'dracula'],
      langs: [language as shiki.BundledLanguage]
    }).then((highlighter: shiki.Highlighter) => {
      const highlighted = highlighter.codeToHtml(code, {
        lang: language as shiki.BundledLanguage,
        theme: theme === 'dark' ? 'dracula' : 'github-light',
        ...(showLineNumbers && { lineOptions: { line: true } })
      });
      setHtml(highlighted);
    });
  }, [code, language, showLineNumbers, theme]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          {title && <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-4">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div
        className={`overflow-x-auto p-4 text-sm bg-white dark:bg-zinc-950 ${showLineNumbers ? 'line-numbers' : ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
} 