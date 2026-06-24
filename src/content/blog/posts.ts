import img1 from "@/assets/blog/how-much-should-i-pay-for-a-website-designer.jpg";
import img2 from "@/assets/blog/can-i-hire-someone-to-design-my-website.jpg";
import img3 from "@/assets/blog/where-to-find-a-good-web-designer-for-small-business.jpg";
import img4 from "@/assets/blog/how-to-hire-a-web-designer-without-overspending.jpg";
import img5 from "@/assets/blog/questions-to-ask-a-web-designer-before-hiring.jpg";
import img6 from "@/assets/blog/local-web-designer-vs-freelance-platform.jpg";
import img7 from "@/assets/blog/how-to-check-a-web-designers-portfolio.jpg";
import img8 from "@/assets/blog/do-i-need-a-professional-web-designer.jpg";
import img9 from "@/assets/blog/how-long-does-it-take-to-get-a-website-designed.jpg";
import img10 from "@/assets/blog/web-designer-cost-vs-website-builder.jpg";

import body1 from "./how-much-should-i-pay-for-a-website-designer.md?raw";
import body2 from "./can-i-hire-someone-to-design-my-website.md?raw";
import body3 from "./where-to-find-a-good-web-designer-for-small-business.md?raw";
import body4 from "./how-to-hire-a-web-designer-without-overspending.md?raw";
import body5 from "./questions-to-ask-a-web-designer-before-hiring.md?raw";
import body6 from "./local-web-designer-vs-freelance-platform.md?raw";
import body7 from "./how-to-check-a-web-designers-portfolio.md?raw";
import body8 from "./do-i-need-a-professional-web-designer.md?raw";
import body9 from "./how-long-does-it-take-to-get-a-website-designed.md?raw";
import body10 from "./web-designer-cost-vs-website-builder.md?raw";

export type Post = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  readMinutes: number;
  image: string;
  body: string;
  publishedAt: string;
};

export const posts: Post[] = [
  {
    slug: "how-much-should-i-pay-for-a-website-designer",
    title: "How Much Should I Pay for a Website Designer? (Honest Pricing Guide for Canadian Small Businesses)",
    description:
      "Wondering how much to pay for a website designer in Canada? Get realistic pricing expectations, what's included, and how to avoid overpaying or underpaying for your next site.",
    keyword: "how much should I pay for a website designer",
    readMinutes: 6,
    image: img1,
    body: body1,
    publishedAt: "2026-06-24",
  },
  {
    slug: "can-i-hire-someone-to-design-my-website",
    title: "Can I Hire Someone to Design My Website for Me? (Yes — Here's How It Works)",
    description:
      "Yes, you can absolutely hire someone to design your website — and for most small business owners, you probably should. Here's exactly how outsourcing your web design works.",
    keyword: "can I hire someone to design my website",
    readMinutes: 6,
    image: img2,
    body: body2,
    publishedAt: "2026-06-24",
  },
  {
    slug: "where-to-find-a-good-web-designer-for-small-business",
    title: "Where to Find a Good Web Designer for Your Small Business",
    description:
      "Not sure where to find a reliable web designer for your small business? This guide covers the best places to look, what to watch for, and how to find someone who actually gets results.",
    keyword: "where to find a web designer for small business",
    readMinutes: 6,
    image: img3,
    body: body3,
    publishedAt: "2026-06-24",
  },
  {
    slug: "how-to-hire-a-web-designer-without-overspending",
    title: "How to Hire a Web Designer Without Overspending",
    description:
      "Learn how to hire a professional web designer without blowing your budget. Practical strategies for Canadian small business owners to get great results at a fair price.",
    keyword: "how to hire a web designer without overspending",
    readMinutes: 6,
    image: img4,
    body: body4,
    publishedAt: "2026-06-24",
  },
  {
    slug: "questions-to-ask-a-web-designer-before-hiring",
    title: "What Questions Should I Ask a Web Designer Before Hiring?",
    description:
      "Don't hire a web designer before asking these key questions. This checklist helps Canadian small business owners vet designers, avoid bad hires, and find the right fit.",
    keyword: "questions to ask a web designer before hiring",
    readMinutes: 6,
    image: img5,
    body: body5,
    publishedAt: "2026-06-24",
  },
  {
    slug: "local-web-designer-vs-freelance-platform",
    title: "Local Web Designer vs. Freelance Platform: Which Is Better for Your Small Business?",
    description:
      "Should you hire a local web designer or use a freelance platform like Upwork or Fiverr? Here's an honest comparison to help Canadian small businesses make the right call.",
    keyword: "local web designer vs freelance platform",
    readMinutes: 6,
    image: img6,
    body: body6,
    publishedAt: "2026-06-24",
  },
  {
    slug: "how-to-check-a-web-designers-portfolio",
    title: "How to Check a Web Designer's Portfolio Before Hiring",
    description:
      "Looking at a web designer's portfolio? Here's exactly what to look for — and what red flags to watch for — before you hire someone to build your small business website.",
    keyword: "how to check a web designer's portfolio",
    readMinutes: 6,
    image: img7,
    body: body7,
    publishedAt: "2026-06-24",
  },
  {
    slug: "do-i-need-a-professional-web-designer",
    title: "Do I Really Need a Professional Web Designer? (Honest Answer)",
    description:
      "Trying to decide between a DIY website builder and a professional web designer? This honest breakdown helps Canadian small business owners make the right call for their situation.",
    keyword: "do I need a professional web designer",
    readMinutes: 6,
    image: img8,
    body: body8,
    publishedAt: "2026-06-24",
  },
  {
    slug: "how-long-does-it-take-to-get-a-website-designed",
    title: "How Long Does It Take to Get a Website Designed?",
    description:
      "Wondering how long your website design project will take? Here's a realistic breakdown of web design timelines for Canadian small businesses, from kickoff to launch.",
    keyword: "how long does it take to get a website designed",
    readMinutes: 5,
    image: img9,
    body: body9,
    publishedAt: "2026-06-24",
  },
  {
    slug: "web-designer-cost-vs-website-builder",
    title: "Web Designer Cost vs. Website Builder: What Actually Saves Money?",
    description:
      "Is a website builder like Wix or Squarespace actually cheaper than hiring a web designer? A real cost comparison for Canadian small business owners.",
    keyword: "web designer cost vs website builder",
    readMinutes: 6,
    image: img10,
    body: body10,
    publishedAt: "2026-06-24",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
