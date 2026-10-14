export type Category = "Software" | "Security" | "Data" | "Cloud & Infrastructure";
export type Format = "Video" | "Text" | "Interactive" | "Hands-on lab";

export interface Resource {
  title: string;
  provider: string;
  url: string;
  format: Format;
  freeCert: boolean;
  lowData: boolean;
  hours: number;
}

export interface Step {
  title: string;
  goal: string;
  resources: Resource[];
}

export interface Occupation {
  slug: string;
  title: string;
  ofo: string;
  category: Category;
  tier: "High" | "Very High" | "Critical";
  salary: [number, number];
  summary: string;
  steps: Step[];
}

const fcc = (title: string, path: string, hours = 300): Resource => ({
  title,
  provider: "freeCodeCamp",
  url: `https://www.freecodecamp.org/learn/${path}`,
  format: "Interactive",
  freeCert: true,
  lowData: true,
  hours,
});
const cs50 = (title: string, url: string, hours = 100): Resource => ({
  title,
  provider: "Harvard CS50",
  url,
  format: "Video",
  freeCert: true,
  lowData: false,
  hours,
});
const ms = (title: string, url: string, hours = 10): Resource => ({
  title,
  provider: "Microsoft Learn",
  url,
  format: "Text",
  freeCert: false,
  lowData: true,
  hours,
});
const aws = (title: string, url: string, hours = 10): Resource => ({
  title,
  provider: "AWS Skill Builder",
  url,
  format: "Video",
  freeCert: false,
  lowData: false,
  hours,
});
const cyb = (title: string, hours = 20): Resource => ({
  title,
  provider: "Cybersecurity Simplified",
  url: "https://cybersecurity-simplified.com/",
  format: "Text",
  freeCert: false,
  lowData: true,
  hours,
});

const foundations: Step = {
  title: "Computing foundations",
  goal: "Understand how computers, the internet and programming work.",
  resources: [
    cs50("CS50x: Introduction to Computer Science", "https://cs50.harvard.edu/x/", 100),
    {
      title: "Responsive Web Design",
      provider: "freeCodeCamp",
      url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      format: "Interactive",
      freeCert: true,
      lowData: true,
      hours: 300,
    },
  ],
};

export const occupations: Occupation[] = [
  {
    slug: "software-developer",
    title: "Software Developer",
    ofo: "2021-251201",
    category: "Software",
    tier: "Critical",
    salary: [180000, 360000],
    summary: "Designs, builds and maintains applications for web, mobile and enterprise systems.",
    steps: [
      foundations,
      {
        title: "JavaScript & algorithms",
        goal: "Write real programs and solve problems.",
        resources: [
          fcc(
            "JavaScript Algorithms and Data Structures",
            "javascript-algorithms-and-data-structures-v8/",
          ),
          {
            title: "The Odin Project – Foundations",
            provider: "The Odin Project",
            url: "https://www.theodinproject.com/paths/foundations",
            format: "Text",
            freeCert: false,
            lowData: true,
            hours: 120,
          },
        ],
      },
      {
        title: "Front-end & back-end",
        goal: "Build full-stack apps with APIs and databases.",
        resources: [
          fcc("Front End Development Libraries", "front-end-development-libraries/"),
          fcc("Back End Development and APIs", "back-end-development-and-apis/"),
          cs50(
            "CS50 Web Programming with Python and JavaScript",
            "https://cs50.harvard.edu/web/",
            120,
          ),
        ],
      },
      {
        title: "Ship to the cloud",
        goal: "Deploy a portfolio project for free.",
        resources: [
          ms(
            "Introduction to GitHub",
            "https://learn.microsoft.com/training/modules/introduction-to-github/",
            1,
          ),
          aws("AWS Cloud Practitioner Essentials", "https://skillbuilder.aws/", 6),
        ],
      },
    ],
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    ofo: "2021-252901",
    category: "Security",
    tier: "Critical",
    salary: [200000, 420000],
    summary: "Protects networks and data, monitors threats and responds to security incidents.",
    steps: [
      {
        title: "Security fundamentals",
        goal: "Learn the CIA triad, threats and core vocabulary.",
        resources: [
          cyb("Cybersecurity Simplified – beginner pathway & guides"),
          {
            title: "Introduction to Cybersecurity",
            provider: "Cisco Networking Academy",
            url: "https://www.netacad.com/courses/introduction-to-cybersecurity",
            format: "Interactive",
            freeCert: true,
            lowData: true,
            hours: 6,
          },
        ],
      },
      {
        title: "Networking & Linux",
        goal: "Understand TCP/IP, ports and the command line.",
        resources: [
          {
            title: "OverTheWire: Bandit",
            provider: "OverTheWire",
            url: "https://overthewire.org/wargames/bandit/",
            format: "Hands-on lab",
            freeCert: false,
            lowData: true,
            hours: 20,
          },
          ms(
            "Describe the concepts of security, compliance and identity (SC-900 path)",
            "https://learn.microsoft.com/training/paths/describe-concepts-of-security-compliance-identity/",
            4,
          ),
        ],
      },
      {
        title: "Free hands-on labs",
        goal: "Practise attack and defence in safe environments.",
        resources: [
          {
            title: "TryHackMe free rooms – Pre Security",
            provider: "TryHackMe",
            url: "https://tryhackme.com/path/outline/presecurity",
            format: "Hands-on lab",
            freeCert: false,
            lowData: false,
            hours: 40,
          },
          cyb("Cybersecurity Simplified – home lab & free tools walkthroughs", 15),
          cs50(
            "CS50's Introduction to Cybersecurity",
            "https://cs50.harvard.edu/cybersecurity/",
            25,
          ),
        ],
      },
      {
        title: "Entry certification",
        goal: "Earn a recognised starter credential.",
        resources: [
          {
            title: "Certified in Cybersecurity (CC) – free training & exam offer",
            provider: "ISC2",
            url: "https://www.isc2.org/landing/1mcc",
            format: "Video",
            freeCert: true,
            lowData: false,
            hours: 15,
          },
        ],
      },
    ],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    ofo: "2021-251101",
    category: "Data",
    tier: "Very High",
    salary: [160000, 320000],
    summary: "Turns raw data into insights and dashboards that drive business decisions.",
    steps: [
      {
        title: "Spreadsheets & statistics",
        goal: "Clean data and understand basic statistics.",
        resources: [
          {
            title: "Statistics and Probability",
            provider: "Khan Academy",
            url: "https://www.khanacademy.org/math/statistics-probability",
            format: "Video",
            freeCert: false,
            lowData: false,
            hours: 40,
          },
        ],
      },
      {
        title: "SQL & Python",
        goal: "Query databases and analyse data with code.",
        resources: [
          fcc("Relational Database", "relational-database/"),
          fcc("Data Analysis with Python", "data-analysis-with-python/"),
          cs50(
            "CS50's Introduction to Programming with Python",
            "https://cs50.harvard.edu/python/",
            60,
          ),
        ],
      },
      {
        title: "Visualisation",
        goal: "Build dashboards stakeholders understand.",
        resources: [
          fcc("Data Visualization", "data-visualization/"),
          ms(
            "Get started with Microsoft data analytics (Power BI)",
            "https://learn.microsoft.com/training/paths/data-analytics-microsoft/",
            4,
          ),
        ],
      },
    ],
  },
  {
    slug: "cloud-architect",
    title: "Cloud Architect",
    ofo: "2021-252301",
    category: "Cloud & Infrastructure",
    tier: "Very High",
    salary: [240000, 480000],
    summary: "Designs scalable, secure cloud infrastructure on Azure, AWS or Google Cloud.",
    steps: [
      {
        title: "Cloud concepts",
        goal: "Understand IaaS, PaaS, SaaS and shared responsibility.",
        resources: [
          ms(
            "Azure Fundamentals (AZ-900 path)",
            "https://learn.microsoft.com/training/paths/azure-fundamentals-describe-cloud-concepts/",
            8,
          ),
          aws("AWS Cloud Practitioner Essentials", "https://skillbuilder.aws/", 6),
        ],
      },
      {
        title: "Linux, networking & scripting",
        goal: "Operate servers and automate tasks.",
        resources: [
          {
            title: "OverTheWire: Bandit",
            provider: "OverTheWire",
            url: "https://overthewire.org/wargames/bandit/",
            format: "Hands-on lab",
            freeCert: false,
            lowData: true,
            hours: 20,
          },
          cs50(
            "CS50's Introduction to Programming with Python",
            "https://cs50.harvard.edu/python/",
            60,
          ),
        ],
      },
      {
        title: "Build on free tiers",
        goal: "Deploy real workloads at zero cost.",
        resources: [
          {
            title: "Azure free account & student credits",
            provider: "Microsoft Azure",
            url: "https://azure.microsoft.com/free/students/",
            format: "Hands-on lab",
            freeCert: false,
            lowData: false,
            hours: 20,
          },
          {
            title: "AWS Free Tier",
            provider: "AWS",
            url: "https://aws.amazon.com/free/",
            format: "Hands-on lab",
            freeCert: false,
            lowData: false,
            hours: 20,
          },
        ],
      },
      {
        title: "Architecture & security",
        goal: "Design resilient, well-architected systems.",
        resources: [
          {
            title: "AWS Well-Architected Framework",
            provider: "AWS",
            url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
            format: "Text",
            freeCert: false,
            lowData: true,
            hours: 10,
          },
          ms(
            "Microsoft Azure Well-Architected Framework",
            "https://learn.microsoft.com/training/paths/azure-well-architected-framework/",
            6,
          ),
        ],
      },
    ],
  },
  {
    slug: "network-analyst",
    title: "ICT Network & Systems Engineer",
    ofo: "2021-252301",
    category: "Cloud & Infrastructure",
    tier: "High",
    salary: [150000, 300000],
    summary: "Builds and supports networks, servers and connectivity for organisations.",
    steps: [
      {
        title: "Networking basics",
        goal: "Learn how networks connect.",
        resources: [
          {
            title: "Networking Basics",
            provider: "Cisco Networking Academy",
            url: "https://www.netacad.com/courses/networking-basics",
            format: "Interactive",
            freeCert: true,
            lowData: true,
            hours: 70,
          },
        ],
      },
      {
        title: "Systems administration",
        goal: "Run Linux and Windows servers.",
        resources: [
          ms(
            "Windows Server fundamentals",
            "https://learn.microsoft.com/training/browse/?products=windows-server",
            10,
          ),
          {
            title: "OverTheWire: Bandit",
            provider: "OverTheWire",
            url: "https://overthewire.org/wargames/bandit/",
            format: "Hands-on lab",
            freeCert: false,
            lowData: true,
            hours: 20,
          },
        ],
      },
    ],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    ofo: "2021-251102",
    category: "Data",
    tier: "High",
    salary: [220000, 420000],
    summary: "Builds machine learning models and predictive analytics.",
    steps: [
      {
        title: "Python & maths",
        goal: "Programming plus linear algebra and statistics.",
        resources: [
          cs50(
            "CS50's Introduction to Programming with Python",
            "https://cs50.harvard.edu/python/",
            60,
          ),
          {
            title: "Linear Algebra",
            provider: "Khan Academy",
            url: "https://www.khanacademy.org/math/linear-algebra",
            format: "Video",
            freeCert: false,
            lowData: false,
            hours: 30,
          },
        ],
      },
      {
        title: "Machine learning",
        goal: "Train and evaluate models.",
        resources: [
          fcc("Machine Learning with Python", "machine-learning-with-python/"),
          cs50("CS50's Introduction to AI with Python", "https://cs50.harvard.edu/ai/", 70),
          {
            title: "Kaggle Learn micro-courses",
            provider: "Kaggle",
            url: "https://www.kaggle.com/learn",
            format: "Interactive",
            freeCert: true,
            lowData: true,
            hours: 40,
          },
        ],
      },
    ],
  },
];

export interface Academy {
  name: string;
  url: string;
  focus: string;
  model: string;
  stipend: boolean;
  roles: Category[];
  locations: string;
}

export const academies: Academy[] = [
  {
    name: "WeThinkCode_",
    url: "https://www.wethinkcode.co.za/",
    focus:
      "Tuition-free 2-year software engineering programme with corporate sponsors and placements.",
    model: "Free bootcamp",
    stipend: false,
    roles: ["Software", "Data"],
    locations: "Johannesburg, Cape Town, Durban",
  },
  {
    name: "Umuzi",
    url: "https://www.umuzi.org/",
    focus:
      "Learnerships in data science, software development and digital marketing for unemployed youth.",
    model: "Sponsored learnership",
    stipend: true,
    roles: ["Software", "Data"],
    locations: "Johannesburg & remote",
  },
  {
    name: "UVU Africa – Capaciti",
    url: "https://uvu.africa/capaciti/",
    focus:
      "Work-readiness programmes in cloud, cybersecurity, data and software with employer placement.",
    model: "Sponsored learnership",
    stipend: true,
    roles: ["Software", "Security", "Data", "Cloud & Infrastructure"],
    locations: "Cape Town, Johannesburg & remote",
  },
  {
    name: "Deviare Academy",
    url: "https://deviare.africa/",
    focus:
      "Funded digital skills learnerships and certifications in cloud, cybersecurity and data.",
    model: "Funded learnership",
    stipend: true,
    roles: ["Security", "Data", "Cloud & Infrastructure"],
    locations: "National & online",
  },
  {
    name: "Shaper",
    url: "https://www.shaper.co.za/",
    focus:
      "Funded talent programmes and learnerships in tech, data and digital roles with partner employers.",
    model: "Internship pipeline",
    stipend: true,
    roles: ["Software", "Data", "Cloud & Infrastructure"],
    locations: "Cape Town, Johannesburg & online",
  },
];

export const categories: Category[] = ["Software", "Security", "Data", "Cloud & Infrastructure"];
export const formats: Format[] = ["Video", "Text", "Interactive", "Hands-on lab"];

export const formatZAR = (n: number) => "R" + n.toLocaleString("en-ZA").replace(/,/g, " ");

export function filterOccupations(
  list: Occupation[],
  f: { q: string; category: string; freeCert: boolean; format: string; lowData: boolean },
) {
  const q = f.q.trim().toLowerCase();
  return list.filter((o) => {
    if (f.category && o.category !== f.category) return false;
    if (q && !`${o.title} ${o.ofo} ${o.summary}`.toLowerCase().includes(q)) return false;
    const res = o.steps.flatMap((s) => s.resources);
    if (f.freeCert && !res.some((r) => r.freeCert)) return false;
    if (f.format && !res.some((r) => r.format === f.format)) return false;
    if (f.lowData && !res.some((r) => r.lowData)) return false;
    return true;
  });
}
