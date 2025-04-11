"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Clock, MapPin, Send, Home, Users, Headphones, Globe, Star, MessageSquare, User, Calendar, Heart, Flower, Sparkles } from 'lucide-react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: ""
        })
      }, 3000)
    }, 1500)
  }

  const breadcrumbLinks = [
    { label: 'Home', url: '/' },
    { label: 'Contact Us', url: '/contact-us' },
    { pagename: 'Contact Us' },
  ]

  // Custom Om SVG icon
  const OmIcon = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM14.65,7.06a3.31,3.31,0,0,0-1.89-.56,3,3,0,0,0-1.86.56,1.83,1.83,0,0,0-.75,1.56,1.67,1.67,0,0,0,.34,1.09,3,3,0,0,0,.88.7,6.45,6.45,0,0,0,1.09.45V12a4.06,4.06,0,0,1-2.3.71,2.2,2.2,0,0,1-1.43-.48,1.6,1.6,0,0,1-.6-1.31,1.9,1.9,0,0,1,.09-.6l.12-.36-.69-.28-.12.36a2.6,2.6,0,0,0-.12.81,2.3,2.3,0,0,0,.86,1.89,3,3,0,0,0,1.89.67,4.83,4.83,0,0,0,2.3-.62v1.3a3.83,3.83,0,0,1-2.3.8,2.37,2.37,0,0,1-1.46-.48,1.6,1.6,0,0,1-.63-1.34,1.9,1.9,0,0,1,.09-.6l.12-.36-.69-.28-.12.36a2.6,2.6,0,0,0-.12.81,2.33,2.33,0,0,0,.86,1.92,3.12,3.12,0,0,0,2,.7,4.6,4.6,0,0,0,2.3-.65v.73a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V10.86a6.45,6.45,0,0,0,1.09-.45,3,3,0,0,0,.88-.7,1.67,1.67,0,0,0,.34-1.09A1.83,1.83,0,0,0,14.65,7.06Zm.09,2.19a2.06,2.06,0,0,1-.6.48,5.45,5.45,0,0,1-.92.38,5.45,5.45,0,0,1-.92-.38,2.06,2.06,0,0,1-.6-.48.72.72,0,0,1-.2-.5.9.9,0,0,1,.38-.77,2,2,0,0,1,1.22-.29,2.22,2.22,0,0,1,1.25.29.9.9,0,0,1,.38.77A.72.72,0,0,1,14.74,9.25Z"/>
    </svg>
  )

  // Custom Lotus SVG icon
  const LotusIcon = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M12,2C7.58,2,4,5.58,4,10c0,2.03,0.76,3.87,2,5.28V16c0,3.31,2.69,6,6,6s6-2.69,6-6v-0.72 c1.24-1.41,2-3.25,2-5.28C20,5.58,16.42,2,12,2z M12,4c0.83,0,1.5,0.67,1.5,1.5S12.83,7,12,7s-1.5-0.67-1.5-1.5S11.17,4,12,4z M13.5,10 c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S13.5,9.17,13.5,10z M9.5,5.5C9.5,4.67,10.17,4,11,4 c0.83,0,1.5,0.67,1.5,1.5S11.83,7,11,7C10.17,7,9.5,6.33,9.5,5.5z M7.5,7C8.33,7,9,7.67,9,8.5S8.33,10,7.5,10S6,9.33,6,8.5 S6.67,7,7.5,7z M16.5,10c-0.83,0-1.5-0.67-1.5-1.5S15.67,7,16.5,7s1.5,0.67,1.5,1.5S17.33,10,16.5,10z M18,16c0,2.21-1.79,4-4,4 h-4c-2.21,0-4-1.79-4-4v-0.28c1.12,0.81,2.5,1.28,4,1.28h4c1.5,0,2.88-0.47,4-1.28V16z"/>
    </svg>
  )

  // Custom Diya SVG icon
  const DiyaIcon = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M12,6c-3.31,0-6,2.69-6,6v4h12v-4C18,8.69,15.31,6,12,6z M8,14c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1 S8.55,14,8,14z M12,14c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S12.55,14,12,14z M16,14c-0.55,0-1-0.45-1-1s0.45-1,1-1 s1,0.45,1,1S16.55,14,16,14z M19,16H5c-1.1,0-2,0.9-2,2v1c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1v-1C21,16.9,20.1,16,19,16z"/>
    </svg>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-orange-700 to-red-800 py-16">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url('https://img.freepik.com/free-vector/space-background-with-stars-vector-illustration_97886-319.jpg?w=1380&t=st=1711066235~exp=1711066835~hmac=e1e1f9d3a7f5e5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay"
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center text-amber-50">
              Contact Us
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center text-amber-100 mt-2"
            >
              Contact Us
            </motion.p>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute left-10 top-1/2 transform -translate-y-1/2 hidden md:block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-amber-300/40" />
            </motion.div>
          </div>
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden md:block">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-amber-300/40" />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav>
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbLinks.map((link, index) => (
              <li key={index} className="flex items-center">
                {link.url ? (
                  <>
                    <a href={link.url} className="text-orange-700 hover:text-orange-900">
                      {index === 0 ? (
                        <span className="flex items-center">
                          <Home className="h-3.5 w-3.5 mr-1" />
                          {link.label}
                        </span>
                      ) : (
                        link.label
                      )}
                    </a>
                    <span className="mx-2 text-orange-400">/</span>
                  </>
                ) : (
                  <span className="text-orange-900 font-medium">{link.pagename}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      
      {/* Decorative Divider */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center">
          <div className="h-px bg-orange-200 w-1/3"></div>
          <LotusIcon className="h-8 w-8 text-orange-500 mx-4" />
          <div className="h-px bg-orange-200 w-1/3"></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 py-6 px-8">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <MessageSquare className="mr-3 h-6 w-6" />
                Send Us a Message
              </h2>
              <p className="text-orange-100 mt-1">
                We would love to hear from you regarding any spiritual services
              </p>
            </div>
            
            <div className="p-8">
              {showSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out to us. We will get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative border-b-2 border-orange-200 focus-within:border-orange-500 transition-colors group">
                    <div className="absolute left-0 top-2 text-orange-400 group-focus-within:text-orange-600 transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="block w-full appearance-none bg-transparent py-2.5 pl-8 pr-0 text-gray-900 focus:outline-none focus:ring-0"
                      placeholder=" "
                      required
                    />
                    <label 
                      htmlFor="fullName" 
                      className="absolute top-3 left-8 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-8 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                  </div>
                  
                  <div className="relative border-b-2 border-orange-200 focus-within:border-orange-500 transition-colors group">
                    <div className="absolute left-0 top-2 text-orange-400 group-focus-within:text-orange-600 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full appearance-none bg-transparent py-2.5 pl-8 pr-0 text-gray-900 focus:outline-none focus:ring-0"
                      placeholder=" "
                      required
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute top-3 left-8 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-8 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                  </div>
                  
                  <div className="relative border-b-2 border-orange-200 focus-within:border-orange-500 transition-colors group">
                    <div className="absolute left-0 top-2 text-orange-400 group-focus-within:text-orange-600 transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full appearance-none bg-transparent py-2.5 pl-8 pr-0 text-gray-900 focus:outline-none focus:ring-0"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="phone" 
                      className="absolute top-3 left-8 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-8 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600"
                    >
                      Phone Number <span className="text-gray-400">(Optional)</span>
                    </label>
                  </div>
                  
                  <div className="relative border-b-2 border-orange-200 focus-within:border-orange-500 transition-colors group">
                    <div className="absolute left-0 top-2 text-orange-400 group-focus-within:text-orange-600 transition-colors">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="block w-full appearance-none bg-transparent py-2.5 pl-8 pr-0 text-gray-900 focus:outline-none focus:ring-0"
                      placeholder=" "
                      required
                    ></textarea>
                    <label 
                      htmlFor="message" 
                      className="absolute top-3 left-8 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-8 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all ${isSubmitting ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'} shadow-lg shadow-orange-200`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
          
          {/* Map and Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425882426903!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1711066235076!5m2!1sen!2sin" 
                  className="w-full h-full border-0" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-orange-600" />
                  Find Our Temple
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-700 flex items-center">
                      <DiyaIcon className="h-5 w-5 text-orange-500 mr-2" />
                      Main Temple
                    </p>
                    <p className="text-gray-600 pl-7">123 Divine Street</p>
                    <p className="text-gray-600 pl-7">New York, NY 10001</p>
                    <p className="text-gray-600 pl-7">United States</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-gray-700 flex items-center">
                      <Clock className="h-5 w-5 text-orange-500 mr-2" />
                      Temple Hours
                    </p>
                    <p className="text-gray-600 pl-7">Monday - Friday: 7am - 9pm</p>
                    <p className="text-gray-600 pl-7">Saturday: 8am - 8pm</p>
                    <p className="text-gray-600 pl-7">Sunday: 8am - 10pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 py-6 px-8">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Phone className="mr-3 h-6 w-6" />
                  Call or Chat With Us
                </h2>
                <p className="text-orange-100 mt-1">
                  We're here to assist you with any questions
                </p>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Headphones className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-orange-800">Pooja Support</h3>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2" />
                        (123) 456-7890, (111) 222-3333
                      </p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-2" />
                        pooja@bookpooja.com
                      </p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-2" />
                        Time: (Mon - Fri) 8am - 6pm
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Flower className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-orange-800">Spiritual Guidance</h3>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2" />
                        (123) 456-7890, (111) 222-3333
                      </p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-2" />
                        guidance@bookpooja.com
                      </p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-2" />
                        Time: 24/7 Support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Office Locations */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-800 flex items-center">
              <Globe className="mr-3 h-6 w-6 text-orange-600" />
              Our Temple Locations
            </h2>
            <div className="w-24 h-1 bg-orange-600 mt-2"></div>
            <p className="text-gray-600 mt-4">Please choose the temple which is nearest to you for your spiritual needs.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Main Temple",
                company: "PoojaBooking",
                email: "info@bookpooja.com",
                phone: "(123) 345-6789",
                address: [
                  "12345 Divine Avenue,",
                  "STE 67110",
                  "New York, NY",
                  "10001, United States"
                ],
                icon: <OmIcon className="h-10 w-10 text-orange-500" />
              },
              {
                title: "California Temple",
                company: "PoojaBooking",
                email: "info.ca@bookpooja.com",
                phone: "(123) 345-6789",
                address: [
                  "12345 Sacred Street,",
                  "STE 67110",
                  "Los Angeles, CA",
                  "90001, United States"
                ],
                icon: <LotusIcon className="h-10 w-10 text-orange-500" />
              },
              {
                title: "India Temple",
                company: "PoojaBooking",
                email: "info.india@bookpooja.com",
                phone: "(123) 345-6789",
                address: [
                  "12345 Mandir Marg,",
                  "Varanasi, Uttar Pradesh",
                  "221001, India"
                ],
                icon: <DiyaIcon className="h-10 w-10 text-orange-500" />
              }
            ].map((office, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-3 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-50 p-3 rounded-full mr-3">
                      {office.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-orange-800">{office.title}</h3>
                      <h4 className="text-base font-semibold text-orange-700">{office.company}</h4>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-orange-500" />
                      {office.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-orange-500" />
                      {office.phone}
                    </p>
                    <div className="flex">
                      <MapPin className="h-4 w-4 mr-2 text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        {office.address.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Spiritual Services Section */}
        <div className="mt-16 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 py-6 px-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Heart className="mr-3 h-6 w-6" />
              Our Spiritual Services
            </h2>
            <p className="text-orange-100 mt-1">
              Discover the divine services we offer
            </p>
          </div>
          
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Pooja Services",
                description: "Traditional rituals performed by experienced priests",
                icon: <OmIcon className="h-8 w-8 text-orange-500" />
              },
              {
                title: "Astrology",
                description: "Vedic astrology consultations and horoscope readings",
                icon: <Star className="h-8 w-8 text-orange-500" />
              },
              {
                title: "Spiritual Counseling",
                description: "Guidance for spiritual growth and personal development",
                icon: <Sparkles className="h-8 w-8 text-orange-500" />
              },
              {
                title: "Temple Visits",
                description: "Organized visits to sacred temples and pilgrimage sites",
                icon: <LotusIcon className="h-8 w-8 text-orange-500" />
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-orange-50 rounded-lg p-5 flex flex-col items-center text-center"
              >
                <div className="bg-white p-3 rounded-full mb-4 shadow-md">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-orange-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Divider */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="h-px bg-orange-200 w-1/3"></div>
          <DiyaIcon className="h-8 w-8 text-orange-500 mx-4" />
          <div className="h-px bg-orange-200 w-1/3"></div>
        </div>
      </div>
      
      {/* Decorative Footer */}
      <div className="bg-gradient-to-r from-orange-700 to-red-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-amber-50 mb-2">Connect With Us For Spiritual Journey</h3>
          <p className="text-amber-100">Let us guide you through your spiritual path with our divine services</p>
          
          <div className="flex justify-center mt-6 space-x-4">
            {['facebook', 'twitter', 'instagram', 'youtube'].map((social, index) => (
              <a 
                key={index}
                href={`#${social}`} 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <span className="text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs