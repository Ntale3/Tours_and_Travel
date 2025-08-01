import Slider from "@/Components/Slider";

const destinations = [
        {
            id: 1,
            name: 'BALI',
            country: 'Indonesia',
            description: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beach-side city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.',
            image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            cardImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            rating: 4.8,
            reviews: '2.4k',
            price: '$1,299',
            duration: '7 days',
            gradient: 'from-teal-400 via-cyan-500 to-blue-600'
        },
        {
            id: 2,
            name: 'KERALA',
            country: 'India',
            description: 'Kerala, a state on India\'s tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It\'s known for its palm-lined beaches and backwaters, a network of canals. Inland are the Western Ghats, mountains whose slopes are home to tea, coffee and spice plantations as well as wildlife preserves.',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            cardImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            rating: 4.7,
            reviews: '1.8k',
            price: '$899',
            duration: '6 days',
            gradient: 'from-green-400 via-emerald-500 to-teal-600'
        },
        {
            id: 3,
            name: 'MALDIVES',
            country: 'Maldives',
            description: 'The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It\'s known for its beaches, blue lagoons and extensive reefs. The capital, Malé, has a busy fish market, restaurants and shops.',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            cardImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            rating: 4.9,
            reviews: '3.2k',
            price: '$2,199',
            duration: '5 days',
            gradient: 'from-blue-400 via-cyan-500 to-teal-600'
        },
        {
            id: 4,
            name: 'THAILAND',
            country: 'Thailand',
            description: 'Thailand is a Southeast Asian country known for tropical beaches, opulent royal palaces, ancient ruins and ornate temples displaying figures of Buddha. In Bangkok, the capital, an ultramodern cityscape rises next to quiet canalside communities.',
            image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            cardImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            rating: 4.6,
            reviews: '2.9k',
            price: '$1,099',
            duration: '8 days',
            gradient: 'from-orange-400 via-red-500 to-pink-600'
        }
    ];


export default function Home() {
    
  return (
    <div>

     <Slider destinations={destinations}/>


    </div>
  );
}
