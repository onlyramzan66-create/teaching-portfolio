"use client";

import React, { useState } from "react";
import { Settings, Sun, Moon, Monitor } from "lucide-react";

export default function SiteSettings({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  function setThemeValue(val: 'system'|'dark'|'light'){
    try{
      if(val==='system'){
        localStorage.removeItem('theme');
        document.cookie = 'theme=;path=/;max-age=0';
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        localStorage.setItem('theme', val);
        document.cookie = `theme=${val};path=/;max-age=${60*60*24*365}`;
        if(val==='dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
      setOpen(false);
    }catch(e){
      console.error(e);
    }
  }

  return (
    <div className={"relative " + (className||"")}> 
      <button aria-label="Site settings" onClick={()=>setOpen(!open)} className="inline-flex items-center justify-center rounded-full p-2 bg-white/5 hover:bg-white/10 transition">
        <Settings className="w-5 h-5 text-gray-300" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-neutral-900/80 border border-white/6 rounded-lg p-3 shadow-lg">
          <div className="text-sm text-gray-300 mb-2 font-medium flex items-center gap-2">Theme Preferences</div>
          <button onClick={()=>setThemeValue('system')} className="w-full text-left px-2 py-2 rounded hover:bg-white/5 flex items-center gap-2"> <Monitor className="w-4 h-4"/> System</button>
          <button onClick={()=>setThemeValue('dark')} className="w-full text-left px-2 py-2 rounded hover:bg-white/5 flex items-center gap-2"> <Moon className="w-4 h-4"/> Dark</button>
          <button onClick={()=>setThemeValue('light')} className="w-full text-left px-2 py-2 rounded hover:bg-white/5 flex items-center gap-2"> <Sun className="w-4 h-4"/> Light</button>
        </div>
      )}
    </div>
  );
}
