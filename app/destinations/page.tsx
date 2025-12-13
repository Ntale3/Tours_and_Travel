'use client'
import DestinationsPage from '@/components/destination-components/DestinationsPage';
import { fetchDestinations,$destinationStore } from '@/store/destinations.store';
import React from 'react';

export default function Page() {
  const {isLoading} =$destinationStore.get();

  React.useEffect(()=>{
      const fetchAllDestinatins=async ()=>{
        await fetchDestinations()
        console.log("is Fetching........")
       }
       fetchAllDestinatins()
    },[isLoading])


  return <DestinationsPage />;
}