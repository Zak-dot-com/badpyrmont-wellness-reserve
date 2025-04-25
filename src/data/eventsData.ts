
export type Event = {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  price: number;
  earlyBirdPrice: number;
  earlyBirdEndDate: string;
  location: string;
  category: 'party' | 'carnival' | 'concert';
};

export const events: Event[] = [
  {
    id: 'summer-carnival-2025',
    title: "Summer Carnival 2025",
    date: "2025-07-15",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    description: "Experience the vibrant colors and rhythms of our annual Summer Carnival. Featuring live performances, parades, and international cuisine.",
    price: 149,
    earlyBirdPrice: 99,
    earlyBirdEndDate: "2025-05-15",
    location: "Grand Garden & Main Hall",
    category: 'carnival'
  },
  {
    id: 'nye-gala-2025',
    title: "New Year's Eve Gala 2025",
    date: "2025-12-31",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    description: "Welcome 2026 in style at our spectacular New Year's Eve Gala. Featuring gourmet dining, live entertainment, and midnight fireworks.",
    price: 299,
    earlyBirdPrice: 199,
    earlyBirdEndDate: "2025-10-31",
    location: "Grand Ballroom",
    category: 'party'
  }
];
