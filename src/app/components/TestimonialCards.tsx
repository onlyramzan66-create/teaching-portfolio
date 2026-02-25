"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { Star, Quote } from "lucide-react";

const goharTestimonials = [
  {
    quote:
      "GoharOnline transformed my learning experience completely. The personalized approach and expert guidance helped me excel in Mathematics and Physics. My grades improved from C to A+ in just 6 months!",
    name: "Ahmed Hassan",
    title: "High School Student",
    subject: "Mathematics & Physics",
    rating: 5
  },
  {
    quote:
      "The quality of teaching at GoharOnline is exceptional. My daughter struggled with Chemistry, but their structured approach and dedicated tutors made all the difference. She now loves the subject!",
    name: "Fatima Khan",
    title: "College Student",
    subject: "Chemistry",
    rating: 5
  },
  {
    quote:
      "GoharOnline's flexible scheduling and experienced instructors made it possible for me to balance my job with learning Computer Science. The practical projects really helped me understand the concepts.",
    name: "Omar Ali",
    title: "Working Professional",
    subject: "Computer Science",
    rating: 5
  },
  {
    quote:
      "The interactive online classes and comprehensive study materials provided by GoharOnline helped me achieve my goals in Web Development. The mentorship was invaluable for my career growth.",
    name: "Ayesha Malik",
    title: "University Student",
    subject: "Web Development",
    rating: 5
  },
  {
    quote:
      "As a parent, I was skeptical about online Quran learning, but GoharOnline's qualified teachers and structured approach exceeded my expectations. My child has made tremendous progress.",
    name: "Mrs. Sarah Ahmed",
    title: "Parent",
    subject: "Quran Studies",
    rating: 5
  },
  {
    quote:
      "The best investment I've made in my education! GoharOnline's expert instructors and modern teaching methods made learning Physics enjoyable and effective. Highly recommended!",
    name: "Muhammad Rizwan",
    title: "Engineering Student",
    subject: "Physics",
    rating: 5
  },
];

function GoharTestimonials() {
  return (
    <div className="relative py-20 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 rounded-full mb-6">
            <span className="text-yellow-400 font-medium text-sm flex items-center gap-2">
              <Star size={16} fill="currentColor" />
              Student Success Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            What Our Students
            <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>

          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            Real experiences from students who have transformed their academic journey with GoharOnline
          </p>
        </div>

        {/* Testimonials */}
        <div className="h-[50rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 z-10" />
          <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="w-full max-w-6xl">
              <InfiniteMovingCards
                items={goharTestimonials}
                direction="right"
                speed="slow"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-full">
            <Quote className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Join 1000+ Successful Students</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoharTestimonials;
