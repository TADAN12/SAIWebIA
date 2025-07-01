import React from 'react';

export function TabPanel({ children, active }) {
  if (!active) return null;
  return <div className="mt-6">{children}</div>;
}