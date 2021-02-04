import React from 'react';

export default function renderLinks(text) {
  const re = /(https?:\/\/[^\s]+)/g;
  let parts = text.split(re); // re is a matching regular expression
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = (
      <a key={'link' + i} href={parts[i]}>
        {parts[i]}
      </a>
    );
  }
  return parts;
}
