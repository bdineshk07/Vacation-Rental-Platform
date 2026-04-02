import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Search, Globe, Menu, Heart, Star, 
  ChevronRight, ChevronLeft, User, X, Plus, Minus
} from 'lucide-react';

// --- Mock Data ---
const HYDERABAD_HOMES = [
  { id: 'h1', title: 'Flat in Hyderabad', price: '₹6,288 for 2 nights', rating: 5.0, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'h2', title: 'Flat in Kondapur', price: '₹8,936 for 2 nights', rating: 4.91, image: 'https://images.unsplash.com/photo-1502672260266-1c1e52409818?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'h3', title: 'Boutique hotel in Hyderabad', price: '₹5,481 for 2 nights', rating: 4.86, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'h4', title: 'Flat in Hyderabad', price: '₹6,619 for 2 nights', rating: 5.0, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'h5', title: 'Villa in Jubilee Hills', price: '₹22,500 for 2 nights', rating: 4.98, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
];

const BENGALURU_HOMES = [
  { id: 'b1', title: 'Flat in Bengaluru', price: '₹5,706 for 2 nights', rating: 5.0, image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=800&q=80', guestFavourite: false },
  { id: 'b2', title: 'Home in Raja Rajeshwari Nagar', price: '₹8,103 for 2 nights', rating: 4.86, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'b3', title: 'Villa in JP Nagar', price: '₹12,550 for 2 nights', rating: 4.99, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'b4', title: 'Flat in Domlur', price: '₹18,981 for 2 nights', rating: 4.88, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'b5', title: 'Penthouse in Indiranagar', price: '₹15,200 for 2 nights', rating: 4.92, image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
];

const EXPERIENCES = [
  { id: 'e1', title: 'Authentic Indian Cooking Class', price: 'From ₹1,500 / person', rating: 4.95, image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'e2', title: 'Old City Heritage Walk', price: 'From ₹800 / person', rating: 4.8, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'e3', title: 'Pottery Workshop', price: 'From ₹1,200 / person', rating: 4.9, image: 'https://images.unsplash.com/photo-1610719936287-6c2ab2083276?auto=format&fit=crop&w=800&q=80', guestFavourite: false },
  { id: 'e4', title: 'Local Food Tasting Tour', price: 'From ₹2,000 / person', rating: 5.0, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'e5', title: 'Yoga & Meditation Retreat', price: 'From ₹1,800 / person', rating: 4.85, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', guestFavourite: false },
];

const OUTDOOR_EXPERIENCES = [
  { id: 'o1', title: 'Sunrise Trekking', price: 'From ₹1,000 / person', rating: 4.9, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'o2', title: 'Kayaking Adventure', price: 'From ₹2,500 / person', rating: 4.7, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', guestFavourite: false },
  { id: 'o3', title: 'Mountain Biking Trail', price: 'From ₹1,800 / person', rating: 4.8, image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 'o4', title: 'Wildlife Safari', price: 'From ₹4,000 / person', rating: 4.95, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
];

const SERVICES = [
  { id: 's1', title: 'Premium Airport Transfer', price: 'From ₹1,200', rating: 4.9, image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 's2', title: 'Professional House Cleaning', price: 'From ₹900', rating: 4.8, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 's3', title: 'Vacation Photography', price: 'From ₹3,500', rating: 5.0, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', guestFavourite: false },
  { id: 's4', title: 'In-house Spa & Massage', price: 'From ₹2,500', rating: 4.95, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80', guestFavourite: true },
  { id: 's5', title: 'Private Chef', price: 'From ₹4,000', rating: 4.85, image: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?auto=format&fit=crop&w=800&q=80', guestFavourite: false },
];

const ALL_LISTINGS = [...HYDERABAD_HOMES, ...BENGALURU_HOMES, ...EXPERIENCES, ...OUTDOOR_EXPERIENCES, ...SERVICES];

// --- Reusable Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5"/></button>
          <h2 className="font-semibold text-lg">{title}</h2>
          <div className="w-9"></div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Main Components ---

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full px-6 md:px-10 py-4 flex justify-between items-center bg-white relative z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-[#ff385c] cursor-pointer hover:opacity-90 transition-opacity">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0"/>
            <path d="M12.004 2C6.48 2 2 6.47 2 11.99c0 5.52 4.48 10.01 10.004 10.01C17.52 22 22 17.51 22 11.99 22 6.47 17.52 2 12.004 2zm0 18.01c-4.41 0-7.994-3.58-7.994-8.01S7.594 4 12.004 4c4.41 0 7.996 3.58 7.996 8.01s-3.586 8.01-7.996 8.01z" fill="currentColor"/>
            <path d="M12 11.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/>
            <path d="M12 6c-2.76 0-5 2.24-5 5v2.5c0 1.38 1.12 2.5 2.5 2.5h5c1.38 0 2.5-1.12 2.5-2.5V11c0-2.76-2.24-5-5-5zm3.5 7.5c0 .28-.22.5-.5.5h-5c-.28 0-.5-.22-.5-.5V11c0-1.65 1.35-3 3-3s3 1.35 3 3v2.5z" fill="currentColor"/>
          </svg>
          <span className="text-xl font-bold tracking-tight hidden lg:block">airbnb</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link to="/" className={isActive('/') ? 'text-gray-900 font-semibold' : 'hover:text-gray-900 transition-colors'}>Homes</Link>
          <Link to="/experiences" className={isActive('/experiences') ? 'text-gray-900 font-semibold' : 'hover:text-gray-900 transition-colors'}>Experiences</Link>
          <Link to="/services" className={isActive('/services') ? 'text-gray-900 font-semibold' : 'hover:text-gray-900 transition-colors'}>Services</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button onClick={() => setIsHostModalOpen(true)} className="hidden md:block text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
            Become a host
          </button>
          <button onClick={() => setIsLangModalOpen(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Globe className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
              className="flex items-center gap-2 border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              <Menu className="w-5 h-5 text-gray-700" />
              <div className="bg-gray-500 text-white rounded-full p-1">
                <User className="w-5 h-5" />
              </div>
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer font-semibold transition-colors">Sign up</div>
                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors">Log in</div>
                <hr className="my-2 border-gray-200" />
                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => {setIsUserMenuOpen(false); setIsHostModalOpen(true);}}>Airbnb your home</div>
                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors">Host an experience</div>
                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors">Help Centre</div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Host Modal */}
      <Modal isOpen={isHostModalOpen} onClose={() => setIsHostModalOpen(false)} title="Become a Host">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 text-[#ff385c]">Airbnb it.</h1>
          <p className="text-xl text-gray-600 mb-8">You could earn ₹15,000 / night by hosting your space.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-[#ff385c] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d90b3e] transition-colors">
              Get Started
            </button>
            <button className="border border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors" onClick={() => setIsHostModalOpen(false)}>
              Learn More
            </button>
          </div>
        </div>
      </Modal>

      {/* Language Modal */}
      <Modal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} title="Language and region">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 border border-gray-900 rounded-lg cursor-pointer">
            <div className="font-medium">English</div>
            <div className="text-sm text-gray-500">India</div>
          </div>
          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <div className="font-medium">English</div>
            <div className="text-sm text-gray-500">United States</div>
          </div>
          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <div className="font-medium">Español</div>
            <div className="text-sm text-gray-500">España</div>
          </div>
          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <div className="font-medium">Français</div>
            <div className="text-sm text-gray-500">France</div>
          </div>
          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <div className="font-medium">Deutsch</div>
            <div className="text-sm text-gray-500">Deutschland</div>
          </div>
          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <div className="font-medium">日本語</div>
            <div className="text-sm text-gray-500">日本</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [guests, setGuests] = useState(0);
  const [location, setLocation] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Searching for: ${location || 'Anywhere'}, Guests: ${guests}`);
    setActiveTab(null);
  };

  return (
    <div className="w-full max-w-[850px] mx-auto mt-4 mb-12 px-4 relative z-40" ref={searchRef}>
      <div className={`flex flex-col md:flex-row items-center bg-white rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.1)] border border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200 transition-colors ${activeTab ? 'bg-gray-100' : ''}`}>
        
        <div 
          onClick={() => setActiveTab('where')}
          className={`flex-1 w-full px-8 py-3 rounded-t-full md:rounded-l-full md:rounded-tr-none cursor-pointer transition-all ${activeTab === 'where' ? 'bg-white shadow-lg rounded-full scale-105' : 'hover:bg-gray-100'}`}
        >
          <div className="text-xs font-bold text-gray-900">Where</div>
          <input 
            type="text" 
            placeholder="Search destinations" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-gray-600 placeholder:text-gray-400 outline-none"
          />
        </div>

        <div 
          onClick={() => setActiveTab('when')}
          className={`flex-1 w-full px-8 py-3 cursor-pointer transition-all ${activeTab === 'when' ? 'bg-white shadow-lg rounded-full scale-105' : 'hover:bg-gray-100'}`}
        >
          <div className="text-xs font-bold text-gray-900">When</div>
          <div className="text-sm text-gray-400">Add dates</div>
        </div>

        <div 
          onClick={() => setActiveTab('who')}
          className={`flex-1 w-full pl-8 pr-2 py-2 rounded-b-full md:rounded-r-full md:rounded-bl-none cursor-pointer transition-all flex justify-between items-center ${activeTab === 'who' ? 'bg-white shadow-lg rounded-full scale-105' : 'hover:bg-gray-100'}`}
        >
          <div>
            <div className="text-xs font-bold text-gray-900">Who</div>
            <div className={`text-sm ${guests > 0 ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
              {guests > 0 ? `${guests} guest${guests > 1 ? 's' : ''}` : 'Add guests'}
            </div>
          </div>
          <button 
            onClick={handleSearch} 
            className="bg-[#ff385c] hover:bg-[#d90b3e] text-white p-3.5 rounded-full transition-colors shadow-md flex items-center gap-2"
          >
            <Search className="w-5 h-5" strokeWidth={3} />
            {activeTab && <span className="pr-2 font-semibold hidden sm:block">Search</span>}
          </button>
        </div>
      </div>

      {/* Dropdowns */}
      {activeTab === 'where' && (
        <div className="absolute left-0 top-full mt-4 w-full md:w-96 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 z-50">
          <div className="text-xs font-bold text-gray-900 mb-4 uppercase">Suggested destinations</div>
          <div className="space-y-2">
            {['Goa', 'Mumbai', 'Delhi', 'Bangalore', 'Kerala'].map(dest => (
              <div 
                key={dest} 
                onClick={() => { setLocation(dest); setActiveTab('when'); }}
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="bg-gray-100 p-3 rounded-lg"><Globe className="w-5 h-5 text-gray-600" /></div>
                <span className="text-gray-700">{dest}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'when' && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-full md:w-[400px] bg-white rounded-3xl shadow-xl border border-gray-200 p-6 z-50 text-center">
          <div className="font-semibold text-lg mb-4">Select dates</div>
          <div className="grid grid-cols-7 gap-2 text-sm">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-gray-400 font-medium">{d}</div>)}
            {Array.from({length: 31}).map((_, i) => (
              <div 
                key={i} 
                onClick={() => setActiveTab('who')}
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'who' && (
        <div className="absolute right-0 top-full mt-4 w-full md:w-96 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 z-50">
          <div className="flex justify-between items-center py-4 border-b border-gray-100">
            <div>
              <div className="font-semibold text-gray-900">Adults</div>
              <div className="text-sm text-gray-500">Ages 13 or above</div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); setGuests(Math.max(0, guests - 1)); }}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-4 text-center">{guests}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PropertyCard = ({ property }: { property: any }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div className="min-w-[280px] md:min-w-[300px] snap-start flex flex-col gap-3 group cursor-pointer" onClick={() => navigate(`/listing/${property.id}`)}>
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {property.guestFavourite && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-md text-gray-900">
            Guest favourite
          </div>
        )}
        <button 
          onClick={handleLike}
          className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform z-10"
        >
          <Heart className={`w-6 h-6 ${liked ? 'fill-[#ff385c] text-[#ff385c]' : ''}`} />
        </button>
      </div>
      
      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
        <div className="text-gray-500 text-sm mt-0.5 flex items-center gap-1">
          {property.price} • <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900 inline pb-0.5" /> {property.rating}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, items }: { title: string, items: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1920px] mx-auto px-6 md:px-10 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2 cursor-pointer hover:underline">
          {title} <ChevronRight className="w-5 h-5 mt-1" />
        </h2>
        <div className="hidden md:flex gap-2">
          <button onClick={() => scroll('left')} className="p-2 rounded-full border border-gray-300 hover:shadow-md transition-all bg-white text-gray-400 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll('right')} className="p-2 rounded-full border border-gray-300 hover:shadow-md transition-all bg-white text-gray-900">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex overflow-x-auto gap-6 snap-x hide-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
        {items.map(item => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 mt-12 pt-12 pb-8">
    <div className="max-w-[1920px] mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-200 pb-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Help Centre</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
            <li><a href="#" className="hover:underline">Cancellation options</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Hosting</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
            <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Airbnb</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">New features</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <div className="flex flex-wrap items-center gap-2">
          <span>© 2024 Airbnb, Inc.</span>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Terms</a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Sitemap</a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Company details</a>
        </div>
        <div className="flex items-center gap-4 font-medium text-gray-900">
          <button className="flex items-center gap-1 hover:underline">
            <Globe className="w-4 h-4" /> English (IN)
          </button>
          <button className="hover:underline">₹ INR</button>
        </div>
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <>
    <Section title="Popular homes in Hyderabad" items={HYDERABAD_HOMES} />
    <Section title="Available next month in Bengaluru" items={BENGALURU_HOMES} />
  </>
);

const ExperiencesPage = () => (
  <>
    <Section title="Top experiences in your area" items={EXPERIENCES} />
    <Section title="Outdoor adventures" items={OUTDOOR_EXPERIENCES} />
  </>
);

const ServicesPage = () => (
  <>
    <Section title="Premium services for your trip" items={SERVICES} />
  </>
);

const ListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = ALL_LISTINGS.find(p => p.id === id);

  if (!property) {
    return (
      <div className="max-w-[1920px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
        <button onClick={() => navigate('/')} className="text-[#ff385c] hover:underline font-medium">Return to Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 hover:underline text-gray-600 font-medium">
        <ChevronLeft className="w-5 h-5" /> Back
      </button>
      
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">{property.title}</h1>
      
      <div className="flex items-center gap-4 text-sm text-gray-900 font-medium mb-6">
        <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-gray-900" /> {property.rating}</span>
        <span className="underline cursor-pointer">128 reviews</span>
        <span>·</span>
        <span className="underline cursor-pointer">Superhost</span>
        <span>·</span>
        <span className="underline cursor-pointer">Location, City</span>
      </div>

      <div className="aspect-video md:aspect-[21/9] w-full rounded-2xl overflow-hidden mb-10 bg-gray-200">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col md:flex-row gap-12 relative">
        <div className="flex-1">
          <div className="flex justify-between items-start pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Entire place hosted by Host</h2>
              <p className="text-gray-600">4 guests · 2 bedrooms · 2 beds · 1 bathroom</p>
            </div>
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white overflow-hidden">
              <User className="w-8 h-8 text-gray-400 mt-2" />
            </div>
          </div>

          <div className="py-6 border-b border-gray-200 space-y-6">
            <div className="flex gap-4">
              <Star className="w-6 h-6 text-gray-900" />
              <div>
                <h3 className="font-semibold text-gray-900">Highly rated Host</h3>
                <p className="text-gray-500 text-sm">Guests highly rate this host for their hospitality.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Globe className="w-6 h-6 text-gray-900" />
              <div>
                <h3 className="font-semibold text-gray-900">Great location</h3>
                <p className="text-gray-500 text-sm">100% of recent guests gave the location a 5-star rating.</p>
              </div>
            </div>
          </div>

          <div className="py-6">
            <h2 className="text-xl font-semibold mb-4">About this space</h2>
            <p className="text-gray-700 leading-relaxed">
              Enjoy a comfortable and relaxing stay in this beautifully designed space. 
              Perfectly situated to give you access to the best local attractions while providing a quiet retreat. 
              Equipped with all the essential amenities you need for a memorable trip.
            </p>
          </div>
        </div>

        {/* Sticky Booking Widget */}
        <div className="w-full md:w-[350px] lg:w-[400px]">
          <div className="border border-gray-200 rounded-2xl p-6 shadow-xl sticky top-28 bg-white">
            <div className="text-2xl font-semibold mb-6">{property.price}</div>
            
            <div className="border border-gray-400 rounded-xl mb-4 overflow-hidden">
              <div className="flex border-b border-gray-400">
                <div className="flex-1 p-3 border-r border-gray-400">
                  <div className="text-[10px] font-bold uppercase">Check-in</div>
                  <div className="text-sm">Add date</div>
                </div>
                <div className="flex-1 p-3">
                  <div className="text-[10px] font-bold uppercase">Checkout</div>
                  <div className="text-sm">Add date</div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-[10px] font-bold uppercase">Guests</div>
                <div className="text-sm">1 guest</div>
              </div>
            </div>

            <button className="w-full bg-[#ff385c] text-white py-3.5 rounded-lg font-semibold hover:bg-[#d90b3e] transition-colors mb-4">
              Reserve
            </button>
            <div className="text-center text-sm text-gray-500">You won't be charged yet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isListingPage = location.pathname.startsWith('/listing/');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased flex flex-col">
      <div className="border-b border-gray-200 pb-4">
        <Navbar />
        {/* Hide the large search bar on the listing page for a cleaner look */}
        {!isListingPage && <SearchBar />}
      </div>
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/listing/:id" element={<ListingPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
