import React from 'react'

export default function CommentIcon({isSelected}) {
  return (
    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M13.2433 0.833328L16.5767 4.16666M16.5767 4.16666L13.2433 7.49999M16.5767 4.16666H4.90999C4.02594 4.16666 3.17809 4.51785 2.55297 5.14297C1.92785 5.76809 1.57666 6.61594 1.57666 7.49999V9.16666M4.90999 19.1667L1.57666 15.8333M1.57666 15.8333L4.90999 12.5M1.57666 15.8333H13.2433C14.1274 15.8333 14.9752 15.4821 15.6003 14.857C16.2255 14.2319 16.5767 13.384 16.5767 12.5V10.8333" 
        className={isSelected?
          "stroke-contrast-color" :
          "stroke-contrast-color-offset"
        }
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </svg>
  )
}
