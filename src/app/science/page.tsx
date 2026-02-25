'use client';

import Image from "next/image";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import scienceData from "../components/data/science_courses.json";
import {
  Star,
  Clock,
  Users,
  Award,
  BookOpen,
  Atom,
  Calculator,
  Leaf,
  Beaker,
  Globe,
  Monitor,
  TrendingUp,
  CheckCircle,
  FileText,
  CalendarCheck,
} from "lucide-react";

type Course = (typeof scienceData.physics)[number];

const studentBenefits = [
  {
    title: "Exam-Focused Study Plan",
    description: "Weekly targets with topic coverage aligned to A Level and O Level exam patterns.",
    icon: FileText,
  },
  {
    title: "Past Paper Practice",
    description: "Timed past-paper drills with marking scheme discussion and improvement feedback.",
    icon: CheckCircle,
  },
  {
    title: "Progress Tracking",
    description: "Regular performance updates so students and parents can track growth clearly.",
    icon: TrendingUp,
  },
  {
    title: "Flexible Class Timing",
    description: "Classes planned around school schedule, tests, and student availability.",
    icon: CalendarCheck,
  },
];

const faqItems = [
  {
    question: "Which levels do you teach for science subjects?",
    answer:
      "We teach O Level and A Level students, with focused support for concept building and exam preparation.",
  },
  {
    question: "Do you provide past-paper practice?",
    answer:
      "Yes. Past-paper practice is included in the teaching plan with marking guidance and exam strategy.",
  },
  {
    question: "Can I book a trial class before enrolling?",
    answer:
      "Yes. You can contact us to book a demo class and discuss your subject requirements.",
  },
];

export default function SciencePage() {
  const [imageFallbacks, setImageFallbacks] = useState<Record<string, string>>({});

  const courses: Course[] = useMemo(
    () => [
      ...scienceData.physics,
      ...scienceData.mathematics,
      ...scienceData.biology,
      ...scienceData.chemistry,
      ...scienceData.english,
      ...scienceData.computer_science,
      ...scienceData.economics,
      ...scienceData.geography,
    ],
    [],
  );

  const featuredCourses = useMemo(() => courses.slice(0, 9), [courses]);

  const getFallbackImage = (title: string) => {
    const normalizedTitle = title.toLowerCase();
    if (normalizedTitle.includes("physics")) return "/science/physics.jpg";
    if (normalizedTitle.includes("math")) return "/science/math.JPG";
    if (normalizedTitle.includes("biology")) return "/science/bio.JPG";
    if (normalizedTitle.includes("chemistry")) return "/science/chemistry.jpg";
    if (normalizedTitle.includes("english")) return "/science/english.jpg";
    if (normalizedTitle.includes("computer")) return "/science/math-advanced.jpg";
    if (normalizedTitle.includes("economics")) return "/science/english.jpg";
    if (normalizedTitle.includes("geography")) return "/science/bio-advanced.jpg";
    return "/science/physics.jpg";
  };

  const stats = [
    { number: "1200+", label: "Students Enrolled", icon: Users },
    { number: "4.7", label: "Average Rating", icon: Star },
    { number: "95%", label: "Success Rate", icon: Award },
    { number: "15+", label: "Courses Offered", icon: BookOpen },
  ];

  const subjects = [
    {
      icon: Atom,
      title: "A Level / O Level Physics",
      description: "Mechanics, thermodynamics, electricity, optics, and modern physics.",
      courses: scienceData.physics.length,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calculator,
      title: "A Level / O Level Mathematics",
      description: "Algebra, trigonometry, calculus, statistics, and exam problem solving.",
      courses: scienceData.mathematics.length,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Leaf,
      title: "A Level / O Level Biology",
      description: "Cell biology, genetics, physiology, ecology, and practical understanding.",
      courses: scienceData.biology.length,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Beaker,
      title: "A Level / O Level Chemistry",
      description: "Atomic structure, bonding, organic chemistry, and practical applications.",
      courses: scienceData.chemistry.length,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BookOpen,
      title: "A Level / O Level English",
      description: "Grammar, writing, comprehension, and literature-focused exam preparation.",
      courses: scienceData.english.length,
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Monitor,
      title: "A Level / O Level Computer Science",
      description: "Programming basics, logic building, and algorithmic thinking for exams.",
      courses: scienceData.computer_science.length,
      color: "from-teal-500 to-blue-500",
    },
    {
      icon: TrendingUp,
      title: "A Level / O Level Economics",
      description: "Microeconomics, macroeconomics, market behavior, and data interpretation.",
      courses: scienceData.economics.length,
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "A Level / O Level Geography",
      description: "Physical and human geography with case-study and exam writing practice.",
      courses: scienceData.geography.length,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
        <section className="relative py-20 px-4 pt-32">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
                A Level / O Level Science Tuition Online
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Build strong concepts, improve grades, and prepare confidently for board exams with structured science tutoring and weekly assessment support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#featured-courses"
                    className="inline-flex px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Explore Courses
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex px-8 py-4 border-2 border-emerald-400 text-emerald-400 font-semibold rounded-full hover:bg-emerald-400 hover:text-white transition-all duration-300"
                  >
                    Book Demo Class
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center rounded-xl border border-white/10 bg-white/5 p-4">
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

        <section id="subjects" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">Subjects We Teach</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Science and allied subjects taught with exam-oriented planning and concept-driven methodology.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${subject.color} rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300`} />
                  <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 h-full">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center mb-4`}>
                      <subject.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{subject.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{subject.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-semibold">{subject.courses} Courses</span>
                      <Link href="#featured-courses" className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors">
                        View
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">Why Students Choose This Program</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Every course is designed to improve confidence, grades, and exam performance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <benefit.icon className="w-8 h-8 text-emerald-400 mb-3" />
                  <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-300 leading-6">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="featured-courses" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">Featured Science Courses</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Choose a course and enroll directly. For personalized guidance, book a demo class first.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                >
                  <CardContainer className="w-full h-full" containerClassName="py-4">
                    <CardBody className="relative w-full h-auto min-h-[40rem] rounded-2xl p-[2px] bg-gradient-to-br from-emerald-500 via-cyan-500 to-purple-600">
                      <div className="bg-gray-900 rounded-2xl flex flex-col h-full p-6 border border-white/10">
                        <CardItem translateZ="100" className="w-full mb-4">
                          <div className="h-52 md:h-56 w-full relative rounded-xl overflow-hidden">
                            <Image
                              src={imageFallbacks[course.slug] || course.image}
                              alt={course.title}
                              fill
                              className="object-cover"
                              onError={() =>
                                setImageFallbacks((prev) => ({
                                  ...prev,
                                  [course.slug]: getFallbackImage(course.title),
                                }))
                              }
                            />
                          </div>
                        </CardItem>

                        <CardItem translateZ="50" className="w-full text-xl font-bold text-white mb-2">
                          {course.title}
                        </CardItem>

                        <CardItem as="p" translateZ="60" className="w-full text-gray-400 text-sm mb-4 flex-grow leading-6">
                          {course.description}
                        </CardItem>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-300">
                            <Clock className="w-4 h-4 mr-2 text-emerald-400" />
                            {course.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-300">
                            <Users className="w-4 h-4 mr-2 text-emerald-400" />
                            {course.level}
                          </div>
                          <div className="flex items-center text-sm text-gray-300">
                            <Star className="w-4 h-4 mr-2 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>

                        <div className="text-lg font-bold text-emerald-400 mb-4">${course.price}/hour</div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            href={`/contact?course=${encodeURIComponent(course.title)}`}
                            className="inline-flex w-full justify-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                          >
                            Enroll
                          </Link>
                        </motion.div>
                      </div>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Science Tuition FAQ</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-white font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-300 text-sm leading-6">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}