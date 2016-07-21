import React from 'react';

export default function TOCItem({link, title, level}) {
  return (
    <li className={level}>
      <a href={link}> {title} </a>
    </li>
  );
}
