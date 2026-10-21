import plumbing from "@/assets/designs/plumbing.jpg";
import electrical from "@/assets/designs/electrical.jpg";
import hvac from "@/assets/designs/hvac.jpg";
import roofing from "@/assets/designs/roofing.jpg";
import landscaping from "@/assets/designs/landscaping.jpg";
import contracting from "@/assets/designs/contracting.jpg";

export const DESIGNS = [
  { slug: "plumbing", trade: "Plumbing", image: plumbing, palette: "Navy, white, blue accents", desc: "Clean, trustworthy layout with emergency call buttons and clear service categories." },
  { slug: "electrical", trade: "Electrical", image: electrical, palette: "Charcoal, white, restrained yellow", desc: "Bold, confident design for residential and commercial electrical work." },
  { slug: "hvac", trade: "HVAC", image: hvac, palette: "Cool blue, white, slate", desc: "Seasonal service messaging and easy booking for heating and cooling." },
  { slug: "roofing", trade: "Roofing", image: roofing, palette: "Graphite, cream, muted copper", desc: "Premium, editorial feel built around free estimates and project photos." },
  { slug: "landscaping", trade: "Landscaping", image: landscaping, palette: "Forest green, warm white", desc: "Photo-forward design that lets your outdoor work do the talking." },
  { slug: "contracting", trade: "General Contracting", image: contracting, palette: "Charcoal, white, restrained orange", desc: "Structured layout for renovations, additions and custom builds." },
] as const;
