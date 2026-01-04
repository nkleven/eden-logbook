'use client'

import { useState } from 'react'
import { Heart, MapPin, Calendar, Clock, Mail, Gift, Camera, HelpCircle, Home, Users, Utensils, Music } from 'lucide-react'

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
      city: 'Your City, WI',
      time: '4:00 PM',
    },
    reception: {
      name: 'Reception Venue', // Update (or same as ceremony)
      address: '123 Beautiful Lane',
      city: 'Your City, WI',
      time: '5:30 PM',
    },
  },
  accommodations: [
    {
      name: 'Hampton Inn & Suites',
      address: 'Nearby Address',
      phone: '(555) 123-4567',
      note: 'Ask for the Kleven Wedding block',
      link: '#',
    },
    // Add more hotels as needed
  ],
  registry: [
    { name: 'Amazon', url: '#' },
    { name: 'Target', url: '#' },
    { name: 'Honeymoon Fund', url: '#' },
  ],
  rsvpDeadline: 'August 1, 2026',
  hashtag: '#KlevenExodus',
}

// ============================================
// COMPONENTS
// ============================================

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#story', label: 'Our Story' },
    { href: '#details', label: 'Details' },
    { href: '#rsvp', label: 'RSVP' },
    { href: '#registry', label: 'Registry' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-wedding-cream/90 backdrop-blur-sm border-b border-wedding-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="font-serif text-2xl text-wedding-charcoal">
            {CONFIG.couple.person1} & {CONFIG.couple.person2}
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a 
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-wedding-charcoal/70 hover:text-wedding-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-wedding-charcoal"
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
          <div className="md:hidden mt-4 pb-4 border-t border-wedding-gold/20 pt-4">
            {links.map(link => (
              <a 
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-wedding-charcoal/70 hover:text-wedding-gold transition-colors"
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

function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Replace with your engagement photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
        }}
      />
      <div className="hero-gradient absolute inset-0" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <p className="text-lg md:text-xl tracking-[0.3em] uppercase mb-4 animate-fade-in text-shadow">
          Together with their families
        </p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light mb-6 animate-slide-up text-shadow">
          {CONFIG.couple.person1} <span className="text-wedding-gold">&</span> {CONFIG.couple.person2}
        </h1>
        <p className="text-xl md:text-2xl tracking-widest mb-8 animate-fade-in text-shadow" style={{ animationDelay: '0.3s' }}>
          {CONFIG.date.full}
        </p>
        <a 
          href="#rsvp"
          className="inline-block px-10 py-4 bg-wedding-gold text-white tracking-widest uppercase text-sm hover:bg-wedding-gold/90 transition-all animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          RSVP Now
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useState(() => {
    const timer = setInterval(() => {
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
    }, 1000)

    return () => clearInterval(timer)
  })

  return (
    <section className="py-16 bg-wedding-sage/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl text-wedding-charcoal mb-8 gold-underline">Counting Down</h2>
        <div className="grid grid-cols-4 gap-4 mt-12">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map(item => (
            <div key={item.label} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="font-serif text-4xl md:text-5xl text-wedding-gold">{item.value}</div>
              <div className="text-sm text-wedding-charcoal/60 uppercase tracking-wider mt-2">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OurStory() {
  return (
    <section id="story" className="py-24 bg-wedding-cream">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          Our Story
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">How it all began...</p>
        
        <div className="prose prose-lg mx-auto text-wedding-charcoal/80 text-center">
          <p className="text-xl leading-relaxed">
            {/* Replace with your story */}
            Every love story is beautiful, but ours is our favorite. 
            From the moment we met, we knew there was something special between us.
          </p>
          <p className="text-xl leading-relaxed mt-6">
            After [X] years together, countless adventures, and endless laughter, 
            we're ready to begin our next chapter together.
          </p>
          <p className="text-xl leading-relaxed mt-6">
            We can't wait to celebrate this journey with all of you.
          </p>
        </div>

        <div className="flex justify-center mt-12">
          <Heart className="w-8 h-8 text-wedding-gold" />
        </div>
      </div>
    </section>
  )
}

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
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-wedding-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-wedding-sage" />
            </div>
            <h3 className="font-serif text-2xl text-wedding-charcoal mb-4">Ceremony</h3>
            <div className="space-y-3 text-wedding-charcoal/70">
              <p className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-wedding-gold" />
                {CONFIG.date.full}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-wedding-gold" />
                {CONFIG.venue.ceremony.time}
              </p>
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-wedding-gold" />
                {CONFIG.venue.ceremony.name}
              </p>
              <p className="text-sm">{CONFIG.venue.ceremony.address}</p>
              <p className="text-sm">{CONFIG.venue.ceremony.city}</p>
            </div>
          </div>

          {/* Reception */}
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-wedding-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="w-8 h-8 text-wedding-gold" />
            </div>
            <h3 className="font-serif text-2xl text-wedding-charcoal mb-4">Reception</h3>
            <div className="space-y-3 text-wedding-charcoal/70">
              <p className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-wedding-gold" />
                {CONFIG.date.full}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-wedding-gold" />
                {CONFIG.venue.reception.time}
              </p>
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-wedding-gold" />
                {CONFIG.venue.reception.name}
              </p>
              <p className="text-sm">{CONFIG.venue.reception.address}</p>
              <p className="text-sm">{CONFIG.venue.reception.city}</p>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl text-center text-wedding-charcoal mb-8">Schedule of Events</h3>
          <div className="space-y-4">
            {[
              { time: '4:00 PM', event: 'Ceremony Begins', icon: Heart },
              { time: '4:30 PM', event: 'Cocktail Hour', icon: Utensils },
              { time: '5:30 PM', event: 'Reception & Dinner', icon: Users },
              { time: '7:00 PM', event: 'Dancing & Celebration', icon: Music },
              { time: '10:00 PM', event: 'Grand Exit', icon: Heart },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-wedding-sage/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-wedding-sage" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-wedding-charcoal">{item.event}</p>
                </div>
                <div className="text-wedding-gold font-medium">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '1',
    meal: '',
    dietary: '',
    song: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to your backend/database
    console.log('RSVP Submitted:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 bg-wedding-cream">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-wedding-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-wedding-sage" />
          </div>
          <h2 className="font-serif text-4xl text-wedding-charcoal mb-4">Thank You!</h2>
          <p className="text-wedding-charcoal/70">
            Your RSVP has been received. We can't wait to celebrate with you!
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
          Please respond by {CONFIG.rsvpDeadline}
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label className="block text-sm font-medium text-wedding-charcoal mb-2">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-wedding-charcoal/20 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white"
              placeholder="John & Jane Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-wedding-charcoal mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-wedding-charcoal/20 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-wedding-charcoal mb-2">
              Will you be attending? *
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['Joyfully Accept', 'Regretfully Decline'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: option })}
                  className={`px-4 py-3 border rounded-lg transition-all ${
                    formData.attending === option
                      ? 'border-wedding-gold bg-wedding-gold/10 text-wedding-charcoal'
                      : 'border-wedding-charcoal/20 hover:border-wedding-gold/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {formData.attending === 'Joyfully Accept' && (
            <>
              <div>
                <label className="block text-sm font-medium text-wedding-charcoal mb-2">
                  Number of Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={e => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 border border-wedding-charcoal/20 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white"
                >
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-wedding-charcoal mb-2">
                  Meal Preference
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['Beef', 'Chicken', 'Vegetarian'].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, meal: option })}
                      className={`px-4 py-3 border rounded-lg transition-all text-sm ${
                        formData.meal === option
                          ? 'border-wedding-gold bg-wedding-gold/10 text-wedding-charcoal'
                          : 'border-wedding-charcoal/20 hover:border-wedding-gold/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-wedding-charcoal mb-2">
                  Dietary Restrictions
                </label>
                <input
                  type="text"
                  value={formData.dietary}
                  onChange={e => setFormData({ ...formData, dietary: e.target.value })}
                  className="w-full px-4 py-3 border border-wedding-charcoal/20 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white"
                  placeholder="Any allergies or dietary needs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-wedding-charcoal mb-2">
                  Song Request 🎵
                </label>
                <input
                  type="text"
                  value={formData.song}
                  onChange={e => setFormData({ ...formData, song: e.target.value })}
                  className="w-full px-4 py-3 border border-wedding-charcoal/20 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white"
                  placeholder="What song will get you on the dance floor?"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-wedding-charcoal mb-2">
              Message for the Couple
            </label>
            <textarea
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-wedding-charcoal/20 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-white"
              placeholder="Share your well wishes..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-wedding-gold text-white tracking-widest uppercase text-sm hover:bg-wedding-gold/90 transition-all rounded-lg"
          >
            Submit RSVP
          </button>
        </form>
      </div>
    </section>
  )
}

function Accommodations() {
  return (
    <section className="py-24 bg-wedding-blush/30">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          Accommodations
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">
          We've reserved room blocks at these nearby hotels
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {CONFIG.accommodations.map((hotel, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wedding-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-wedding-sage" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-wedding-charcoal mb-2">{hotel.name}</h3>
                  <p className="text-sm text-wedding-charcoal/60">{hotel.address}</p>
                  <p className="text-sm text-wedding-charcoal/60">{hotel.phone}</p>
                  {hotel.note && (
                    <p className="text-sm text-wedding-gold mt-2">{hotel.note}</p>
                  )}
                  <a 
                    href={hotel.link}
                    className="inline-block mt-3 text-sm text-wedding-sage hover:text-wedding-gold transition-colors"
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

function Registry() {
  return (
    <section id="registry" className="py-24 bg-wedding-cream">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-wedding-charcoal mb-4 gold-underline">
          Registry
        </h2>
        <p className="text-wedding-charcoal/60 mt-8 mb-12 max-w-xl mx-auto">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
          we've registered at the following places.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {CONFIG.registry.map((item, i) => (
            <a
              key={i}
              href={item.url}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white transition-all rounded-lg"
            >
              <Gift className="w-5 h-5" />
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      q: 'What is the dress code?',
      a: 'Semi-formal / Cocktail attire. Think elegant but comfortable—you\'ll want to dance!',
    },
    {
      q: 'Can I bring a plus one?',
      a: 'Due to venue capacity, we can only accommodate those listed on your invitation. Please reach out if you have questions.',
    },
    {
      q: 'Are children welcome?',
      a: 'While we love your little ones, we have chosen to make our wedding an adult-only celebration. We hope this gives you a chance to enjoy a night out!',
    },
    {
      q: 'Is the venue wheelchair accessible?',
      a: 'Yes! The venue is fully accessible. Please let us know if you have any specific accommodation needs.',
    },
    {
      q: 'Will there be parking?',
      a: 'Yes, complimentary parking is available at the venue.',
    },
    {
      q: 'What if I have dietary restrictions?',
      a: 'Please note any dietary restrictions on your RSVP and we\'ll make sure you\'re taken care of!',
    },
  ]

  return (
    <section id="faq" className="py-24 bg-wedding-blush/30">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          FAQ
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">Common questions answered</p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-lg shadow-sm group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-medium text-wedding-charcoal">{faq.q}</span>
                <HelpCircle className="w-5 h-5 text-wedding-gold group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-wedding-charcoal/70">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-wedding-charcoal/60 mb-4">Still have questions?</p>
          <a 
            href="mailto:wedding@klevenexodus.com"
            className="inline-flex items-center gap-2 text-wedding-gold hover:text-wedding-sage transition-colors"
          >
            <Mail className="w-5 h-5" />
            wedding@klevenexodus.com
          </a>
        </div>
      </div>
    </section>
  )
}

function PhotoGallery() {
  return (
    <section className="py-24 bg-wedding-cream">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-wedding-charcoal mb-4 gold-underline">
          Our Moments
        </h2>
        <p className="text-center text-wedding-charcoal/60 mt-8 mb-16">A glimpse of our journey together</p>

        {/* Placeholder for photos - replace with your images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div 
              key={i} 
              className="aspect-square bg-wedding-sage/10 rounded-lg flex items-center justify-center"
            >
              <Camera className="w-8 h-8 text-wedding-sage/50" />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-wedding-charcoal/60 mb-2">Share your photos with us!</p>
          <p className="text-2xl text-wedding-gold font-serif">{CONFIG.hashtag}</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 bg-wedding-charcoal text-white/80">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-serif text-3xl mb-4">
          {CONFIG.couple.person1} & {CONFIG.couple.person2}
        </p>
        <p className="text-white/60">{CONFIG.date.full}</p>
        <p className="text-2xl text-wedding-gold mt-6">{CONFIG.hashtag}</p>
        <p className="text-sm text-white/40 mt-8">Made with ❤️ for our favorite people</p>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function WeddingPage() {
  return (
    <main>
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
