'use client';

import { useEffect, useState } from "react";

export function useDomain(){
  const [domain, setDomain] = useState<string>('');

  useEffect(()=>{
    setDomain(window.location.origin);
  },[])

  return domain;
}