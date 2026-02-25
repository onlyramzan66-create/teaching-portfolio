import scienceData from "./data/science_courses.json";

export default function CoursesStructuredData() {
  const base = "https://www.gohar.online";

  const courses = [] as any[];

  // collect a selection of courses from each subject
  const subjects = Object.keys(scienceData) as string[];
  subjects.forEach((sub) => {
    const list = (scienceData as any)[sub] as any[];
    list.slice(0, 2).forEach((c) => {
      courses.push({
        "@type": "Course",
        name: c.title,
        description: c.description,
        provider: {
          "@type": "Organization",
          name: "GoharOnline",
          sameAs: base
        },
        url: `${base}/${sub}/${c.slug}`
      });
    });
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": courses
        })
      }}
    />
  );
}
