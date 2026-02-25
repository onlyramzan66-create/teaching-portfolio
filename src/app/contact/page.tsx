"use client";
import React, { FormEvent, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Spotlight } from "../components/ui/Spotlight";
import dynamic from "next/dynamic";
import Link from "next/link";
const BackgroundBeams = dynamic(
  () => import("../components/ui/background-beams").then((mod) => mod.BackgroundBeams),
  { ssr: false }
);
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  Users,
  Star,
  Globe,
  BookOpen,
  Code,
  Beaker,
  Calculator,
  GraduationCap,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phone, setPhone] = useState('');
const [course, setCourse] = useState('');
const [level, setLevel] = useState('');
const [schedule, setSchedule] = useState('');
const [learningMode, setLearningMode] = useState('Online');

  const courseOptions = [
    "A Level / O Level Physics",
    "A Level / O Level Mathematics",
    "A Level / O Level Biology",
    "A Level / O Level Chemistry",
    "A Level / O Level English",
    "A Level / O Level Computer Science",
    "A Level / O Level Economics",
    "A Level / O Level Geography",
    "Quran Studies",
    "Web Development",
    "Home Tutor Program",
  ];

  const levelOptions = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "O Level",
    "A Level",
    "Matric",
    "FSc",
  ];

  const scheduleOptions = [
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 4 PM)",
    "Evening (4 PM - 9 PM)",
    "Weekend Only",
    "Flexible",
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseFromQuery = params.get("course");
    if (courseFromQuery) {
      setCourse(courseFromQuery);
    }
  }, []);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const now = new Date().toLocaleString();
    const templateParams = {
      name: name || "Not provided",
      from_name: name || "Not provided",
      from_email: email || "Not provided",
      email: email || "Not provided",
      phone: phone || "Not provided",
      course: course || "Not selected",
      level: level || "Not specified",
      schedule: schedule || "Not specified",
      preferred_schedule: schedule || "Not specified",
      learning_mode: learningMode || "Online",
      learningMode: learningMode || "Online",
      message: message || "No message provided",
      time: now,
      submitted_at: now,
      subject: `New Contact Request - ${name || "Student"}`,
      inquiry_type: "Website Contact Form",
      source_page: "Contact Page",
      website: typeof window !== "undefined" ? window.location.href : "Contact Page",
    };

    emailjs
      .send(
        "service_9qxx6ch",
        "template_twclyym",
        templateParams,
        "Gulm7QB-1k3Nu1xmx",
      )

      .then(() => {
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setPhone('');
      setCourse('');
      setLevel('');
      setSchedule('');
      setLearningMode('Online');
      setTimeout(() => setSuccess(false), 5000);
    })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly for immediate assistance",
      contact: "+92 324 7279379",
      action: "tel:+923247279379",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick responses via WhatsApp messaging",
      contact: "+92 324 7279379",
      action: "https://wa.me/923247279379",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed inquiries via email",
      contact: "asifgohar217@gmail.com",
      action: "mailto:asifgohar217@gmail.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Office Hours",
      description: "Available during these hours",
      contact: "Mon-Sat: 9AM-9PM PKT",
      action: null,
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "24/7", label: "Response Time", icon: Clock },
    { number: "1000+", label: "Students Helped", icon: Users },
    { number: "4.9", label: "Satisfaction Rate", icon: Star },
    { number: "5+", label: "Years Experience", icon: GraduationCap }
  ];

  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer: "We typically respond within 2-4 hours during business hours and within 24 hours on weekends."
    },
    {
      question: "Do you offer trial classes?",
      answer: "Yes! We offer a free trial class for all our courses so you can experience our teaching methodology."
    },
    {
      question: "What subjects do you teach?",
      answer: "We specialize in Chemistry, Computer Science, Mathematics, Physics, Biology, Quran Studies, and Web Development."
    },
    {
      question: "Are classes recorded?",
      answer: "No, all our classes are online and onsite one to one, so we do not provide recordings. However, we provide comprehensive notes and resources for each session."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/10 to-transparent -z-10" />

      {/* Multiple Spotlights */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="top-40 right-0 md:right-60 md:top-20" fill="blue" />
      <Spotlight className="bottom-40 left-1/2" fill="emerald" />

      {/* Background Beams */}
      <BackgroundBeams className="opacity-20" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mx-auto mb-8"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Ready to start your learning journey? Get in touch with us today.
            <span className="text-emerald-400 font-semibold"> We&apos;re here to help you succeed!</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm text-gray-400 max-w-2xl mx-auto"
          >
            Home tutor service is available for Pakistani students in selected cities.
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT METHODS ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-300">
              Multiple ways to reach us - choose what works best for you
            </p>
          </motion.div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {contactMethods.map((method, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl hover:border-emerald-400/50 transition-all duration-300 h-full text-center">
        <div
          className={`p-4 rounded-xl bg-gradient-to-r ${method.color} mx-auto w-fit mb-4`}
        >
          <method.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{method.description}</p>
        <div className="text-emerald-400 font-semibold mb-4">{method.contact}</div>
        {method.action && (
          <motion.a
            href={method.action}
            target={method.action.startsWith('http') ? '_blank' : undefined}
            rel={
              method.action.startsWith('http') ? 'noopener noreferrer' : undefined
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
          >
            Contact Now
          </motion.a>
        )}
      </div>
    </motion.div>
  ))}
</div>

        </div>
      </section>

      {/* ===== CONTACT FORM & FAQ ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Send us a Message
              </h3>

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Message sent successfully! We&apos;ll get back to you soon.</span>
                </motion.div>
              )}

          <form onSubmit={handleSubmit} className="space-y-6">

  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Full Name
      </label>
      <input
        type="text"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-3 bg-white/5
                   border border-white/20 rounded-xl
                   text-white placeholder-gray-400
                   hover:border-white/30
                   focus:outline-none focus:border-emerald-400
                   focus:ring-1 focus:ring-emerald-400
                   transition-all duration-300"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Email Address
      </label>
      <input
        type="email"
        placeholder="your.email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 bg-white/5
                   border border-white/20 rounded-xl
                   text-white placeholder-gray-400
                   hover:border-white/30
                   focus:outline-none focus:border-emerald-400
                   focus:ring-1 focus:ring-emerald-400
                   transition-all duration-300"
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Phone Number
    </label>
    <input
      type="text"
      placeholder="+92 3xx xxxxxxx"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full px-4 py-3 bg-white/5
                 border border-white/20 rounded-xl
                 text-white placeholder-gray-400
                 hover:border-white/30
                 focus:outline-none focus:border-emerald-400
                 focus:ring-1 focus:ring-emerald-400
                 transition-all duration-300"
    />
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Course
      </label>
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="w-full px-4 py-3 bg-white/5
                   border border-white/20 rounded-xl
                   text-white
                   hover:border-white/30
                   focus:outline-none focus:border-emerald-400
                   focus:ring-1 focus:ring-emerald-400
                   transition-all duration-300"
      >
        <option value="" className="bg-slate-900">Select a course</option>
        {!courseOptions.includes(course) && course && (
          <option value={course} className="bg-slate-900">{course}</option>
        )}
        {courseOptions.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Level
      </label>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full px-4 py-3 bg-white/5
                   border border-white/20 rounded-xl
                   text-white
                   hover:border-white/30
                   focus:outline-none focus:border-emerald-400
                   focus:ring-1 focus:ring-emerald-400
                   transition-all duration-300"
      >
        <option value="" className="bg-slate-900">Select level</option>
        {levelOptions.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
        ))}
      </select>
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Preferred Schedule
    </label>
    <select
      value={schedule}
      onChange={(e) => setSchedule(e.target.value)}
      className="w-full px-4 py-3 bg-white/5
                 border border-white/20 rounded-xl
                 text-white
                 hover:border-white/30
                 focus:outline-none focus:border-emerald-400
                 focus:ring-1 focus:ring-emerald-400
                 transition-all duration-300"
    >
      <option value="" className="bg-slate-900">Select preferred schedule</option>
      {scheduleOptions.map((opt) => (
        <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Learning Mode
    </label>
    <select
      value={learningMode}
      onChange={(e) => setLearningMode(e.target.value)}
      className="w-full px-4 py-3 bg-white/5
                 border border-white/20 rounded-xl
                 text-white
                 hover:border-white/30
                 focus:outline-none focus:border-emerald-400
                 focus:ring-1 focus:ring-emerald-400
                 transition-all duration-300"
    >
      <option value="Online" className="bg-slate-900">Online</option>
      <option value="Home Tutor - Pakistan" className="bg-slate-900">Home Tutor - Pakistan</option>
      <option value="Hybrid" className="bg-slate-900">Hybrid (Online + Home Tutor)</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Message
    </label>
    <textarea
      rows={6}
      placeholder="Tell us about your inquiry..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      required
      className="w-full px-4 py-3 bg-white/5
                 border border-white/20 rounded-xl
                 text-white placeholder-gray-400 resize-none
                 hover:border-white/30
                 focus:outline-none focus:border-emerald-400
                 focus:ring-1 focus:ring-emerald-400
                 transition-all duration-300"
    />
  </div>

  <motion.button
    type="submit"
    disabled={loading}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full px-8 py-4
               bg-gradient-to-r from-emerald-500 to-blue-500
               text-white font-semibold rounded-xl shadow-lg
               hover:shadow-emerald-500/25
               transition-all duration-300
               disabled:opacity-50 disabled:cursor-not-allowed
               flex items-center justify-center gap-3"
  >
    {loading ? (
      <>
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        Sending...
      </>
    ) : (
      <>
        <Send className="w-5 h-5" />
        Send Message
      </>
    )}
  </motion.button>

</form>

            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h3>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-12">
                <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/science"
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:border-blue-400/50 transition-all duration-300 group hover:scale-105"
                  >
                    <Calculator className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-300 font-medium">Science Courses</span>
                  </Link>

                  <Link
                    href="/computer"
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl hover:border-purple-400/50 transition-all duration-300 group hover:scale-105"
                  >
                    <Code className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-purple-300 font-medium">Computer Science</span>
                  </Link>

                  <Link
                    href="/science"
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl hover:border-orange-400/50 transition-all duration-300 group hover:scale-105"
                  >
                    <Beaker className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                    <span className="text-orange-300 font-medium">A Level / O Level Science</span>
                  </Link>

                  <Link
                    href="/quran"
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-xl hover:border-emerald-400/50 transition-all duration-300 group hover:scale-105"
                  >
                    <BookOpen className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-emerald-300 font-medium">Quran Studies</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL MEDIA & LOCATION ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Follow us on social media for updates, tips, and educational content
            </p>

            <div className="flex justify-center gap-6 mb-8">
              {[
                { icon: Facebook, color: "hover:text-blue-400", url: "#" },
                { icon: Instagram, color: "hover:text-pink-400", url: "#" },
                { icon: Twitter, color: "hover:text-blue-300", url: "#" },
                { icon: Youtube, color: "hover:text-red-400", url: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white/5 rounded-xl border border-white/10 hover:border-current transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>Serving students worldwide with online education</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
