export const BUSINESS_CATEGORIES = [
  { id: 'shops', label: 'Businesses & Shops', description: 'Retail stores, clothing, electronics & commercial outlets' },
  { id: 'restaurants', label: 'Restaurants, Food & Cafés', description: 'Malabar dining, cafes, bakeries & food stalls' },
  { id: 'tourism', label: 'Tourism & Places', description: 'Destinations, heritage sites, tours & attractions' },
  { id: 'accommodation', label: 'Accommodation & Stays', description: 'Hotels, homestays, resorts & serviced apartments' },
  { id: 'real_estate', label: 'Real Estate & Property', description: 'Agents, developers, commercial rent & residential spaces' },
  { id: 'jobs', label: 'Jobs & Careers', description: 'Cyberpark tech firms, local business hiring & employers' },
  { id: 'education', label: 'Education & Learning', description: 'Institutions, coaching, academies & skill centers' },
  { id: 'events', label: 'Events & Community', description: 'Cultural fests, exhibitions, sports & local gatherings' },
  { id: 'services', label: 'Local Services', description: 'Home repairs, legal, accounting, auto & professional help' },
  { id: 'products', label: 'Products & Buy/Sell', description: 'Pre-owned goods, crafts, trade & local marketplace' },
  { id: 'other', label: 'Other Business / Service', description: 'Other specialized businesses in Calicut' },
] as const;

export const CALICUT_LOCATIONS = [
  'SM Street (Mittai Theruvu)',
  'Mavoor Road',
  'Calicut Beach',
  'Calicut Cyberpark / Kinfra',
  'Palayam',
  'Hilite City / Thondayad',
  'Mananchira',
  'Nadakkavu',
  'Medical College',
  'Chevayur / Kovoor',
  'Kallai',
  'Elathur',
  'Feroke',
  'Pantheerankavu',
  'Ramanattukara',
  'Vatakara',
  'Koyilandy',
  'Other Area in Calicut',
] as const;

export const WHO_CAN_REGISTER = [
  {
    title: 'Retail Shops & Local Stores',
    description: 'Footwear, textiles, electronics, supermarkets, and neighborhood stores across Calicut.',
    icon: 'Store',
  },
  {
    title: 'Restaurants, Cafés & Bakeries',
    description: 'Authentic Malabar eateries, modern specialty coffee spots, bakeries, and cloud kitchens.',
    icon: 'Utensils',
  },
  {
    title: 'Freelancers & Independent Pros',
    description: 'Designers, developers, photographers, tutors, and specialized independent professionals.',
    icon: 'UserCheck',
  },
  {
    title: 'Home & Specialized Services',
    description: 'Plumbing, electrical, automotive mechanics, beauty, wellness, and on-demand maintenance.',
    icon: 'Wrench',
  },
  {
    title: 'Tourism & Accommodation',
    description: 'Hotels, beachside homestays, tour operators, and experiential travel guides in Calicut.',
    icon: 'Compass',
  },
  {
    title: 'Education & Training Institutes',
    description: 'Coaching centers, academies, language schools, and vocational training facilities.',
    icon: 'GraduationCap',
  },
  {
    title: 'Property & Real Estate Businesses',
    description: 'Brokers, builders, rental management, and commercial leasing specialists.',
    icon: 'Building2',
  },
  {
    title: 'Other Local Businesses & Services',
    description: 'Any legitimate local business or emerging venture operating in and serving Calicut.',
    icon: 'Briefcase',
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Submit Your Details',
    description: 'Complete the short, straightforward registration form with your business name and primary contact number.',
  },
  {
    number: '02',
    title: 'LiveCalicut Reviews Your Submission',
    description: 'Our local team verifies your business details and contacts you if additional context is needed.',
  },
  {
    number: '03',
    title: 'Move Forward with Your Listing',
    description: 'Our team guides you through the applicable listing process, verification standards, and next steps for your profile.',
  },
] as const;

export const FAQS = [
  {
    question: 'Is business registration free?',
    answer: 'Yes, submitting this registration form is 100% free. If your business wishes to explore optional paid promotional or advertising services in the future, our team will provide clear details on those options.',
  },
  {
    question: 'Who can register?',
    answer: 'Any legitimate business, service provider, professional, or local merchant operating in or serving Calicut can submit their registration for review.',
  },
  {
    question: 'What happens after I submit the form?',
    answer: 'The LiveCalicut team reviews your submission details to verify location and category. A team member will then contact you via phone or WhatsApp with the next steps.',
  },
  {
    question: 'Will my business be published immediately?',
    answer: 'No. Submission does not constitute an automatic guarantee of immediate publication. Each entry is reviewed to maintain quality, authenticity, and trust across the platform.',
  },
  {
    question: 'Can I register without a website?',
    answer: 'Absolutely. A website or social media URL is completely optional. Many local shops and services only have a physical store or contact number, and that is completely fine.',
  },
  {
    question: 'How can I promote my business further?',
    answer: 'You are welcome to speak with the LiveCalicut team regarding optional promotional opportunities, featured visibility, and spotlight campaigns once your initial registration is verified.',
  },
  {
    question: 'How will my contact information be used?',
    answer: 'Your information is used solely by the LiveCalicut team to review your registration and follow up regarding your business profile, in strict accordance with our Privacy Policy. We never sell your data.',
  },
] as const;

export const LIVECALICUT_WHATSAPP = {
  raw: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919539980990',
  display: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || '+91 95399 80990',
  getLink: (message?: string) => {
    const rawNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919539980990').replace(/[^0-9]/g, '');
    const defaultMsg =
      message ||
      'Hello LiveCalicut team, I would like to register my business / get assistance with listing on LiveCalicut.';
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(defaultMsg)}`;
  },
};

export const LIVECALICUT_PHONE = {
  raw: '04952928095',
  display: '0495 2928095',
  telLink: 'tel:04952928095',
};

export const LIVECALICUT_ADDRESS = {
  line1: 'M-7 63/345, Begum Complex',
  line2: 'UKS Road, Calicut',
  stateAndPin: 'Kerala, 673001, India',
  full: 'M-7 63/345, Begum Complex, UKS Road, Calicut, Kerala, 673001, India',
  googleMapsUrl: 'https://maps.google.com/?q=Begum+Complex+UKS+Road+Calicut+Kerala+673001',
};

