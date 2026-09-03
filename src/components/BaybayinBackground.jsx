import React from 'react';

/*
 * Accurate Baybayin (Tagalog) script characters.
 *
 * Independent vowels:  ᜀ (a)   ᜁ (i/e)   ᜂ (o/u)
 *
 * Consonants (inherent /a/ vowel):
 *   ᜃ (ka)  ᜄ (ga)  ᜅ (nga)  ᜆ (ta)  ᜇ (da/ra)
 *   ᜈ (na)  ᜉ (pa)  ᜊ (ba)   ᜋ (ma)  ᜌ (ya)
 *   ᜎ (la)  ᜏ (wa)  ᜐ (sa)   ᜑ (ha)
 *
 * Vowel diacritics (kudlit):
 *   ᜒ  (i/e kudlit — above)
 *   ᜓ  (o/u kudlit — below)
 */

const rows = [
  'ᜀ   ᜁ   ᜂ   ᜃ   ᜄ   ᜅ   ᜆ   ᜇ   ᜈ   ᜉ   ᜊ   ᜋ   ᜌ   ᜎ   ᜏ   ᜐ   ᜑ',
  'ᜃᜒ   ᜄᜒ   ᜆᜒ   ᜇᜒ   ᜈᜒ   ᜉᜒ   ᜊᜒ   ᜋᜒ   ᜌᜒ   ᜎᜒ   ᜏᜒ   ᜐᜒ   ᜑᜒ   ᜀ   ᜁ   ᜂ',
  'ᜃᜓ   ᜄᜓ   ᜆᜓ   ᜇᜓ   ᜈᜓ   ᜉᜓ   ᜊᜓ   ᜋᜓ   ᜌᜓ   ᜎᜓ   ᜏᜓ   ᜐᜓ   ᜑᜓ   ᜃ   ᜉ   ᜋ',
  'ᜃ   ᜎ   ᜌ   ᜀ   ᜈ   ᜊ   ᜌ   ᜈ   ᜆ   ᜐ   ᜋ   ᜑ   ᜉ   ᜄ   ᜇ   ᜏ   ᜅ',
  'ᜁ   ᜐ   ᜃ   ᜂ   ᜋ   ᜆ   ᜀ   ᜊ   ᜑ   ᜈ   ᜌ   ᜎ   ᜇ   ᜉ   ᜏ   ᜄ   ᜅ',
  'ᜑ   ᜐ   ᜏ   ᜎ   ᜌ   ᜋ   ᜊ   ᜉ   ᜈ   ᜇ   ᜆ   ᜅ   ᜄ   ᜃ   ᜂ   ᜁ   ᜀ',
  'ᜎᜒ   ᜃᜒ   ᜉᜒ   ᜋᜒ   ᜐᜒ   ᜆᜒ   ᜊᜒ   ᜑᜒ   ᜇᜒ   ᜈᜒ   ᜌᜒ   ᜏᜒ   ᜄᜒ   ᜀ   ᜁ   ᜂ',
  'ᜏᜓ   ᜋᜓ   ᜃᜓ   ᜑᜓ   ᜈᜓ   ᜉᜓ   ᜆᜓ   ᜎᜓ   ᜊᜓ   ᜐᜓ   ᜇᜓ   ᜌᜓ   ᜄᜓ   ᜃ   ᜋ   ᜐ',
];

// Repeat many times so the drift animation has enough content to scroll
const allRows = [...rows, ...rows, ...rows, ...rows, ...rows, ...rows];

export default function BaybayinBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          fontFamily: "'Noto Sans Tagalog', serif",
          fontSize: '56px',
          lineHeight: '2',
          letterSpacing: '0.3em',
          color: '#7a6a4a',
          opacity: 0.12,
          whiteSpace: 'pre',
          animation: 'baybayin-drift 80s linear infinite',
        }}
      >
        {allRows.map((row, i) => (
          <div key={i}>{row}</div>
        ))}
      </div>
    </div>
  );
}
