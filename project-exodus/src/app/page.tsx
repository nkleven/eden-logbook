'use client'

import { useState, useEffect } from 'react'
import { Heart, MapPin, Calendar, Clock, Mail, Gift, Camera, HelpCircle, Home, Users, Utensils, Music, ChevronDown } from 'lucide-react'

// ============================================
// CONFIGURATION - Edit your wedding details here!
// ============================================
const CONFIG = {
  couple: {
    person1: 'Nate',
    person2: 'Kelly', // Update with your partner's name
  },
  date: {
    full: 'Saturday, September 12, 2026', // Update with your date
    short: '09.12.26',
    countdown: new Date('2026-09-12T16:00:00'), // Update for countdown
  },
  venue: {
    ceremony: {
      name: 'Venue Name', // Update
      address: '123 Beautiful Lane',
      city: 'Wisconsin',
      time: '4:00 PM',
      mapUrl: '#', // Google Maps link
    },
    reception: {
      name: 'Reception Venue', // Update (or same as ceremony)
      address: '123 Beautiful Lane',
      city: 'Wisconsin',
      time: '5:30 PM',
      mapUrl: '#',
    },
  },
  accommodations: [
    {
      name: 'Hampton Inn & Suites',
      address: 'Wisconsin Dells Parkway',
      phone: '(608) 555-0123',
      note: 'Ask for the Kleven Wedding block',
      link: '#',
    },
    {
      name: 'Holiday Inn Express',
      address: 'Nearby Address',
      phone: '(608) 555-0456',
      note: 'Group rate available',
      link: '#',
    },
  ],
  registry: [
    { name: 'Amazon', url: '#', icon: '📦' },
    { name: 'Target', url: '#', icon: '🎯' },
    { name: 'Honeymoon Fund', url: '#', icon: '✈️' },
  ],
  rsvpDeadline: 'August 1, 2026',
  hashtag: '#KlevenExodus',
  contactEmail: 'wedding@klevenexodus.com',
}

// ============================================
// NAVIGATION
// ============================================
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#story', label: 'Our Story' },
    { href: '#details', label: 'Details' },
    { href: '#rsvp', label: 'RSVP' },
    { href: '#registry', label: 'Registry' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-wedding-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a 
            href="#home" 
            className={`font-serif text-2xl transition-colors ${
              scrolled ? 'text-wedding-charcoal' : 'text-white'
            }`}
          >
            {CONFIG.couple.person1} & {CONFIG.couple.person2}
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a 
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  scrolled 
                    ? 'text-wedding-charcoal/70 hover:text-wedding-gold' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${scrolled ? 'text-wedding-charcoal' : 'text-white'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-wedding-gold/20 pt-4 bg-wedding-cream/95 rounded-lg">
            {links.map(link => (
              <a 
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-wedding-charcoal/70 hover:text-wedding-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

// ============================================
// HERO SECTION
// ============================================
function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Replace with your engagement photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
        }}
      />
      <div className="hero-gradient absolute inset-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full opacity-50" />
      <div className="absolute bottom-32 right-16 w-24 h-24 border border-wedding-gold/30 rounded-full opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <p 
          className="text-lg md:text-xl tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in text-shadow"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          Together with their families
        </p>
        
        <h1 
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-light mb-6 opacity-0 animate-slide-up text-shadow"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          {CONFIG.couple.person1} <span className="text-wedding-gold">&</span> {CONFIG.couple.person2}
        </h1>
        
        <div 
          className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <div className="h-px w-16 bg-white/50" />
          <p className="text-xl md:text-2xl tracking-widest text-shadow">
            {CONFIG.date.full}
          </p>
          <div className="h-px w-16 bg-white/50" />
        </div>
        
        <a 
          href="#rsvp"
          className="inline-block px-10 py-4 bg-wedding-gold text-white tracking-widest uppercase text-sm hover:bg-wedding-gold/90 transition-all opacity-0 animate-fade-in rounded"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          RSVP Now
        </a>
      </div>

      {/* Scroll Indicator */}
      <a 
        href="#countdown"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </a>
    </section>
  )
}

// ============================================
// COUNTDOWN
// ============================================
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const target = CONFIG.date.countdown.getTime()
      const diff = target - now

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="countdown" className="py-20 bg-wedding-sage/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-wedding-charcoal mb-4 gold-underline">
          Counting Down to Forever
        </h2>
        <p className="text-wedding-charcoal/60 mt-8 mb-12">Until we say "I do"</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map(item => (
            <div 
              key={item.label} 
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="font-serif text-5xl md:text-6xl text-wedding-gold">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-sm text-wedding-charcoal/60 uppercase tracking-wider mt-3">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// OUR STORY
// ============================================
function OurStory() {
  return (
    <section id="story" className="py-24 bg-wedding-cream">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          Our Story
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">How it all began...</p>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-wedding-gold/30" />
          
          {/* Story events - customize these! */}
          {[
            {
              date: 'How We Met',
              title: 'The Beginning',
              description: 'Share how you first met. Was it through friends? At work? Online? Make it personal and fun!',
              side: 'left',
            },
            {
              date: 'First Date',
              title: 'Sparks Flew',
              description: 'Tell the story of your first official date. What did you do? What made it memorable?',
              side: 'right',
            },
            {
              date: 'The Proposal',
              title: 'Will You Marry Me?',
              description: 'Share the proposal story! Where did it happen? How did you feel? Was it a surprise?',
              side: 'left',
            },
          ].map((event, i) => (
            <div 
              key={i}
              className={`relative mb-12 md:mb-16 ${
                event.side === 'right' ? 'md:ml-[50%] md:pl-12' : 'md:mr-[50%] md:pr-12 md:text-right'
              }`}
            >
              {/* Timeline dot */}
              <div className="hidden md:block absolute top-2 w-4 h-4 bg-wedding-gold rounded-full border-4 border-wedding-cream" 
                   style={{ [event.side === 'right' ? 'left' : 'right']: '-8px' }} 
              />
              
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <span className="text-wedding-gold text-sm tracking-widest uppercase">
                  {event.date}
                </span>
                <h3 className="font-serif text-2xl text-wedding-charcoal mt-2 mb-4">
                  {event.title}
                </h3>
                <p className="text-wedding-charcoal/70 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Heart className="w-8 h-8 text-wedding-gold fill-wedding-gold/20" />
        </div>
      </div>
    </section>
  )
}

// ============================================
// EVENT DETAILS
// ============================================
function EventDetails() {
  return (
    <section id="details" className="py-24 bg-wedding-blush/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          Wedding Details
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">Join us for our special day</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ceremony */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-wedding-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-wedding-sage" />
            </div>
            <h3 className="font-serif text-3xl text-wedding-charcoal mb-6">Ceremony</h3>
            <div className="space-y-4 text-wedding-charcoal/70">
              <p className="flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5 text-wedding-gold" />
                {CONFIG.date.full}
              </p>
              <p className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-wedding-gold" />
                {CONFIG.venue.ceremony.time}
              </p>
              <div className="pt-4 border-t border-wedding-gold/10">
                <p className="flex items-center justify-center gap-3 font-medium text-wedding-charcoal">
                  <MapPin className="w-5 h-5 text-wedding-gold" />
                  {CONFIG.venue.ceremony.name}
                </p>
                <p className="text-sm mt-2">{CONFIG.venue.ceremony.address}</p>
                <p className="text-sm">{CONFIG.venue.ceremony.city}</p>
              </div>
              <a 
                href={CONFIG.venue.ceremony.mapUrl}
                className="inline-block mt-4 text-wedding-gold hover:text-wedding-sage transition-colors text-sm"
              >
                View Map →
              </a>
            </div>
          </div>

          {/* Reception */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-wedding-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-wedding-gold" />
            </div>
            <h3 className="font-serif text-3xl text-wedding-charcoal mb-6">Reception</h3>
            <div className="space-y-4 text-wedding-charcoal/70">
              <p className="flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5 text-wedding-gold" />
                {CONFIG.date.full}
              </p>
              <p className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-wedding-gold" />
                {CONFIG.venue.reception.time}
              </p>
              <div className="pt-4 border-t border-wedding-gold/10">
                <p className="flex items-center justify-center gap-3 font-medium text-wedding-charcoal">
                  <MapPin className="w-5 h-5 text-wedding-gold" />
                  {CONFIG.venue.reception.name}
                </p>
                <p className="text-sm mt-2">{CONFIG.venue.reception.address}</p>
                <p className="text-sm">{CONFIG.venue.reception.city}</p>
              </div>
              <a 
                href={CONFIG.venue.reception.mapUrl}
                className="inline-block mt-4 text-wedding-gold hover:text-wedding-sage transition-colors text-sm"
              >
                View Map →
              </a>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl text-center text-wedding-charcoal mb-10">
            Schedule of Events
          </h3>
          <div className="space-y-4">
            {[
              { time: '4:00 PM', event: 'Ceremony Begins', icon: Heart, desc: 'Please be seated by 3:45 PM' },
              { time: '4:30 PM', event: 'Cocktail Hour', icon: Utensils, desc: 'Drinks, appetizers & mingling' },
              { time: '5:30 PM', event: 'Reception & Dinner', icon: Users, desc: 'Dinner, toasts & celebration' },
              { time: '7:00 PM', event: 'Dancing & Celebration', icon: Music, desc: 'Dance the night away!' },
              { time: '10:00 PM', event: 'Grand Exit', icon: Heart, desc: 'Send us off in style' },
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 bg-wedding-sage/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-wedding-sage/20 transition-colors">
                  <item.icon className="w-6 h-6 text-wedding-sage" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-wedding-charcoal">{item.event}</p>
                  <p className="text-sm text-wedding-charcoal/50">{item.desc}</p>
                </div>
                <div className="text-wedding-gold font-serif text-lg">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// RSVP FORM
// ============================================
function RSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guestCount: '1',
    guestNames: '',
    meal: '',
    dietary: '',
    song: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Connect to your backend (Firebase, Supabase, Airtable, etc.)
    // For now, simulate a submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('RSVP Submitted:', formData)
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 bg-wedding-cream">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-wedding-sage/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-wedding-sage fill-wedding-sage/20" />
          </div>
          <h2 className="font-serif text-4xl text-wedding-charcoal mb-4">Thank You!</h2>
          <p className="text-wedding-charcoal/70 text-lg">
            Your RSVP has been received. We can't wait to celebrate with you!
          </p>
          <p className="mt-6 text-wedding-gold font-serif text-xl">
            {CONFIG.date.short}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-24 bg-wedding-cream">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          RSVP
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-4">
          Please respond by <span className="text-wedding-gold font-medium">{CONFIG.rsvpDeadline}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-wedding-charcoal mb-2">
              Your Name(s) *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-4 border border-wedding-charcoal/20 rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white transition-all"
              placeholder="John & Jane Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-wedding-charcoal mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-4 border border-wedding-charcoal/20 rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white transition-all"
              placeholder="your@email.com"
            />
          </div>

          {/* Attending */}
          <div>
            <label className="block text-sm font-medium text-wedding-charcoal mb-3">
              Will you be attending? *
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'yes', label: 'Joyfully Accept', emoji: '🎉' },
                { value: 'no', label: 'Regretfully Decline', emoji: '😢' },
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: option.value })}
                  className={`px-4 py-4 border-2 rounded-xl transition-all text-center ${
                    formData.attending === option.value
                      ? 'border-wedding-gold bg-wedding-gold/10 text-wedding-charcoal'
                      : 'border-wedding-charcoal/20 hover:border-wedding-gold/50 bg-white'
                  }`}
                >
                  <span className="text-2xl block mb-1">{option.emoji}</span>
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {formData.attending === 'yes' && (
            <>
              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-medium text-wedding-charcoal mb-2">
                  Number of Guests in Your Party
                </label>
                <select
                  value={formData.guestCount}
                  onChange={e => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-4 py-4 border border-wedding-charcoal/20 rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white transition-all"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {/* Guest Names */}
              {parseInt(formData.guestCount) > 1 && (
                <div>
                  <label className="block text-sm font-medium text-wedding-charcoal mb-2">
                    Names of Additional Guests
                  </label>
                  <textarea
                    value={formData.guestNames}
                    onChange={e => setFormData({ ...formData, guestNames: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-4 border border-wedding-charcoal/20 rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white transition-all"
                    placeholder="Please list the names of guests in your party"
                  />
                </div>
              )}

              {/* Meal Preference */}
              <div>
                <label className="block text-sm font-medium text-wedding-charcoal mb-3">
                  Meal Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'beef', label: 'Beef', emoji: '🥩' },
                    { value: 'chicken', label: 'Chicken', emoji: '🍗' },
                    { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, meal: option.value })}
                      className={`px-3 py-4 border-2 rounded-xl transition-all text-center ${
                        formData.meal === option.value
                          ? 'border-wedding-gold bg-wedding-gold/10 text-wedding-charcoal'
                          : 'border-wedding-charcoal/20 hover:border-wedding-gold/50 bg-white'
                      }`}
                    >
                      <span className="text-xl block mb-1">{option.emoji}</span>
                      <span className="text-xs">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-sm font-medium text-wedding-charcoal mb-2">
                  Dietary Restrictions or Allergies
                </label>
                <input
                  type="text"
                  value={formData.dietary}
                  onChange={e => setFormData({ ...formData, dietary: e.target.value })}
                  className="w-full px-4 py-4 border border-wedding-charcoal/20 rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white transition-all"
                  placeholder="Gluten-free, nut allergy, etc."
                />
              </div>

              {/* Song Request */}
              <div>
                <label className="block text-sm font-medium text-wedding-charcoal mb-2">
                  Song Request 🎵
                </label>
                <input
                  type="text"
                  value={formData.song}
                  onChange={e => setFormData({ ...formData, song: e.target.value })}
                  className="w-full px-4 py-4 border border-wedding-charcoal/20 rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white transition-all"
                  placeholder="What song will get you on the dance floor?"
                />
              </div>
            </>
          )}

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-wedding-charcoal mb-2">
              Message for the Happy Couple
            </label>
            <textarea
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-4 border border-wedding-charcoal/20 rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white transition-all"
              placeholder="Share your well wishes, advice, or a fun memory..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!formData.attending || isSubmitting}
            className="w-full py-4 bg-wedding-gold text-white tracking-widest uppercase text-sm hover:bg-wedding-gold/90 transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : (
              'Submit RSVP'
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

// ============================================
// ACCOMMODATIONS
// ============================================
function Accommodations() {
  return (
    <section className="py-24 bg-wedding-blush/30">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          Accommodations
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">
          We've arranged room blocks at these nearby hotels
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {CONFIG.accommodations.map((hotel, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-wedding-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Home className="w-7 h-7 text-wedding-sage" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-wedding-charcoal mb-3">{hotel.name}</h3>
                  <p className="text-sm text-wedding-charcoal/60 mb-1">{hotel.address}</p>
                  <p className="text-sm text-wedding-charcoal/60 mb-3">{hotel.phone}</p>
                  {hotel.note && (
                    <p className="text-sm text-wedding-gold bg-wedding-gold/10 px-3 py-2 rounded-lg inline-block">
                      💡 {hotel.note}
                    </p>
                  )}
                  <a 
                    href={hotel.link}
                    className="block mt-4 text-wedding-sage hover:text-wedding-gold transition-colors text-sm font-medium"
                  >
                    Book Now →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// REGISTRY
// ============================================
function Registry() {
  return (
    <section id="registry" className="py-24 bg-wedding-cream">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-wedding-charcoal mb-4 gold-underline">
          Gift Registry
        </h2>
        <p className="text-wedding-charcoal/60 mt-8 mb-12 max-w-xl mx-auto leading-relaxed">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
          we've registered at the following places.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {CONFIG.registry.map((item, i) => (
            <a
              key={i}
              href={item.url}
              className="inline-flex items-center gap-3 px-8 py-5 border-2 border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white transition-all rounded-xl group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// PHOTO GALLERY
// ============================================
function PhotoGallery() {
  // Replace these with your actual photos
  const photos = [
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
    'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
  ]

  return (
    <section className="py-24 bg-wedding-blush/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          Our Moments
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">A glimpse of our journey together</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((url, i) => (
            <div 
              key={i} 
              className="aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={url} 
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-wedding-charcoal/60 mb-3">Share your photos from the big day!</p>
          <p className="text-3xl text-wedding-gold font-serif">{CONFIG.hashtag}</p>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FAQ
// ============================================
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const faqs = [
    {
      q: 'What is the dress code?',
      a: 'Semi-formal / Cocktail attire. Think elegant but comfortable—you\'ll want to dance! Ladies, be mindful of heels if any portion is outdoors.',
    },
    {
      q: 'Can I bring a plus one?',
      a: 'Due to venue capacity, we can only accommodate guests specifically named on your invitation. If you received a plus one, it will be noted. Please reach out if you have questions.',
    },
    {
      q: 'Are children welcome?',
      a: 'While we love your little ones, we have chosen to make our wedding an adults-only celebration (18+). We hope this gives you a chance to enjoy a night out!',
    },
    {
      q: 'Is the venue wheelchair accessible?',
      a: 'Yes! The venue is fully ADA accessible. Please let us know if you have any specific accommodation needs and we\'ll make sure you\'re taken care of.',
    },
    {
      q: 'Will there be parking?',
      a: 'Yes, complimentary parking is available at the venue. Valet service will also be available.',
    },
    {
      q: 'What if I have dietary restrictions?',
      a: 'Please note any dietary restrictions, allergies, or preferences on your RSVP card. We want to make sure everyone can enjoy the meal!',
    },
    {
      q: 'Can I take photos during the ceremony?',
      a: 'We kindly ask for an unplugged ceremony—please silence phones and refrain from photos during the ceremony so everyone can be fully present. Our photographer will capture everything! You\'re welcome to take photos at the reception.',
    },
    {
      q: 'What time should I arrive?',
      a: 'Please arrive 15-20 minutes before the ceremony start time to allow time to be seated. The ceremony will begin promptly.',
    },
  ]

  return (
    <section id="faq" className="py-24 bg-wedding-cream">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          Questions & Answers
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">Everything you need to know</p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-wedding-cream/50 transition-colors"
              >
                <span className="font-medium text-wedding-charcoal pr-4">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-wedding-gold flex-shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-wedding-charcoal/70 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white p-8 rounded-2xl shadow-sm">
          <p className="text-wedding-charcoal/60 mb-4">Still have questions?</p>
          <a 
            href={`mailto:${CONFIG.contactEmail}`}
            className="inline-flex items-center gap-2 text-wedding-gold hover:text-wedding-sage transition-colors text-lg"
          >
            <Mail className="w-5 h-5" />
            {CONFIG.contactEmail}
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="py-16 bg-wedding-charcoal text-white/80">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-serif text-4xl md:text-5xl mb-6 text-white">
          {CONFIG.couple.person1} & {CONFIG.couple.person2}
        </p>
        <p className="text-white/60 mb-4">{CONFIG.date.full}</p>
        <p className="text-3xl text-wedding-gold font-serif mb-8">{CONFIG.hashtag}</p>
        
        <div className="flex justify-center gap-2 mb-8">
          <Heart className="w-5 h-5 text-wedding-gold fill-wedding-gold" />
          <Heart className="w-5 h-5 text-wedding-gold fill-wedding-gold" />
          <Heart className="w-5 h-5 text-wedding-gold fill-wedding-gold" />
        </div>
        
        <p className="text-sm text-white/40">
          Made with love for our favorite people
        </p>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function WeddingPage() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <Countdown />
      <OurStory />
      <EventDetails />
      <RSVPForm />
      <Accommodations />
      <Registry />
      <PhotoGallery />
      <FAQ />
      <Footer />
    </main>
  )
}
