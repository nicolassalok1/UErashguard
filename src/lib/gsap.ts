/* [INFRA] Point d'entrée GSAP unique — enregistre les plugins une fois.
   Tout composant animé importe depuis "@/lib/gsap", jamais "gsap" directement. */
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export { gsap, useGSAP, ScrollTrigger, SplitText };
