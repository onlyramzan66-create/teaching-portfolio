"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import servicesData from "../components/data/web_services.json";
import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  Cloud,
  Code,
  Code2,
  Database,
  DollarSign,
  Globe,
  Layers,
  MessageSquare,
  Palette,
  Rocket,
  Search,
  Server,
  Shield,
  Star,
  X,
  Zap,
} from "lucide-react";

type Service = (typeof servicesData.services)[number];

export default function WebDevelopmentPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const stats = [
    { number: "50+", label: "Projects Delivered", icon: Code },
    { number: "4.8/5", label: "Average Client Rating", icon: Star },
    { number: "99%", label: "On-Time Delivery", icon: Award },
    { number: "24/7", label: "Message Support", icon: Zap },
  ];

  const technologies = [
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Layers },
    { name: "Node.js", icon: Server },
    { name: "NestJS", icon: Shield },
    { name: "MongoDB", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "AWS", icon: Cloud },
    { name: "Tailwind", icon: Palette },
  ];

  const process = [
    {
      title: "Discovery & Scope",
      description: "We define business goals, user flows, pages, and a clear project timeline.",
      icon: Search,
    },
    {
      title: "UI/UX & Architecture",
      description: "Wireframes, component structure, and backend planning before development begins.",
      icon: Layers,
    },
    {
      title: "Development Sprint",
      description: "Production-grade coding with weekly updates, testing, and performance checks.",
      icon: Code,
    },
    {
      title: "Launch & Support",
      description: "Deployment, handover, and post-launch support so your product stays stable.",
      icon: Rocket,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <section className="relative py-20 px-4 pt-36">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 mb-6">
              <Shield className="w-4 h-4" />
              Professional MERN Stack Services
            </span>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Web Development That Converts
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto">
              From portfolio websites to full SaaS platforms, I build fast, scalable, and secure web apps with clean UX and reliable backend systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Start Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="px-8 py-4 border-2 border-emerald-400 text-emerald-400 font-semibold rounded-full hover:bg-emerald-400 hover:text-white transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technologies Used In Production
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every build focuses on performance, scalability, maintainable code, and clean user experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.04 }}
                className="flex flex-col items-center justify-center p-5 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-emerald-400/40 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-full bg-emerald-400/15 flex items-center justify-center mb-3">
                  <tech.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <span className="text-white font-semibold text-sm text-center">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Professional Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the service package that fits your project stage, goals, and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {servicesData.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <CardContainer className="w-full h-full" containerClassName="py-4">
                  <CardBody className="relative w-full h-auto rounded-2xl p-[2px] bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.45)]">
                    <div className="bg-gray-900 rounded-2xl flex flex-col h-full p-6 border border-white/10">
                      <CardItem translateZ="100" className="w-full mb-4">
                        <div className="h-56 md:h-64 w-full relative rounded-xl overflow-hidden">
                          <Image src={service.image} alt={service.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                            Delivery: {service.delivery}
                          </div>
                        </div>
                      </CardItem>

                      <div className="flex items-center justify-between mb-4 gap-2">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                          {index < 2 ? "Most Requested" : "Custom Build"}
                        </span>
                        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{service.rating}</span>
                          <span className="text-yellow-100/70">|</span>
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{service.reviews}</span>
                        </div>
                      </div>

                      <CardItem translateZ="50" className="w-full text-xl font-bold text-white mb-2 leading-snug">
                        {service.title}
                      </CardItem>

                      <CardItem as="p" translateZ="60" className="w-full text-gray-400 text-sm mb-4 flex-grow leading-6">
                        {service.description}
                      </CardItem>

                      <div className="mb-4 space-y-2">
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">What you get</p>
                        {service.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-start text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 3 && (
                          <div className="text-sm text-cyan-300 font-medium">+{service.features.length - 3} more features included</div>
                        )}
                      </div>

                      <div className="flex justify-between items-center mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-emerald-200/75 mb-0.5">Starting from</p>
                          <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-emerald-400 mr-1" />
                          <span className="text-2xl font-bold text-emerald-400">${service.price}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-200 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5">
                          <Clock className="w-4 h-4 mr-1.5 text-cyan-300" />
                          {service.delivery}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedService(service)}
                          className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-white/10"
                          type="button"
                        >
                          Details
                        </button>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Hire Me
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">How We Work Together</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A simple, transparent process designed to keep your project on track.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="w-11 h-11 rounded-full bg-emerald-400/20 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-6">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl p-[2px] bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600">
              <div className="relative bg-gray-900 rounded-2xl p-8 text-white">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2">{selectedService.title}</h3>
                    <p className="text-gray-300 mb-4">{selectedService.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-white font-semibold">{selectedService.rating}</span>
                        <span className="text-gray-400 text-sm ml-1">({selectedService.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-emerald-400 mr-2" />
                        <span className="text-white">{selectedService.delivery}</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-emerald-400 mr-2" />
                        <span className="text-white">Secure & Reliable</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-emerald-400 mr-2" />
                        <span className="text-white">Production Ready</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-80 h-48 relative rounded-xl overflow-hidden">
                    <Image src={selectedService.image} alt={selectedService.title} fill className="object-cover" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Features Included
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedService.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedService.technologies && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <Code className="w-5 h-5 text-emerald-400 mr-2" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedService.includes && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3">What&apos;s Included</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedService.includes.map((item) => (
                          <div key={item} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-semibold">Service Fee</span>
                        <p className="text-sm text-gray-400">One-time payment with no hidden charges</p>
                      </div>
                      <span className="text-3xl font-bold text-emerald-400">${selectedService.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <Link
                    href="/contact"
                    className="flex-1 w-full px-6 py-3 text-center bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
