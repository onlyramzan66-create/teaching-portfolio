"use client";

import React, { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import {
  Mail as MailIcon,
  Smartphone as PhoneIcon,
  User,
  CheckCircle,
  X as XIcon,
  AlertCircle,
  BadgeCheck,
  BookOpen,
  Clock3,
  Users,
  ArrowRight,
  FileText,
} from "lucide-react";
import { submitTutorApplication, uploadTutorResume } from "@/lib/blogApi";

const WHATSAPP_NUMBER = "+923247279379";

export default function BecomeTutorPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cityOptions = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Sialkot",
    "Other",
  ];

  const subjectOptions = [
    "A-Level Chemistry",
    "O-Level Chemistry",
    "A-Level Physics",
    "O-Level Physics",
    "A-Level Mathematics",
    "O-Level Mathematics",
    "Computer Science",
    "Biology",
    "Quran Studies",
    "Web Development",
    "Multiple Subjects",
  ];

  const experienceOptions = [
    "Fresh (0-1 year)",
    "Intermediate (1-3 years)",
    "Experienced (3-5 years)",
    "Senior (5+ years)",
  ];

  const availabilityOptions = [
    "Weekday Morning",
    "Weekday Afternoon",
    "Weekday Evening",
    "Weekend Morning",
    "Weekend Evening",
    "Flexible",
  ];

  const inputClass =
    "mt-1 w-full rounded-xl bg-neutral-900/80 border border-white/15 px-3 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all";
  const labelClass = "text-sm font-medium text-neutral-200";

  function openToast(type: "success" | "error", text: string) {
    setToast({ type, text });
    window.setTimeout(() => setToast(null), 4500);
  }

  async function handleResumeUpload() {
    const file = resumeRef.current?.files?.[0];
    if (!file) {
      setErrorMessage("Please choose a resume file first.");
      openToast("error", "Please select a file.");
      return;
    }

    setUploadingResume(true);
    setErrorMessage(null);

    try {
      const url = await uploadTutorResume(file);
      setResumeUrl(url);
      openToast("success", "Resume uploaded successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Resume upload failed.";
      setErrorMessage(message);
      openToast("error", message);
    } finally {
      setUploadingResume(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!formRef.current) return;

    const f = new FormData(formRef.current);
    const fullName = ((f.get("fullName") as string) || "").trim();
    const email = ((f.get("email") as string) || "").trim();
    const phone = ((f.get("phone") as string) || "").trim();
    const city = ((f.get("city") as string) || "").trim();
    const teachingMode = ((f.get("teachingMode") as string) || "").trim();
    const subjects = ((f.get("subjects") as string) || "").trim();
    const experience = ((f.get("experience") as string) || "").trim();
    const availability = ((f.get("availability") as string) || "").trim();
    const coverMessage = ((f.get("coverMessage") as string) || "").trim();

    if (!fullName || !email || !phone || !city || !teachingMode || !subjects || !experience || !availability || !coverMessage) {
      const msg = "Please complete all required fields before submitting.";
      setErrorMessage(msg);
      openToast("error", msg);
      return;
    }

    if (!resumeUrl) {
      const msg = "Please upload your resume before submitting the form.";
      setErrorMessage(msg);
      openToast("error", msg);
      return;
    }

    setLoading(true);
    try {
      const response = await submitTutorApplication({
        fullName,
        email,
        phone,
        city,
        teachingMode,
        subjects,
        experience,
        availability,
        coverMessage,
        resumeUrl,
      });

      setSuccessMessage(response.message);
      openToast("success", "Application submitted successfully.");
      setResumeUrl("");
      if (resumeRef.current) {
        resumeRef.current.value = "";
      }
      formRef.current.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit application.";
      setErrorMessage(message);
      openToast("error", message);
    } finally {
      setLoading(false);
    }
  }

  function openWhatsAppPreview() {
    const formEl = formRef.current;
    if (!formEl) return;
    const f = new FormData(formEl);
    const textLines = [
      "Hello, I want to apply to become a tutor at GoharOnline.",
      `Name: ${(f.get("fullName") as string) || "[Your Name]"}`,
      `Email: ${(f.get("email") as string) || "[Your Email]"}`,
      `Phone: ${(f.get("phone") as string) || "[Your Phone]"}`,
      `City: ${(f.get("city") as string) || "[Your City]"}`,
      `Teaching mode: ${(f.get("teachingMode") as string) || "[Online/Home/Hybrid]"}`,
      `Subjects: ${(f.get("subjects") as string) || "[Subjects]"}`,
      `Experience: ${(f.get("experience") as string) || "[Experience]"}`,
      `Availability: ${(f.get("availability") as string) || "[Availability]"}`,
      `Message: ${(f.get("coverMessage") as string) || "[Message]"}`,
      `Resume URL: ${resumeUrl || "[Upload Resume First]"}`,
    ];
    const text = encodeURIComponent(textLines.join("\n"));
    const phoneDigits = WHATSAPP_NUMBER.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneDigits}?text=${text}`, "_blank");
    openToast("success", "WhatsApp opened. You can also contact there.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black antialiased pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%)] pointer-events-none" />
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-emerald-300 text-sm">
            <BadgeCheck className="w-4 h-4" />
            Hiring Tutors
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-bold text-white">
            Become a Tutor at GoharOnline
          </h1>
          <p className="mt-4 max-w-3xl text-gray-300 leading-relaxed text-lg">
            Submit your profile with resume. Admin reviews each application and manages status from the dashboard.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 relative z-10">
            {[
              { icon: Users, title: "Active Student Demand", text: "Consistent learner inquiries" },
              { icon: Clock3, title: "Flexible Hours", text: "Choose your own schedule" },
              { icon: BookOpen, title: "Multiple Subjects", text: "Academic + skill tracks" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-sm">
                <item.icon className="w-5 h-5 text-emerald-400" />
                <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="become-tutor-form-heading"
          className="rounded-3xl border border-white/10 bg-neutral-900/75 p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <User className="text-emerald-400" />
            <h2 id="become-tutor-form-heading" className="text-2xl font-semibold text-white">
              Tutor Application Form
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mb-6">
            Complete all required fields and upload your resume (PDF, DOC, DOCX).
          </p>

          <div className="mb-4">
            {successMessage && (
              <div className="mb-4 flex items-start gap-3 rounded-lg bg-green-500/10 border border-green-500/30 p-3">
                <CheckCircle className="text-green-400" />
                <div>
                  <div className="font-semibold text-green-300">Success</div>
                  <div className="text-sm text-green-200">{successMessage}</div>
                </div>
                <button
                  aria-label="Dismiss success"
                  onClick={() => setSuccessMessage(null)}
                  className="ml-auto text-green-200 hover:text-white"
                >
                  <XIcon />
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 flex items-start gap-3 rounded-lg bg-red-600/10 border border-red-600/30 p-3">
                <AlertCircle className="text-red-400" />
                <div className="flex-1">
                  <div className="font-semibold text-red-300">Error</div>
                  <div className="text-sm text-red-200 whitespace-pre-wrap">{errorMessage}</div>
                </div>
                <button
                  aria-label="Dismiss error"
                  onClick={() => setErrorMessage(null)}
                  className="ml-auto text-red-200 hover:text-white"
                >
                  <XIcon />
                </button>
              </div>
            )}
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className={labelClass}>Full Name *</span>
                <input name="fullName" required placeholder="Ali Khan" className={inputClass} />
              </label>

              <label className="block">
                <span className={labelClass}>Email *</span>
                <div className="mt-1 relative">
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="you@example.com"
                    className={`${inputClass} pr-10 mt-0`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    <MailIcon size={16} />
                  </span>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block sm:col-span-1">
                <span className={labelClass}>Phone *</span>
                <input name="phone" placeholder="+92 3XX XXXXXXX" required className={inputClass} />
              </label>

              <label className="block sm:col-span-1">
                <span className={labelClass}>City *</span>
                <select name="city" defaultValue="" required className={inputClass}>
                  <option value="" className="bg-neutral-800">Select City</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city} className="bg-neutral-800">
                      {city}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-1">
                <span className={labelClass}>Teaching Mode *</span>
                <select name="teachingMode" defaultValue="" required className={inputClass}>
                  <option value="" className="bg-neutral-800">Select Teaching Mode</option>
                  <option value="Online" className="bg-neutral-800">Online</option>
                  <option value="Home Tutor - Pakistan" className="bg-neutral-800">Home Tutor - Pakistan</option>
                  <option value="Hybrid" className="bg-neutral-800">Hybrid</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>Subjects / Courses *</span>
              <select name="subjects" required defaultValue="" className={inputClass}>
                <option value="" className="bg-neutral-800">Select Subject / Course</option>
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject} className="bg-neutral-800">
                    {subject}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Experience & Qualifications *</span>
              <select name="experience" defaultValue="" required className={inputClass}>
                <option value="" className="bg-neutral-800">Select Experience Level</option>
                {experienceOptions.map((exp) => (
                  <option key={exp} value={exp} className="bg-neutral-800">
                    {exp}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Availability *</span>
              <select name="availability" defaultValue="" required className={inputClass}>
                <option value="" className="bg-neutral-800">Select Availability</option>
                {availabilityOptions.map((slot) => (
                  <option key={slot} value={slot} className="bg-neutral-800">
                    {slot}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Cover Message *</span>
              <textarea
                name="coverMessage"
                placeholder="Write a short introduction and why you want to teach at GoharOnline."
                rows={4}
                required
                className={`${inputClass} min-h-[110px]`}
              />
            </label>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm font-medium text-white">Resume Upload *</p>
              <p className="mt-1 text-xs text-gray-400">Accepted formats: PDF, DOC, DOCX (max 8MB)</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" className="text-sm text-gray-200" />
                <button
                  type="button"
                  onClick={() => void handleResumeUpload()}
                  disabled={uploadingResume}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-300/35 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/10 disabled:opacity-60"
                >
                  <FileText size={16} />
                  {uploadingResume ? "Uploading..." : "Upload Resume"}
                </button>
              </div>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm text-emerald-300 hover:text-emerald-200"
                >
                  Resume uploaded successfully - View File
                </a>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-black shadow hover:scale-[1.01] transition disabled:opacity-60 min-w-[180px]"
              >
                <MailIcon size={16} />
                <span>{loading ? "Submitting..." : "Send Application"}</span>
              </button>

              <button
                type="button"
                onClick={openWhatsAppPreview}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-green-600 transition min-w-[180px]"
              >
                <PhoneIcon size={16} />
                <span>Apply via WhatsApp</span>
              </button>

              <Link href="/contact" className="ml-auto inline-flex items-center text-sm text-neutral-300 hover:text-neutral-100">
                Other Contact Options
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </form>
        </section>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition transform ${
            toast.type === "success" ? "bg-emerald-600 text-black" : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? <CheckCircle /> : <XIcon />}
          <span className="text-sm font-medium">{toast.text}</span>
        </div>
      )}
    </main>
  );
}
