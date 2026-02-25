export default function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GoharOnline",
    "url": "https://www.gohar.online",
    "logo": "https://www.gohar.online/images/logo.png",
    "sameAs": [
      "https://www.facebook.com/gohar.online"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+923247279379",
        "contactType": "customer support",
        "areaServed": "PK",
        "availableLanguage": ["English"]
      }
    ]
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "GoharOnline",
    "url": "https://www.gohar.online",
    "telephone": "+923247279379",
    "email": "asifgohar217@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK",
      "addressRegion": "Pakistan"
    },
    "areaServed": "Pakistan"
  };

  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.gohar.online",
    "name": "GoharOnline",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.gohar.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const graph = [org, localBusiness, site];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@graph": graph }) }}
    />
  );
}
