'use client'
import { WavyBackground } from "./ui/wavy-background"
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { motion } from "framer-motion";
import { Award, BookOpen, Users, Star } from "lucide-react";

const instructors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      designation: 'Mathematics Expert',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      designation: 'Physics Specialist',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      designation: 'Chemistry Tutor',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      designation: 'Biology Teacher',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 5,
      name: 'Alex Thompson',
      designation: 'Computer Science Instructor',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 6,
      name: 'Lisa Park',
      designation: 'Web Development Coach',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 7,
      name: 'Dr. Ahmed Hassan',
      designation: 'Quran Studies Expert',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
  ];

function Instructors() {
  return (
    <div className="relative py-20 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-full mb-6">
            <span className="text-purple-400 font-medium text-sm flex items-center gap-2">
              <Award size={16} />
              Expert Faculty
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Meet Our
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Expert Instructors
            </span>
          </h2>

          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            Learn from industry-leading educators with decades of combined experience in teaching and mentoring
          </p>
        </div>

        {/* Instructors Display */}
        <div className="relative h-[40rem] overflow-hidden flex items-center justify-center">
          <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
            <div className="flex flex-row items-center justify-center mb-10 w-full">
              <AnimatedTooltip items={instructors} />
            </div>
          </WavyBackground>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "50+", label: "Expert Teachers", icon: Users, color: "from-blue-500 to-cyan-500" },
            { number: "2500+", label: "Students Taught", icon: BookOpen, color: "from-emerald-500 to-teal-500" },
            { number: "4.9", label: "Average Rating", icon: Star, color: "from-yellow-500 to-orange-500" },
            { number: "100%", label: "Satisfaction Rate", icon: Award, color: "from-purple-500 to-pink-500" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Instructors