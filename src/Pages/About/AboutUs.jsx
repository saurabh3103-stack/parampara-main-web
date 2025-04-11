"use client"

import { motion } from "framer-motion"
import { Star } from 'lucide-react'

// Import images
import omSymbol from "./om-symbol.png"
import diyas from "./diyas.png"
import swastik from "./swastik.png"
import kalash from "./kalash.png"
import vedicBook from "./vedic-book.png"
import lotus from "./lotus.png"

const AboutUs = () => {
  // Animation configurations
  const animations = {
    floating: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      },
    }
  }

  // Section component for consistent styling and zig-zag layout
  const Section = ({ 
    id, 
    title, 
    description, 
    image, 
    bgColor = "bg-white", 
    reverse = false, 
    children 
  }) => (
    <section 
      id={id}
      className={`py-16 md:py-24 px-4 ${bgColor}`}
    >
      <div className={`container mx-auto max-w-6xl flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
        {/* Image Column */}
        <div className={`w-full md:w-1/2 ${reverse ? 'md:pl-8' : 'md:pr-8'}`}>
          <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
            {image}
            <motion.img 
              src={lotus}
              alt="Lotus decoration"
              className="absolute bottom-4 right-4 w-16 h-16 opacity-20"
              animate={animations.rotate}
            />
          </div>
        </div>
        
        {/* Content Column */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-10 bg-orange-600"/>
            <h2 className="text-3xl font-bold text-orange-800">{title}</h2>
          </div>
          
          {description && (
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {description}
            </p>
          )}
          
          {children}
        </div>
      </div>
    </section>
  )

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-700 to-red-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/space-background-with-stars-vector-illustration_97886-319.jpg')] bg-cover bg-center opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-4">
              About Vaidic Parampara
            </h1>
            <p className="text-xl md:text-2xl text-amber-100">
              Preserving Ancient Wisdom • Illuminating Modern Lives
            </p>
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-8 h-8 text-amber-300/40" />
          </motion.div>
          <motion.div 
            className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-8 h-8 text-amber-300/40" />
          </motion.div>
        </div>
      </div>

      {/* Introduction Section */}
      <Section
        id="intro-section"
        title="Our Sacred Journey"
        description="Vaidic Parampara is a divine bridge connecting the ancient Vedic wisdom with contemporary spiritual seekers. We are custodians of timeless traditions, preserving the sacred rituals and knowledge that have illuminated Hindu spiritual practices for millennia."
        image={
          <img 
            src='https://wd-image.webdunia.com/image-conversion/process-aws.php?url=https://nonprod-media.webdunia.com/public_html/_media/hi/img/article/2020-12/07/full/1607311219-0037.jpg&w=&h=&outtype=webp'
            alt="Ancient Temple"
            className="w-full h-full object-cover"
          />
        }
      >
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Our organization brings together erudite pandits and spiritual guides, each deeply versed in authentic Vedic 
          scriptures and rituals. Through our services, we make these profound traditions accessible to devotees 
          worldwide, ensuring the eternal flame of Vedic knowledge continues to guide humanity.
        </p>
        <div className="flex items-center gap-3">
          <img src={swastik} alt="Swastik Symbol" className="w-10 h-10" />
          <span className="text-orange-700 font-medium">Vaidic Parampara Family</span>
        </div>
      </Section>

      {/* Aim Section */}
      <Section
        id="aim-section"
        title="Our Divine Aim"
        description="At Vaidic Parampara, our sacred aim is to preserve and propagate the authentic Vedic traditions that form the spiritual foundation of Sanatana Dharma. We serve as divine instruments to make these eternal rituals accessible to all sincere seekers."
        bgColor="bg-amber-50"
        reverse={true}
        image={
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <img 
              src={vedicBook} 
              alt="Vedic Scriptures" 
              className="w-3/4 max-w-xs object-contain"
            />
            <motion.img 
              src={diyas}
              alt="Diyas"
              className="absolute bottom-6 left-6 w-12 h-12"
              animate={{
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 6,
                  repeat: Infinity
                }
              }}
            />
          </div>
        }
      >
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-gray-700 text-lg">
            <span className="text-orange-600 mt-1">•</span>
            <span>Preserve authentic Vedic rituals with scriptural precision</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700 text-lg">
            <span className="text-orange-600 mt-1">•</span>
            <span>Make spiritual practices accessible to global devotees</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700 text-lg">
            <span className="text-orange-600 mt-1">•</span>
            <span>Guide seekers through qualified Vedic scholars</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700 text-lg">
            <span className="text-orange-600 mt-1">•</span>
            <span>Nurture a community united in spiritual growth</span>
          </li>
        </ul>
      </Section>

      {/* Vision Section */}
      <Section
        id="vision-section"
        title="Our Sacred Vision"
        description="We envision a world where the eternal wisdom of the Vedas illuminates every aspect of human life. Vaidic Parampara aspires to create a global spiritual community where authentic Vedic practices transcend geographical boundaries."
        image={
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <img 
              src={kalash} 
              alt="Sacred Kalash" 
              className="w-3/4 max-w-xs object-contain"
            />
            <motion.img 
              src={omSymbol}
              alt="Om Symbol"
              className="absolute top-6 right-6 w-12 h-12"
              animate={animations.rotate}
            />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-md border border-orange-100">
            <div className="text-3xl mb-3">🕉️</div>
            <h3 className="text-lg font-semibold text-orange-700 mb-2">Global Presence</h3>
            <p className="text-gray-700">For authentic Vedic practices</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-orange-100">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-lg font-semibold text-orange-700 mb-2">Innovative Access</h3>
            <p className="text-gray-700">To sacred traditions</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-orange-100">
            <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
            <h3 className="text-lg font-semibold text-orange-700 mb-2">Enlightened Community</h3>
            <p className="text-gray-700">Of spiritual seekers</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-orange-100">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-semibold text-orange-700 mb-2">Vedic Education</h3>
            <p className="text-gray-700">For all generations</p>
          </div>
        </div>
      </Section>

      {/* Mission Section */}
      <Section
        id="mission-section"
        title="Our Divine Mission"
        description="Our sacred mission is to provide authentic Vedic services that transform lives. Each ritual is performed with scriptural precision and divine devotion, creating a conduit for spiritual blessings."
        bgColor="bg-amber-50"
        reverse={true}
        image={
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <motion.img 
              src={diyas} 
              alt="Sacred Diyas" 
              className="w-3/4 max-w-xs object-contain"
              animate={{
                y: [0, -15, 0],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.img 
              src={swastik}
              alt="Swastik"
              className="absolute bottom-6 right-6 w-12 h-12"
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  duration: 4,
                  repeat: Infinity
                }
              }}
            />
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex gap-4 items-start p-4 bg-white rounded-lg shadow-sm">
            <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1 text-lg font-bold">1</div>
            <p className="text-gray-700 text-lg">Conduct Vedic ceremonies with utmost devotion and precision</p>
          </div>
          <div className="flex gap-4 items-start p-4 bg-white rounded-lg shadow-sm">
            <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1 text-lg font-bold">2</div>
            <p className="text-gray-700 text-lg">Provide guidance through enlightened Vedic scholars</p>
          </div>
          <div className="flex gap-4 items-start p-4 bg-white rounded-lg shadow-sm">
            <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1 text-lg font-bold">3</div>
            <p className="text-gray-700 text-lg">Educate about the profound significance of rituals</p>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <section 
        id="values-section"
        className="py-16 md:py-24 px-4 bg-white"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-4">Our Eternal Values</h2>
            <p className="text-gray-600 text-lg">The guiding principles that illuminate our path</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🕉️", title: "Authenticity", desc: "Uncompromising adherence to scriptural Vedic traditions" },
              { icon: "🙏", title: "Devotion", desc: "Every act performed with divine love and reverence" },
              { icon: "📜", title: "Knowledge", desc: "Preserving and sharing the ocean of Vedic wisdom" },
              { icon: "🌐", title: "Accessibility", desc: "Making sacred traditions available to all sincere seekers" },
              { icon: "🤲", title: "Service", desc: "Selfless dedication to spiritual upliftment of all" },
              { icon: "✨", title: "Transformation", desc: "Facilitating spiritual evolution through sacred practices" }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-orange-700 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="relative py-20 px-4 bg-gradient-to-r from-orange-600 to-red-700 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Begin Your Sacred Journey</h2>
          <p className="text-amber-100 mb-8 text-xl">Experience the divine blessings of authentic Vedic traditions</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              className="bg-white text-orange-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Pooja
            </motion.button>
            <motion.button 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Consult a Pandit
            </motion.button>
          </div>
        </div>
        <motion.div 
          className="absolute right-10 bottom-10 opacity-20 hidden md:block"
          animate={animations.rotate}
        >
          <img src={omSymbol} alt="Om Symbol" className="w-32 h-32" />
        </motion.div>
      </section>
    </div>
  )
}

export default AboutUs