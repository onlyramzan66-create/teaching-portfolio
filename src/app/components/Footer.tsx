import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Globe,
  MessageCircle,
} from "lucide-react";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-300 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-blue-400/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">GoharOnline</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering students through expert online and onsite teaching in Quran studies,
              science, computer science, and web development.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/gohar.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://www.gohar.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Our Courses
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-emerald-400"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/matric" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Matric
                </Link>
              </li>
              <li>
                <Link href="/fsc" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  FSC
                </Link>
              </li>
              <li>
                <Link href="/o-a-level" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  O / A Level
                </Link>
              </li>
              <li>
                <Link href="/quran" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Quran Online Teaching
                </Link>
              </li>
              <li>
                <Link href="/computer" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Computer Science
                </Link>
              </li>
              <li>
                <Link href="/web-development" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Web Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/blog/student-submit" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Submit Article
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/become-tutor" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Become Tutor
                </Link>
              </li>
              <li>
                <Link href="/home-tutor-pakistan" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  Home Tutor Pakistan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-emerald-400"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="text-emerald-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-400 text-sm">Email Us</p>
                  <a href="mailto:asifgohar217@gmail.com" className="text-white hover:text-emerald-400 transition-colors duration-300">
                    asifgohar217@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-400 text-sm">Call Us</p>
                  <a href="tel:+923247279379" className="text-white hover:text-blue-400 transition-colors duration-300 block">
                    +92 324 7279379
                  </a>
                  <a href="tel:+923007576243" className="text-white hover:text-blue-400 transition-colors duration-300 block">
                    +92 300 7576243
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-400 text-sm">WhatsApp</p>
                  <a href="https://wa.me/923247279379" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors duration-300 block">
                    +92 324 7279379
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Quick response guaranteed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              (c) {new Date().getFullYear()} GoharOnline. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
    </footer>
  );
}

export default Footer;
