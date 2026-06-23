import logoFull from "@/assets/cam-logo-full.png.asset.json";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import autorepair from "@/assets/portfolio/autorepair.jpg.asset.json";
import chiropractor from "@/assets/portfolio/chiropractor.jpg.asset.json";
import cleaner from "@/assets/portfolio/cleaner.jpg.asset.json";
import contractor from "@/assets/portfolio/contractor.jpg.asset.json";
import dentist from "@/assets/portfolio/dentist.jpg.asset.json";
import electrician from "@/assets/portfolio/electrician.jpg.asset.json";
import hvac from "@/assets/portfolio/hvac.jpg.asset.json";
import landscaping from "@/assets/portfolio/landscaping.jpg.asset.json";
import lawyer from "@/assets/portfolio/lawyer.jpg.asset.json";
import plumberEmergency from "@/assets/portfolio/plumber-emergency.jpg.asset.json";
import plumber from "@/assets/portfolio/plumber.jpg.asset.json";
import realestate from "@/assets/portfolio/realestate.jpg.asset.json";
import restaurant from "@/assets/portfolio/restaurant.jpg.asset.json";
import roofer from "@/assets/portfolio/roofer.jpg.asset.json";

export const camLogo = logoFull.url;
export const camHeroVideo = heroVideo.url;

export const portfolioImg = {
  autorepair: autorepair.url,
  chiropractor: chiropractor.url,
  cleaner: cleaner.url,
  contractor: contractor.url,
  dentist: dentist.url,
  electrician: electrician.url,
  hvac: hvac.url,
  landscaping: landscaping.url,
  lawyer: lawyer.url,
  "plumber-emergency": plumberEmergency.url,
  plumber: plumber.url,
  realestate: realestate.url,
  restaurant: restaurant.url,
  roofer: roofer.url,
} as const;
