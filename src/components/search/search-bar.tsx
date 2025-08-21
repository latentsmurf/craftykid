"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  className?: string
  placeholder?: string
  defaultValue?: string
  onSearch?: (query: string) => void
  variant?: "default" | "navbar"
}

export function SearchBar({ 
  className, 
  placeholder = "Search for classes, instructors, or crafts...",
  defaultValue = "",
  onSearch,
  variant = "default"
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(defaultValue || searchParams.get("query") || "")
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        router.push(`/search?query=${encodeURIComponent(query)}`)
      }
    }
  }, [query, onSearch, router])

  const clearSearch = () => {
    setQuery("")
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <form 
      onSubmit={handleSearch} 
      className={cn(
        "relative",
        variant === "navbar" ? "w-full max-w-sm" : "w-full",
        className
      )}
    >
      <div className={cn(
        "relative flex items-center rounded-lg border transition-all duration-300",
        isFocused 
          ? "border-purple-500 ring-2 ring-purple-500/20 shadow-lg bg-white" 
          : "border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm",
        variant === "navbar" ? "h-9" : "h-12"
      )}>
        <Search className={cn(
          "absolute left-3 text-gray-400",
          variant === "navbar" ? "h-4 w-4" : "h-5 w-5"
        )} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
                  placeholder={placeholder}
        className={cn(
          "w-full bg-transparent outline-none",
          variant === "navbar" 
            ? "pl-9 pr-8 py-1.5 text-sm" 
            : "pl-10 pr-10 py-3 text-base sm:text-lg"
        )}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className={cn(
              "absolute right-3 text-gray-400 hover:text-gray-600",
              variant === "navbar" ? "p-0.5" : "p-1"
            )}
          >
            <X className={cn(
              variant === "navbar" ? "h-3.5 w-3.5" : "h-4 w-4"
            )} />
          </button>
        )}
      </div>
    </form>
  )
}
