import { createSlice } from "@reduxjs/toolkit";
import type { ReactNode } from "react";


export interface Service {
  name: string;
  /** SVG element — only usable in React components, not serialised in store */
  icon?: ReactNode;
  description: string;
  features: string[];
  duration: string;
  startingPrice: string;
}

export const SERVICE_DATA: Omit<Service, "icon">[] = [
  {
    name: "Hair + Color",
    description:
      "From subtle highlights to bold transformations, our expert colorists craft the perfect shade to complement your skin tone and personal style.",
    features: [
      "Precision haircuts & layering",
      "Balayage & ombré coloring",
      "Root touch-ups & grey blending",
      "Keratin smoothing treatments",
      "Deep conditioning & hair spa",
    ],
    duration: "45 min – 2 hrs",
    startingPrice: "₹500",
  },
  {
    name: "Makeup",
    description:
      "Whether it's your wedding day or a casual brunch, our makeup artists create flawless looks that enhance your natural beauty and last all day.",
    features: [
      "Bridal & engagement makeup",
      "Party & event glam",
      "HD & airbrush techniques",
      "Natural & dewy looks",
      "Lash extensions & brow shaping",
    ],
    duration: "30 min – 1.5 hrs",
    startingPrice: "₹1,000",
  },
  {
    name: "Wax",
    description:
      "Silky smooth results with minimal discomfort. We use premium hypoallergenic waxes suited for sensitive skin, leaving you feeling refreshed.",
    features: [
      "Full body waxing",
      "Rica & chocolate waxing",
      "Brazilian & bikini wax",
      "Face & upper lip threading",
      "Post-wax soothing care",
    ],
    duration: "15 min – 1 hr",
    startingPrice: "₹200",
  },
  {
    name: "Spa",
    description:
      "Escape into a world of relaxation. Our spa rituals blend ancient Ayurvedic techniques with modern therapies for total mind-body rejuvenation.",
    features: [
      "Swedish & deep tissue massage",
      "Aromatherapy sessions",
      "Detox body wraps",
      "Manicure & pedicure spa",
      "Facial cleanup & polishing",
    ],
    duration: "30 min – 2 hrs",
    startingPrice: "₹800",
  },
];

/* ────────────────────────────────────────────
   Slice
   ──────────────────────────────────────────── */

interface ServicesState {
  /** Serialisable service data (no JSX) */
  items: Omit<Service, "icon">[];
  /** Just the service names — handy for dropdowns */
  names: string[];
}

const initialState: ServicesState = {
  items: SERVICE_DATA,
  names: SERVICE_DATA.map((s) => s.name),
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
});

export default servicesSlice.reducer;
