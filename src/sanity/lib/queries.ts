// Requête pour récupérer les appartements/suites
export const suitesQuery = `*[_type == "suite" && published == true] | order(order asc) {
  _id,
  title,
  slug,
  description,
  shortDescription,
  capacity,
  surface,
  bedrooms,
  price,
  mainImage {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  gallery[] {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  amenities,
  reservitId
}`

// Requête pour une suite spécifique
export const suiteBySlugQuery = `*[_type == "suite" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  shortDescription,
  capacity,
  surface,
  bedrooms,
  price,
  mainImage {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  gallery[] {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  amenities,
  reservitId
}`

// Requête pour les informations générales du site
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  address,
  phone,
  email,
  socialMedia,
  translations
}`

// ===== PAGES =====

// Page d'accueil
export const pageHomeQuery = `*[_id == "pageHome"][0] {
  hero,
  colmarSection {
    ...,
    gallery[] {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    }
  },
  philosophySection,
  suitesSection {
    ...,
    gallery[] {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    }
  },
  ctaSection,
  reviewsSection,
  mapSection
}`

// Page Appartements
export const pageAppartementsQuery = `*[_id == "pageAppartements"][0] {
  header,
  intro,
  suites[] {
    title,
    slug,
    description,
    capacity,
    surface,
    bedrooms,
    price,
    mainImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    gallery[] {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    amenitiesData[] {
      title,
      items
    }
  },
  establishmentAmenities {
    title,
    intro,
    rating,
    amenitiesCategories[] {
      title,
      icon,
      items
    }
  }
}`

// Page Informations
export const pageInfosQuery = `*[_id == "pageInfos"][0] {
  header,
  contact,
  schedule,
  accessNotes
}`

// Page Extras
export const pageExtrasQuery = `*[_id == "pageExtras"][0] {
  header,
  extras,
  services,
  contactCta
}`

// Page Bonnes Adresses
export const pageAdressesQuery = `*[_id == "pageAdresses"][0] {
  header,
  addressesSectionHeader,
  categories,
  christmasSection {
    ...,
    gallery[] {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    }
  }
}`

// ===== PAGES LÉGALES =====

// Page Mentions Légales
export const pageMentionsLegalesQuery = `*[_id == "pageMentionsLegales"][0] {
  title,
  lastUpdate,
  editeur,
  directeurPublication,
  hebergeur,
  sections,
  contactEmail
}`

// Page Politique de Confidentialité
export const pagePolitiqueConfidentialiteQuery = `*[_id == "pagePolitiqueConfidentialite"][0] {
  title,
  lastUpdate,
  sections,
  contact
}`

// Page Conditions Générales
export const pageConditionsGeneralesQuery = `*[_id == "pageConditionsGenerales"][0] {
  title,
  lastUpdate,
  articles,
  contact
}`

// ===== NAVIGATION =====

export const navbarQuery = `*[_id == "navbar"][0] {
  logo {
    ...,
    asset-> {
      _id,
      url
    }
  },
  menuItems[] {
    label,
    href,
    order
  }
}`
