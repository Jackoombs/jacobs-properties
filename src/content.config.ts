import { defineCollection, z } from "astro:content";
import type { Property } from "@/lib/types";

const imageUrlsSchema = z.object({
  full: z.string().optional(),
  hero: z.string().optional(),
  large: z.string().optional(),
  medium: z.string().optional(),
  small: z.string().optional(),
  thumbnail: z.string().optional(),
});

const imageSchema = z.object({
  id: z.string().optional(),
  url: z.string(),
  urls: imageUrlsSchema.optional(),
  caption: z.string().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
  order: z.number().optional(),
  isFeatured: z.boolean().optional(),
  featureIndex: z.number().optional(),
});

const epcSchema = z.object({
  rating: z.string().optional(),
  energyEfficiencyCurrent: z.string().optional(),
  energyEfficiencyPotential: z.string().optional(),
  environmentImpactCurrent: z.string().optional(),
  environmentImpactPotential: z.string().optional(),
  reportUrl: z.string().optional(),
});

const propertySchema = z.object({
  id: z.string(),
  marketingMode: z.enum(["selling", "letting"]),
  propertyType: z.array(z.string()),
  // Strict on purpose: an API still serving a source's own wording (`forSale`,
  // "Sold STC") should fail the build, not ship a site full of unlabelled badges.
  status: z.enum(["active", "agreed", "completed", "withdrawn"]).optional(),
  statusLabel: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  publicAddress: z.string().optional(),
  postcode: z.string().optional(),
  price: z.number(),
  priceQualifier: z.string().optional(),
  displayPrice: z.boolean().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  receptions: z.number().optional(),
  primaryImage: imageSchema.optional(),
  images: z.array(imageSchema),
  floorplan: z.array(imageSchema),
  epc: epcSchema.optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
  virtualTour: z.string().optional(),
  brochure: z.string().optional(),
  isCommercial: z.boolean().optional(),
  location: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

interface ListResponse {
  data: Property[];
  meta: { total: number; limit: number; offset: number };
}

async function fetchAllProperties() {
  const base = import.meta.env.PUBLIC_SERVER_URL + "api/properties";
  const limit = 100;
  let offset = 0;
  const all: Property[] = [];

  while (true) {
    const res = await fetch(`${base}?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error(`Failed to fetch properties: ${res.status}`);
    const json: ListResponse = await res.json();
    all.push(...json.data);
    offset += limit;
    if (offset >= json.meta.total) break;
  }

  return all;
}

/**
 * The API returns explicit `null` for absent optional fields (e.g.
 * `virtualTour: null`); our schema only allows `undefined` there. Rather than
 * marking every optional field `.nullable()`, strip nulls before validation.
 */
function nullsToUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(nullsToUndefined) as T;
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, v]) => [key, v === null ? undefined : nullsToUndefined(v)]),
    ) as T;
  }
  return value;
}

const properties = defineCollection({
  loader: async () => {
    const all = await fetchAllProperties();
    return all.map((property) => nullsToUndefined({ ...property, id: property.id }));
  },
  schema: propertySchema,
});

// ---------------------------------------------------------------------------
// CMS-backed marketing content (jacobs-properties-cms / Strapi). Fetched at
// build time the same way properties are — no client-side calls, no
// server-side rendering, just baked into the static output.
// ---------------------------------------------------------------------------

const CMS_BASE = import.meta.env.PUBLIC_CMS_URL + "api";

async function fetchStrapi(path: string, query: string): Promise<Record<string, unknown>> {
  const res = await fetch(`${CMS_BASE}${path}${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  const json = await res.json();
  return json.data;
}

async function fetchStrapiCollection(path: string, query: string): Promise<Record<string, unknown>[]> {
  const pagination = "pagination[pageSize]=200";
  const res = await fetch(`${CMS_BASE}${path}?${query ? `${query}&` : ""}${pagination}`);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  const json = await res.json();
  return json.data;
}

const strapiImage = z.object({ url: z.string(), alternativeText: z.string().optional() }).optional();

const heroSectionSchema = z.object({
  label: z.string().optional(),
  heading: z.string(),
  body: z.string().optional(),
  image: strapiImage,
  imageAlt: z.string().optional(),
  bgVariant: z.enum(["primary-100", "primary-200", "white"]).optional(),
  ctaPrimaryText: z.string().optional(),
  ctaPrimaryLink: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryLink: z.string().optional(),
});

const contentBlockSchema = z.object({
  label: z.string().optional(),
  heading: z.string(),
  body: z.string().optional(),
  image: strapiImage,
  imageAlt: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  ctaText2: z.string().optional(),
  ctaLink2: z.string().optional(),
});

const valuePropSchema = z.object({ reason: z.string(), text: z.string() });
const processStepSchema = z.object({ title: z.string(), text: z.string() });
const areaGuideSectionSchema = z.object({
  label: z.string().optional(),
  title: z.string(),
  body: z.string(),
  image: strapiImage,
  imageAlt: z.string().optional(),
});

const seoSchema = z.object({
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

function singleType<S extends z.ZodRawShape>(path: string, query: string, shape: S) {
  return defineCollection({
    loader: async () => {
      const data = await fetchStrapi(`/${path}`, query);
      return [nullsToUndefined({ ...data, id: "content" })];
    },
    schema: z.object({ id: z.string(), ...shape }),
  });
}

function collectionType<S extends z.ZodRawShape>(
  path: string,
  query: string,
  shape: S,
  idField: "id" | "slug" = "id",
) {
  return defineCollection({
    loader: async () => {
      const items = await fetchStrapiCollection(`/${path}`, query);
      return items.map((item) =>
        nullsToUndefined({ ...item, id: String(idField === "slug" ? item.slug : item.id) }),
      );
    },
    schema: z.object({ id: z.string(), ...shape }),
  });
}

const audienceLinkSchema = z.object({
  title: z.string(),
  link: z.string(),
  image: strapiImage,
});

const heroSlideSchema = z.object({
  image: strapiImage,
  imageAlt: z.string().optional(),
  focalPosition: z.string().optional(),
});

const homePage = singleType("home-page", "populate[hero][populate]=*&populate[heroSlides][populate]=*&populate[aboutSection][populate]=*&populate[propertyReportSection][populate]=*&populate[audienceLinks][populate]=*", {
  ...seoSchema.shape,
  hero: heroSectionSchema,
  heroSlides: z.array(heroSlideSchema).default([]),
  aboutSection: contentBlockSchema,
  propertyReportSection: contentBlockSchema,
  audienceLinks: z.array(audienceLinkSchema),
});

const aboutPage = singleType("about-page", "populate[hero][populate]=*&populate[personalPledge][populate]=*&populate[aboutCompany][populate]=*&populate[ctaSection][populate]=*&populate[teamSectionImage]=true&populate[valueProps]=*", {
  ...seoSchema.shape,
  hero: heroSectionSchema,
  personalPledge: contentBlockSchema,
  aboutCompany: contentBlockSchema,
  teamSectionHeading: z.string().optional(),
  teamSectionImage: strapiImage,
  valueProps: z.array(valuePropSchema),
  ctaSection: contentBlockSchema,
});

const buyersPage = singleType("buyers-page", "populate[hero][populate]=*&populate[whyBuyImage]=true&populate[valueProps]=*&populate[processSteps]=*", {
  ...seoSchema.shape,
  hero: heroSectionSchema,
  whyBuyImage: strapiImage,
  whyBuyImageAlt: z.string().optional(),
  valueProps: z.array(valuePropSchema),
  processSteps: z.array(processStepSchema),
  sellingCtaHeading: z.string().optional(),
  sellingCtaBody: z.string().optional(),
});

const sellersPage = singleType("sellers-page", "populate[hero][populate]=*&populate[whySellImage]=true&populate[valueProps]=*&populate[processSteps]=*&populate[provenRecipe][populate]=*&populate[brochureCta][populate]=*", {
  ...seoSchema.shape,
  hero: heroSectionSchema,
  missionHeading: z.string().optional(),
  missionSubheading: z.string().optional(),
  whySellImage: strapiImage,
  whySellImageAlt: z.string().optional(),
  valueProps: z.array(valuePropSchema),
  processSteps: z.array(processStepSchema),
  provenRecipe: contentBlockSchema,
  brochureCta: contentBlockSchema,
});

const landlordsPage = singleType("landlords-page", "populate[hero][populate]=*&populate[whyLetImage]=true&populate[valueProps]=*&populate[processSteps]=*&populate[fullyManaged][populate]=*&populate[letOnly][populate]=*&populate[brochureCta][populate]=*", {
  ...seoSchema.shape,
  hero: heroSectionSchema,
  whyLetImage: strapiImage,
  whyLetImageAlt: z.string().optional(),
  valueProps: z.array(valuePropSchema),
  fullyManaged: contentBlockSchema,
  letOnly: contentBlockSchema,
  processSteps: z.array(processStepSchema),
  brochureCta: contentBlockSchema,
});

const tenantsPage = singleType("tenants-page", "populate[hero][populate]=*&populate[whyRentImage]=true&populate[valueProps]=*&populate[processSteps]=*&populate[reportRepair][populate]=*&populate[standardsRegulations][populate]=*&populate[questionRenting][populate]=*", {
  ...seoSchema.shape,
  hero: heroSectionSchema,
  whyRentImage: strapiImage,
  whyRentImageAlt: z.string().optional(),
  valueProps: z.array(valuePropSchema),
  processSteps: z.array(processStepSchema),
  reportRepair: contentBlockSchema,
  standardsRegulations: contentBlockSchema,
  questionRenting: contentBlockSchema,
});

const valuationPage = singleType("valuation-page", "populate[whyValueImage]=true&populate[valueProps]=*&populate[readyToSell][populate]=*", {
  ...seoSchema.shape,
  heroHeading: z.string().optional(),
  heroBody: z.string().optional(),
  whyValueImage: strapiImage,
  whyValueImageAlt: z.string().optional(),
  valueProps: z.array(valuePropSchema),
  readyToSell: contentBlockSchema,
});

const contactPage = singleType("contact-page", "populate[branchImage]=true", {
  ...seoSchema.shape,
  heroHeading: z.string().optional(),
  heroBody: z.string().optional(),
  branchImage: strapiImage,
  branchImageAlt: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  addressLine: z.string().optional(),
  mapLat: z.number().optional(),
  mapLng: z.number().optional(),
  directionsUrl: z.string().optional(),
});

const faqPage = singleType("faq-page", "populate[ctaImage]=true", {
  ...seoSchema.shape,
  heroHeading: z.string().optional(),
  heroBody: z.string().optional(),
  ctaHeading: z.string().optional(),
  ctaBody: z.string().optional(),
  ctaImage: strapiImage,
});

const teamPage = singleType("team-page", "", {
  ...seoSchema.shape,
  heroHeading: z.string().optional(),
  heroBody: z.string().optional(),
});

const newsPage = singleType("news-page", "", {
  ...seoSchema.shape,
  heroHeading: z.string().optional(),
  heroBody: z.string().optional(),
});

const areaGuidesPage = singleType("area-guides-page", "", {
  ...seoSchema.shape,
  heroHeading: z.string().optional(),
  heroBody: z.string().optional(),
});

const faqs = collectionType("faqs", "", {
  question: z.string(),
  answer: z.string(),
  category: z.enum(["buyers", "sellers", "landlords", "tenants"]),
  featuredHome: z.boolean().optional(),
  order: z.number().optional(),
});

const teamMembers = collectionType("team-members", "populate[photo]=true", {
  name: z.string(),
  role: z.string(),
  bio: z.string().optional(),
  photo: strapiImage,
  linkedInUrl: z.string().optional(),
  email: z.string().optional(),
  order: z.number().optional(),
});

const newsArticles = collectionType(
  "news-articles",
  "populate[heroImage]=true",
  {
    title: z.string(),
    slug: z.string(),
    category: z.string().optional(),
    publishedDate: z.string().optional(),
    heroImage: strapiImage,
    excerpt: z.string().optional(),
    body: z.string(),
    ...seoSchema.shape,
  },
  "slug",
);

const areaGuides = collectionType(
  "area-guides",
  "populate[heroImage]=true&populate[sections][populate]=*",
  {
    name: z.string(),
    slug: z.string(),
    heroImage: strapiImage,
    heroImageAlt: z.string().optional(),
    heroIntro: z.string().optional(),
    summary: z.string().optional(),
    sections: z.array(areaGuideSectionSchema),
    ...seoSchema.shape,
  },
  "slug",
);

const reviews = collectionType("reviews", "", {
  author: z.string(),
  quote: z.string(),
  order: z.number().optional(),
});

export const collections = {
  properties,
  homePage,
  aboutPage,
  buyersPage,
  sellersPage,
  landlordsPage,
  tenantsPage,
  valuationPage,
  contactPage,
  faqPage,
  teamPage,
  newsPage,
  areaGuidesPage,
  faqs,
  teamMembers,
  newsArticles,
  areaGuides,
  reviews,
};
