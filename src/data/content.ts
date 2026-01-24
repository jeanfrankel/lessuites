export const siteConfig = {
    name: "Les Suites du Cygne",
    description: "Appartements de charme classés 4 étoiles à Colmar pour groupes et familles.",
    contact: {
      phone: "06 09 17 24 61",
      mobile: "06 09 17 24 61",
      emailClient: "staff@lessuitesducygne.fr",
      emailAdmin: "admin@lessuitesducygne.fr",
      address: "20-22 Rue des Boulangers, 68000 Colmar, France",
    },
  };
  
  export const suites = [
    {
      id: "baudelaire",
      name: "La Suite Baudelaire",
      subtitle: "Atmosphère poétique & Intimité",
      description: "Située au 2ème étage, cette suite de 65m² offre une vue imprenable sur les toits de la vieille ville. Avec ses poutres apparentes et sa décoration soignée, elle est idéale pour les couples ou les petites familles.",
      capacity: "2 à 4 personnes",
      surface: "65 m²",
      features: ["1 Chambre double", "Canapé-lit confort", "Climatisation", "Cuisine équipée", "Douche à l'italienne"],
      image: "/images/baudelaire.jpg",
      images: ["/images/baudelaire.jpg","/images/baudelaire2.jpg","/images/baudelaire3.jpg","/images/baudelaire4.jpg","/images/baudelaire5.jpg"]
      // Ajoutez plus d'images ici : ["/images/baudelaire.jpg", "/images/baudelaire-2.jpg", "/images/baudelaire-3.jpg"]
    },
    {
      id: "schubert",
      name: "La Suite Schubert",
      subtitle: "Élégance Musicale & Espace",
      description: "Un hommage à la musique pour cet appartement de 75m² au 2ème étage. Spacieux et lumineux, il dispose d'un grand salon insonorisé parfait pour se détendre après une journée de visites.",
      capacity: "4 à 6 personnes",
      surface: "75 m²",
      features: ["2 Chambres", "Grand Salon", "Insonorisation", "Lave-linge / Sèche-linge", "Vue Ville"],
      image: "/images/schubert.jpg",
      images: ["/images/schubert.jpg"]
      // Ajoutez plus d'images ici
    },
    {
      id: "asselin",
      name: "La Suite Asselin",
      subtitle: "L'Appartement de Maître",
      description: "Notre plus grand appartement (115 m²) situé au 1er étage. Pensé pour les tribus, il allie le charme de l'ancien alsacien avec un confort moderne absolu. Idéal pour les repas en famille.",
      capacity: "6 à 10 personnes",
      surface: "115 m²",
      features: ["3 Grandes Chambres", "2 Salles de bain", "Espace repas XXL", "Coin lecture", "Tout équipé"],
      image: "/images/asselin1.jpg",
      images: ["/images/asselin1.jpg"]
      // Ajoutez plus d'images ici
    },
  ];
  
  export const bonnesAdresses = [
    {
      category: "Restaurants",
      items: [
        {
          name: "La Maison des Têtes",
          desc: "Un monument historique célèbre de Colmar, qui abrite également un hôtel 5 étoiles et un délicieux restaurant !",
          link: "https://www.facebook.com/maisondestetes/"
        },
        {
          name: "Restaurant Bartholdi",
          desc: "Un restaurant alsacien traditionnel, avec de la cuisine alsacienne, des vins alsaciens, et géré par une famille alsacienne… Notre regretté grand-père y déjeunait tous les jours… Que dire de plus ? 🙂"
        },
        {
          name: "Au Soleil Levant",
          type: "Japonais",
          desc: "Cuisine japonaise de qualité"
        },
        {
          name: "Jadis et Gourmande",
          desc: "Nous aimons manger ici quand nous voulons une cuisine alsacienne, mais réservez à l'avance car tout le monde l'aime aussi…",
          link: "https://www.facebook.com/Jadis-et-Gourmande-Colmar-232759433432780"
        },
        {
          name: "L'Atelier du Peintre",
          desc: "Nous y allons en famille quand nous voulons passer un moment spécial. La cuisine est de style français, et très créative… Ma mère ne pourrait pas cuisiner aussi bien qu'eux… C'est élégant et savoureux, sans être prétentieux… 😉",
          link: "https://www.facebook.com/LAtelier-du-Peintre-446803228837808/"
        },
        {
          name: "Aux Armes de Colmar",
          desc: "Un autre restaurant alsacien qui vaut vraiment le détour. Astuce : leur « Jamboneau au Munster » est délicieux !",
          link: "https://www.facebook.com/Restaurant-Aux-Armes-de-Colmar-361763420514940/"
        },
      ]
    },
    {
      category: "Bars",
      items: [
        {
          name: "L'un des Sens",
          type: "Bar à vin",
          desc: "Dans ce bar, vous pouvez acheter des vins au verre. Ils choisissent les vins qu'ils vendent, et leur passion c'est le vin… Alors vous pouvez les laisser choisir pour vous ! Ils font aussi de petites sortes de tapas français à déguster avec (fromage, pâté…)",
          link: "http://www.lun-des-sens.alsace/"
        },
        {
          name: "100% Le Bar à Jus",
          type: "Bar à jus",
          desc: "Si vous voulez manger quelque chose de bon, savoureux, pas cher et de bonne qualité, allez-y !",
          link: "https://www.facebook.com/pages/category/Smoothie—Juice-Bar/100-Le-Bar-à-Jus-Colmar-197699546939055/"
        },
        {
          name: "Les 3 Singes",
          type: "Bar à bières",
          desc: "Pour ceux qui apprécient les bières artisanales produites localement…",
          link: "https://www.facebook.com/Les-3-Singes-Colmar-1428103597433298/"
        },
        {
          name: "La Libellule",
          type: "Café librairie",
          desc: "Les gâteaux sont faits maison (ils ont aussi des vegans), vous pouvez lire en vous asseyant dans de vieux meubles, entouré de petits objets fabriqués par des gens d'ici…",
          link: "https://www.facebook.com/La-libellule-café-librairie-128160717250571/"
        },
        {
          name: "Café Rapp",
          desc: "Un endroit où nous aimons aller le dimanche pour bruncher, ou prendre un café rapide, très bon… Consultez leur Facebook, car ils ont souvent des événements. C'est définitivement un lieu pour les locaux… et vous serez les bienvenus !",
          link: "https://www.facebook.com/caferapp68/"
        },
        {
          name: "Japadeunon",
          desc: "Un excellent endroit pour les amateurs de vin. Ils proposent des dégustations de vin qui changent chaque semaine ainsi que de savoureux encas fromage/charcuterie",
          link: "https://www.facebook.com/Japadeunon-159870097905494/"
        },
      ]
    },
    {
      category: "Spécialités",
      items: [
        { name: "Pâtisserie Chocolaterie Richon", desc: "Pâtisserie et chocolaterie artisanale" },
        { name: "Maison HIROSE Unterlinden", desc: "Spécialités japonaises et pâtisserie" },
        { name: "Le Petit Maraîcher", desc: "Produits frais et locaux" },
        {
          name: "Patisserie Gilg",
          desc: "Une ancienne pâtisserie, avec une approche traditionnelle. J'aime la pâtisserie « lemon extreme »… juste le bon équilibre entre goût, sucre, moelleux et citron…",
          link: "https://www.facebook.com/patisseriegilg/"
        },
        {
          name: "L'atelier de Yann",
          desc: "Pâtisserie avec chocolat… L'été dernier, je pensais qu'ils vendaient les meilleures glaces de Colmar. J'adore celle au yaourt (ça me rend fou en fait), et celle à la framboise (avec des fraîches)… Mais les pâtisseries sont délicieuses aussi…",
          link: "https://www.atelier-de-yann.com/"
        },
      ]
    },
    {
      category: "Shopping",
      items: [
        {
          name: "Matières Françaises",
          type: "Boutique textile",
          desc: "Une boutique de vêtements et tissus vendant des articles produits localement. Ces tissus étaient vendus à Yves Saint Laurent et Chanel quand j'étais enfant. La qualité est tout simplement formidable…"
        },
        {
          name: "Avenue d'Alsace",
          type: "Boutique textile",
          desc: "Cette boutique appartient à une femme qui aime les tissus locaux, et réinvente les dessins traditionnels. Elle produit ses textiles uniquement en France. Nous adorons son travail…"
        },
        {
          name: "Home Jasmin",
          type: "Fleurs & souvenirs",
          desc: "C'est un joli fleuriste, mais aussi sympa pour de petits cadeaux… Vraiment dans le style français…",
          link: "https://www.facebook.com/homejasmin.fleuriste/"
        },
        {
          name: "Lafage",
          type: "Cadeaux",
          desc: "Vous trouverez ici des petits cadeaux pour ceux qui aiment écrire, lire… De jolies cartes postales aussi…",
          link: "http://www.nospapeteries.com/papeterie/haut+rhin-68/colmar-68000/lafage-1539/"
        },
      ]
    },
    {
      category: "Utile et pratique",
      items: [
        {
          name: "Pharmacie du Cygne",
          desc: "Pharmacie Jean François Kelber"
        },
        {
          name: "City Fitness",
          type: "Salle de sport",
          desc: "Salle de sport"
        },
        {
          name: "Parking Rapp",
          type: "Parking",
          desc: "Ouvert 7h-21h. Nous pouvons vous fournir un accès 24h avec une carte de parking à un tarif journalier réduit. Contactez-nous sur www.lessuitesducygne.fr"
        },
      ]
    }
  ];