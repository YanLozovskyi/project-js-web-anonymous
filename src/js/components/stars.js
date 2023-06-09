// const empty = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>
// <defs>
// <linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
// <stop stop-color="#F84119"/>
// <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
// </linearGradient>
// </defs>
// </svg>`;

// const full = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="rgba(248, 65, 25, 1)" xmlns="http://www.w3.org/2000/svg">
// <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>
// <defs>
// <linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
// <stop stop-color="#F84119"/>
// <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
// </linearGradient>
// </defs>
// </svg>`;

// const half = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>
// <path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>
// <defs>
// <linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
// <stop stop-color="#F84119"/>
// <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
// </linearGradient>
// <linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">
// <stop stop-color="#F84119"/>
// <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
// </linearGradient>
// </defs>
// </svg>`;

// export { empty, full, half };

const emptyStarSVG = `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 6.3125H10.8281L9 0.6875L7.17188 6.3125H1.125L6.04688 9.6875L4.14844 15.3125L9 11.7969L13.8516 15.3125L11.9531 9.6875L16.875 6.3125Z" stroke="url(#paint0_linear_405_2071)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_405_2071" x1="3.375" y1="1.625" x2="13.5" y2="15.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

const fullStarSVG = `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.852 15.875C13.7336 15.8755 13.6181 15.8386 13.5219 15.7696L9.00048 12.4916L4.47903 15.7696C4.38243 15.8396 4.26606 15.8772 4.14673 15.8767C4.0274 15.8763 3.91129 15.8379 3.81521 15.7672C3.71912 15.6964 3.64803 15.5969 3.61221 15.4831C3.57639 15.3693 3.5777 15.247 3.61594 15.134L5.37938 9.91079L0.809069 6.77661C0.710073 6.7088 0.635356 6.61111 0.595836 6.49781C0.556316 6.3845 0.554063 6.26154 0.589407 6.14686C0.624751 6.03219 0.695839 5.93183 0.792285 5.86044C0.888732 5.78904 1.00548 5.75036 1.12548 5.75005H6.76384L8.4654 0.513525C8.50205 0.40047 8.57358 0.301931 8.6697 0.232043C8.76583 0.162156 8.88163 0.124512 9.00048 0.124512C9.11932 0.124512 9.23512 0.162156 9.33125 0.232043C9.42738 0.301931 9.4989 0.40047 9.53555 0.513525L11.2371 5.75181H16.8755C16.9956 5.75175 17.1126 5.79016 17.2094 5.86141C17.3061 5.93267 17.3775 6.03303 17.413 6.14778C17.4486 6.26254 17.4465 6.38568 17.407 6.49915C17.3675 6.61262 17.2928 6.71047 17.1936 6.77837L12.6216 9.91079L14.384 15.1325C14.4125 15.2171 14.4205 15.3072 14.4074 15.3955C14.3942 15.4837 14.3603 15.5676 14.3083 15.6401C14.2563 15.7127 14.1879 15.7718 14.1085 15.8127C14.0292 15.8535 13.9413 15.8749 13.852 15.875Z" fill="url(#paint0_linear_405_2062)"/>
<defs>
<linearGradient id="paint0_linear_405_2062" x1="2.62549" y1="1.25006" x2="13.8755" y2="16.2501" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

const halfStarSVG = `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 6.3125H10.8281L9 0.6875L7.17188 6.3125H1.125L6.04688 9.6875L4.14844 15.3125L9 11.7969L13.8516 15.3125L11.9531 9.6875L16.875 6.3125Z" stroke="url(#paint0_linear_405_2068)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_405_2068" x1="3.375" y1="1.625" x2="14.625" y2="15.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

export { halfStarSVG, fullStarSVG, emptyStarSVG };
