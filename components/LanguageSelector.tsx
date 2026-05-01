"use client"

import { useEffect } from "react"
import { Globe } from "lucide-react"
import Script from "next/script"

export function LanguageSelector() {
  // Initialize Google Translate widget
  useEffect(() => {
    // @ts-ignore
    window.googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        // @ts-ignore
        { pageLanguage: "en", includedLanguages: "en,kn,hi", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      )
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-primary" />
      <div id="google_translate_element" className="overflow-hidden h-8 flex items-center"></div>
      
      {/* Global CSS to style the Google Translate widget and hide the top banner */}
      <style dangerouslySetInnerHTML={{__html: `
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0px !important;
          color: transparent !important;
        }
        .goog-te-gadget .goog-te-combo {
          font-size: 14px !important;
          color: var(--color-primary);
          background-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          font-weight: 500;
        }
        .goog-logo-link {
          display:none !important;
        }
        .goog-te-gadget img {
          display: none !important;
        }
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important; 
        }
      `}} />
      <Script 
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
        strategy="lazyOnload"
      />
    </div>
  )
}
