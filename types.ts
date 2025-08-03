export interface GalleryImage {  
id: string;
src: string;
alt: string;
destination: string;
country: string;
rating: number;
reviewCount: number,
duration: string,
groupSize: string,
price: number,
category: string,
tags: string[],
description: string,
photographer: string,
featured: boolean
    
}

export interface FilterOption {
  value: string;
  label: string;
}
