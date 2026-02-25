import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PostEntity } from '../posts/entities/post.entity';

const datasource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASS ?? '',
  database: process.env.DB_NAME ?? 'gohar_blog',
  entities: [PostEntity],
  synchronize: false,
});

const posts = [
  {
    title: 'A Level Physics Motion Notes: Core Concepts for Weekly Revision',
    slug: 'a-level-physics-motion-notes-core-concepts-weekly-revision',
    excerpt: 'Student-friendly notes on displacement, velocity, and acceleration with exam-focused examples.',
    content:
      'These notes cover vectors, scalar quantities, uniform acceleration equations, and graph interpretation. Focus on exam style definitions and units. Practice with timed questions after reading this article.',
  },
  {
    title: 'O Level Chemistry: Atomic Structure and Isotopes Simplified',
    slug: 'o-level-chemistry-atomic-structure-and-isotopes-simplified',
    excerpt: 'Clear breakdown of protons, neutrons, electrons, and isotope notation for school tests.',
    content:
      'Learn how to write electronic configurations and explain isotopic abundance. This lesson provides simple memory techniques and short MCQ practice prompts for classroom and home revision.',
  },
  {
    title: 'Biology Cell Structure Notes for Students with Smart Diagrams',
    slug: 'biology-cell-structure-notes-for-students-with-smart-diagrams',
    excerpt: 'Quick notes on plant and animal cells with key terms used in board and Cambridge exams.',
    content:
      'Use these notes to compare organelles, functions, and differences in a structured way. Draw and label at least two diagrams for active recall and stronger long-term memory.',
  },
  {
    title: 'How to Write High Scoring Physics Answers in Structured Form',
    slug: 'how-to-write-high-scoring-physics-answers-in-structured-form',
    excerpt: 'Exam writing framework for definitions, derivations, and numerical solutions.',
    content:
      'Students often lose marks due to incomplete steps. Follow this structure: concept sentence, formula, substitution, unit, and final interpretation. Keep working neat and logically ordered.',
  },
  {
    title: 'Mathematics Trigonometry Notes with Practical Problem Solving',
    slug: 'mathematics-trigonometry-notes-with-practical-problem-solving',
    excerpt: 'A simple guide to identities, ratios, and triangle-based reasoning for exams.',
    content:
      'Understand when to use sine rule, cosine rule, and basic identities. Practice by solving ten mixed questions and checking mistakes by category, not just final answers.',
  },
  {
    title: 'Computer Science Programming Logic Notes for Beginner Students',
    slug: 'computer-science-programming-logic-notes-for-beginner-students',
    excerpt: 'Flowcharts, conditions, loops, and debugging concepts for school learners.',
    content:
      'This article introduces logic building through pseudocode and simple language examples. Students should rewrite each algorithm in their own words before coding for better understanding.',
  },
  {
    title: 'Past Paper Strategy: Complete More Questions in Limited Time',
    slug: 'past-paper-strategy-complete-more-questions-in-limited-time',
    excerpt: 'Time management method for mock tests and final board papers.',
    content:
      'Use the three-pass strategy: easy first, medium second, and difficult last. Keep a strict timer and track attempt accuracy every week for measurable improvement.',
  },
  {
    title: 'Chemistry Bonding Notes: Ionic, Covalent, and Metallic Explained',
    slug: 'chemistry-bonding-notes-ionic-covalent-and-metallic-explained',
    excerpt: 'Compact notes for comparing bond types with examples and properties.',
    content:
      'Understand particle arrangement, conductivity, and melting points through table comparisons. Always connect each bonding type to real compounds asked in papers.',
  },
  {
    title: 'English Essay Writing Format for Academic and Exam Contexts',
    slug: 'english-essay-writing-format-for-academic-and-exam-contexts',
    excerpt: 'A practical essay structure with strong introduction and conclusion patterns.',
    content:
      'Build essays with thesis, three body arguments, examples, and transitions. Keep language clear and formal. Revise grammar and punctuation in the final five minutes.',
  },
  {
    title: 'A Level Mathematics Integration Notes with Stepwise Techniques',
    slug: 'a-level-mathematics-integration-notes-with-stepwise-techniques',
    excerpt: 'Focused integration rules and methods students can apply quickly in papers.',
    content:
      'Covers standard forms, substitution basics, and limits of integration. Students should keep a formula sheet and complete daily short drills for speed and confidence.',
  },
  {
    title: 'Student Study Plan Template: Weekly Routine for Better Grades',
    slug: 'student-study-plan-template-weekly-routine-for-better-grades',
    excerpt: 'A realistic timetable model balancing school, homework, and revision.',
    content:
      'Use 45-minute study blocks with 10-minute breaks. Assign specific subjects to fixed slots and review mistakes weekly. Consistency is more important than long sessions.',
  },
  {
    title: 'Quran Tajweed Basics for Online Students: Rules and Recitation',
    slug: 'quran-tajweed-basics-for-online-students-rules-and-recitation',
    excerpt: 'Beginner-friendly Tajweed notes with practical reading guidance.',
    content:
      'Focus on Makharij and key pronunciation rules. Daily recitation with correction feedback is essential. Keep a small checklist of commonly repeated mistakes.',
  },
  {
    title: 'Physics Electricity Notes: Current, Voltage, Resistance and Power',
    slug: 'physics-electricity-notes-current-voltage-resistance-and-power',
    excerpt: 'Core electrical concepts with formulas and unit-based practice.',
    content:
      'Master Ohm law, series and parallel circuits, and power calculations. Draw clean circuit diagrams and always state final units clearly in numerical questions.',
  },
  {
    title: 'O Level Biology Ecology Notes: Food Chains and Ecosystems',
    slug: 'o-level-biology-ecology-notes-food-chains-and-ecosystems',
    excerpt: 'Easy notes for understanding producers, consumers, and environmental balance.',
    content:
      'Practice creating food webs and identifying energy transfer losses. Use local ecosystem examples to improve long-answer quality and conceptual clarity.',
  },
  {
    title: 'How to Revise from Notes and Convert Them into Test Questions',
    slug: 'how-to-revise-from-notes-and-convert-them-into-test-questions',
    excerpt: 'A method to transform passive reading into active recall practice.',
    content:
      'After each topic, write five short questions from your notes and attempt without looking. This approach improves retention and identifies weak concepts quickly.',
  },
  {
    title: 'Computer Science Database Basics: Tables, Keys, and Normalization',
    slug: 'computer-science-database-basics-tables-keys-and-normalization',
    excerpt: 'Student-level introduction to relational databases and table design.',
    content:
      'Learn primary keys, foreign keys, and simple normalization logic with examples. Practice by designing mini schemas from daily life scenarios.',
  },
  {
    title: 'Chemistry Acids and Bases Notes with pH and Indicator Questions',
    slug: 'chemistry-acids-and-bases-notes-with-ph-and-indicator-questions',
    excerpt: 'Revision notes for strong and weak acids, alkalis, and neutralization.',
    content:
      'Use this guide to compare reactions and lab observations. For exam prep, solve data-response questions that include pH values and indicator color changes.',
  },
  {
    title: 'Effective Note Making for Students: Cornell and Summary Methods',
    slug: 'effective-note-making-for-students-cornell-and-summary-methods',
    excerpt: 'Improve classroom notes using structured templates and quick review.',
    content:
      'Keep notes concise with headings, definitions, and examples. End each session with a short summary and one self-check question to reinforce understanding.',
  },
  {
    title: 'A Level Chemistry Organic Basics for Beginner Revision',
    slug: 'a-level-chemistry-organic-basics-for-beginner-revision',
    excerpt: 'Foundational notes on hydrocarbons, homologous series, and naming.',
    content:
      'Start with functional groups and reaction patterns before memorizing details. Create mini maps linking compounds and reactions to simplify exam revision.',
  },
  {
    title: 'Exam Day Checklist for Students: Calm, Confident, and Prepared',
    slug: 'exam-day-checklist-for-students-calm-confident-and-prepared',
    excerpt: 'Last-day planning checklist to reduce stress and improve performance.',
    content:
      'Prepare stationery, documents, and revision priorities one day before exam. Sleep early, review summaries, and avoid learning brand new topics at the last minute.',
  },
];

async function run() {
  await datasource.initialize();
  const repo = datasource.getRepository(PostEntity);

  const payload = posts.map((post, index) => ({
    ...post,
    featureImage: `https://picsum.photos/seed/gohar-post-${index + 1}/1200/700`,
    notesPdfUrl: `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`,
    isPublished: true,
    publishedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
  }));

  await repo.upsert(payload, ['slug']);
  console.log(`Seed complete: ${payload.length} posts inserted/updated.`);

  await datasource.destroy();
}

run().catch(async (error) => {
  console.error('Seed failed:', error);
  if (datasource.isInitialized) {
    await datasource.destroy();
  }
  process.exit(1);
});
