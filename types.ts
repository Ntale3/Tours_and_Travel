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

export interface DestinationType{
id: number,
name: string,
location: string,
category: string,
image: string,
price: string,
rating: number,
reviews: number,
duration: string,
groupSize: string,
description: string,
highlights: string[],
bestTime: string
}

export interface categoryType
{
 id:string,  
 name:string,
 icon?:string

}