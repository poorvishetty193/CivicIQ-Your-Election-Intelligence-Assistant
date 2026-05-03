"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

type NewsItem = {
  title: string;
  summary: string;
  source: string;
  url: string;
};

const CACHE_KEY = "civiciq_news_cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function LiveNewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      // Check sessionStorage cache first
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data) && data.length > 0) {
            setNews(data);
            setLoading(false);
            return;
          }
        }
      } catch {
        // ignore parse errors
      }

      // Fetch fresh data
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-6">
        <div className="flex items-center gap-2 mb-4 px-4">
          <span className="flex items-center gap-1 text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500" /> LIVE
          </span>
          <h3 className="text-xl font-bold">Election Intelligence Feed</h3>
        </div>
        {/* Skeleton cards */}
        <div className="flex gap-4 px-4 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[280px] md:min-w-[320px] bg-surface border border-primary/10 rounded-xl p-5 animate-pulse shrink-0">
              <div className="h-3 w-16 bg-primary/10 rounded-full mb-3" />
              <div className="h-4 w-full bg-primary/10 rounded-full mb-2" />
              <div className="h-4 w-3/4 bg-primary/10 rounded-full mb-4" />
              <div className="h-3 w-full bg-primary/10 rounded-full mb-1" />
              <div className="h-3 w-5/6 bg-primary/10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || news.length === 0) return null;

  return (
    <div className="w-full py-6">
      <div className="flex items-center gap-2 mb-4 px-4">
        <span className="flex items-center gap-1 text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> LIVE
        </span>
        <h3 className="text-xl font-bold">Election Intelligence Feed</h3>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 px-4 snap-x snap-mandatory hide-scrollbar">
        {news.map((item, i) => {
          const safeUrl = typeof item.url === 'string' && (item.url.startsWith('http://') || item.url.startsWith('https://'))
            ? item.url
            : 'https://www.vote.org';

          return (
            <a
              key={i}
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[280px] md:min-w-[320px] bg-surface border border-primary/10 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-accent/50 transition-all snap-start flex flex-col group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-primary/50 uppercase tracking-wider">{item.source}</span>
                <ExternalLink className="w-4 h-4 text-primary/30 group-hover:text-accent transition-colors shrink-0" />
              </div>
              <h4 className="font-bold text-base mb-2 line-clamp-2 leading-tight">{item.title}</h4>
              <p className="text-sm text-primary/70 line-clamp-3 mt-auto">{item.summary}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
