import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ============ MENTIONS LÉGALES ============
const mentionsLegales = {
  _id: 'pageMentionsLegales',
  _type: 'pageMentionsLegales',
  title: {
    fr: 'Mentions Légales',
    en: 'Legal Notice',
    de: 'Impressum',
    zh: '法律声明',
  },
  lastUpdate: 'janvier 2026',
  editeur: {
    nom: 'Immo Com SARL',
    adresse: '3 rue Charles Baudelaire\n68000 Colmar, France',
    telephone: '+33 (0)6 09 17 24 61',
    rcs: '434 009 320',
    siret: '434 009 320',
    ape: '5520Z',
    tva: 'FR76 434009320',
    siteWeb: 'https://lessuitesducygne.fr',
  },
  directeurPublication: {
    nom: 'Jérôme Kelber',
    societe: 'Immo Com SARL',
    adresse: '3 rue Charles Baudelaire\n68000 Colmar, France',
  },
  hebergeur: {
    nom: 'Netlify, Inc.',
    adresse: '512 2nd Street, Suite 200\nSan Francisco, CA 94107, USA',
    siteWeb: 'https://www.netlify.com',
  },
  sections: [
    {
      _key: 'conditions-utilisation',
      titre: {
        fr: "Conditions d'utilisation",
        en: 'Terms of Use',
        de: 'Nutzungsbedingungen',
        zh: '使用条款',
      },
      contenu: {
        fr: "Le site accessible par l'URL https://lessuitesducygne.fr est exploité dans le respect de la législation française. L'utilisation de ce site est régie par les présentes conditions générales.\n\nEn utilisant le site, vous reconnaissez avoir pris connaissance de ces conditions et les avoir acceptées. Celles-ci pourront être modifiées à tout moment et sans préavis par Immo Com SARL.",
        en: 'The website accessible at https://lessuitesducygne.fr is operated in compliance with French law. The use of this site is governed by these general conditions.\n\nBy using the site, you acknowledge that you have read and accepted these conditions. They may be modified at any time without notice by Immo Com SARL.',
        de: 'Die unter https://lessuitesducygne.fr zugängliche Website wird in Übereinstimmung mit französischem Recht betrieben. Die Nutzung dieser Website unterliegt diesen allgemeinen Bedingungen.\n\nDurch die Nutzung der Website erkennen Sie an, dass Sie diese Bedingungen gelesen und akzeptiert haben. Sie können jederzeit ohne Vorankündigung von Immo Com SARL geändert werden.',
        zh: '通过 https://lessuitesducygne.fr 访问的网站按照法国法律运营。本网站的使用受这些一般条款约束。\n\n使用本网站，即表示您已阅读并接受这些条款。Immo Com SARL 可随时修改这些条款，恕不另行通知。',
      },
    },
    {
      _key: 'limitation-responsabilite',
      titre: {
        fr: 'Limitation de responsabilité',
        en: 'Limitation of Liability',
        de: 'Haftungsbeschränkung',
        zh: '责任限制',
      },
      contenu: {
        fr: "Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.\n\nSi vous constatez une lacune, erreur ou ce qui paraît être un dysfonctionnement, merci de bien vouloir le signaler par mail à staff@lessuitesducygne.fr.\n\nTout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité.\n\nLes photos sont non contractuelles.\n\nLes liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité d'Immo Com SARL ni des Suites du Cygne.",
        en: "The information on this site is as accurate as possible and the site is periodically updated, but may contain inaccuracies, omissions or gaps.\n\nIf you notice a gap, error or what appears to be a malfunction, please report it by email to staff@lessuitesducygne.fr.\n\nAny downloaded content is at the user's own risk and responsibility.\n\nPhotos are not contractual.\n\nHypertext links on this website to other Internet resources do not engage the responsibility of Immo Com SARL or Les Suites du Cygne.",
        de: 'Die Informationen auf dieser Website sind so genau wie möglich und die Website wird regelmäßig aktualisiert, kann jedoch Ungenauigkeiten, Auslassungen oder Lücken enthalten.\n\nWenn Sie eine Lücke, einen Fehler oder eine Fehlfunktion feststellen, melden Sie dies bitte per E-Mail an staff@lessuitesducygne.fr.\n\nAlle heruntergeladenen Inhalte erfolgen auf eigenes Risiko des Benutzers.\n\nDie Fotos sind nicht vertraglich bindend.\n\nHyperlinks auf dieser Website zu anderen Internetressourcen begründen keine Haftung von Immo Com SARL oder Les Suites du Cygne.',
        zh: '本网站上的信息尽可能准确，网站会定期更新，但可能包含不准确、遗漏或空白。\n\n如果您发现问题、错误或故障，请发送电子邮件至 staff@lessuitesducygne.fr 报告。\n\n任何下载的内容均由用户自行承担风险和责任。\n\n照片不具有合同约束力。\n\n本网站指向其他互联网资源的超链接不构成 Immo Com SARL 或 Les Suites du Cygne 的责任。',
      },
    },
    {
      _key: 'propriete-intellectuelle',
      titre: {
        fr: 'Propriété intellectuelle',
        en: 'Intellectual Property',
        de: 'Geistiges Eigentum',
        zh: '知识产权',
      },
      contenu: {
        fr: "Tout le contenu du présent site, incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive d'Immo Com SARL à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.\n\nToute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit d'Immo Com SARL.\n\nCette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.",
        en: 'All content on this site, including but not limited to graphics, images, texts, videos, animations, sounds, logos, gifs and icons as well as their layout are the exclusive property of Immo Com SARL, except for trademarks, logos or content belonging to other partner companies or authors.\n\nAny reproduction, distribution, modification, adaptation, retransmission or publication, even partial, of these elements is strictly prohibited without the express written consent of Immo Com SARL.\n\nThis representation or reproduction, by any process whatsoever, constitutes an infringement sanctioned by articles L.335-2 and following of the Intellectual Property Code.',
        de: 'Alle Inhalte dieser Website, einschließlich, aber nicht beschränkt auf Grafiken, Bilder, Texte, Videos, Animationen, Töne, Logos, Gifs und Icons sowie deren Layout sind ausschließliches Eigentum von Immo Com SARL, mit Ausnahme von Marken, Logos oder Inhalten anderer Partnerunternehmen oder Autoren.\n\nJede Vervielfältigung, Verbreitung, Änderung, Anpassung, Weiterübertragung oder Veröffentlichung, auch teilweise, dieser Elemente ist ohne ausdrückliche schriftliche Zustimmung von Immo Com SARL strengstens untersagt.\n\nDiese Darstellung oder Vervielfältigung stellt eine Urheberrechtsverletzung dar, die nach den Artikeln L.335-2 ff. des Gesetzes über geistiges Eigentum geahndet wird.',
        zh: '本网站上的所有内容，包括但不限于图形、图像、文本、视频、动画、声音、徽标、gif 和图标及其布局，均为 Immo Com SARL 的专有财产，但属于其他合作公司或作者的商标、徽标或内容除外。\n\n未经 Immo Com SARL 明确书面同意，严禁以任何方式复制、分发、修改、改编、转播或发布这些元素的任何部分。\n\n这种复制或再现构成《知识产权法》第 L.335-2 条及后续条款所制裁的侵权行为。',
      },
    },
    {
      _key: 'droit-acces',
      titre: {
        fr: 'Droit d\'accès et données personnelles',
        en: 'Right of Access and Personal Data',
        de: 'Zugriffsrecht und personenbezogene Daten',
        zh: '访问权和个人数据',
      },
      contenu: {
        fr: "En application de la loi et du RGPD, les internautes disposent d'un droit d'accès, de rectification, de modification et de suppression concernant les données qui les concernent personnellement.\n\nCe droit peut être exercé par voie postale auprès de :\nImmo Com SARL\n3 rue Charles Baudelaire\n68000 Colmar\n\nOu par voie électronique à l'adresse : staff@lessuitesducygne.fr\n\nLes informations personnelles collectées ne sont en aucun cas confiées à des tiers hormis pour l'éventuelle bonne exécution de la prestation commandée par l'internaute.",
        en: 'In accordance with the law and the GDPR, users have the right to access, rectify, modify and delete their personal data.\n\nThis right can be exercised by mail to:\nImmo Com SARL\n3 rue Charles Baudelaire\n68000 Colmar, France\n\nOr by email to: staff@lessuitesducygne.fr\n\nPersonal information collected is never shared with third parties except for the proper execution of services ordered by the user.',
        de: 'Gemäß dem Gesetz und der DSGVO haben Benutzer das Recht auf Zugang, Berichtigung, Änderung und Löschung ihrer personenbezogenen Daten.\n\nDieses Recht kann per Post ausgeübt werden an:\nImmo Com SARL\n3 rue Charles Baudelaire\n68000 Colmar, Frankreich\n\nOder per E-Mail an: staff@lessuitesducygne.fr\n\nGesammelte persönliche Informationen werden niemals an Dritte weitergegeben, außer zur ordnungsgemäßen Ausführung der vom Benutzer bestellten Dienstleistungen.',
        zh: '根据法律和 GDPR，用户有权访问、更正、修改和删除其个人数据。\n\n可通过以下邮寄地址行使此权利：\nImmo Com SARL\n3 rue Charles Baudelaire\n68000 Colmar, France\n\n或发送电子邮件至：staff@lessuitesducygne.fr\n\n收集的个人信息绝不会与第三方共享，除非是为了正确执行用户订购的服务。',
      },
    },
    {
      _key: 'cookies',
      titre: {
        fr: 'Cookies',
        en: 'Cookies',
        de: 'Cookies',
        zh: 'Cookies',
      },
      contenu: {
        fr: "Pour des besoins de statistiques et d'affichage, le présent site utilise des cookies. Il s'agit de petits fichiers textes stockés sur votre disque dur afin d'enregistrer des données techniques sur votre navigation.\n\nCertaines parties de ce site ne peuvent être fonctionnelles sans l'acceptation de cookies.",
        en: 'For statistical and display purposes, this site uses cookies. These are small text files stored on your hard drive to record technical data about your browsing.\n\nSome parts of this site cannot function without accepting cookies.',
        de: 'Für statistische Zwecke und zur Anzeige verwendet diese Website Cookies. Dies sind kleine Textdateien, die auf Ihrer Festplatte gespeichert werden, um technische Daten über Ihr Surfverhalten aufzuzeichnen.\n\nEinige Teile dieser Website können ohne die Annahme von Cookies nicht funktionieren.',
        zh: '为了统计和显示目的，本网站使用 cookies。这些是存储在您硬盘上的小型文本文件，用于记录您浏览的技术数据。\n\n本网站的某些部分在不接受 cookies 的情况下无法正常运行。',
      },
    },
    {
      _key: 'litiges',
      titre: {
        fr: 'Litiges',
        en: 'Disputes',
        de: 'Streitigkeiten',
        zh: '争议',
      },
      contenu: {
        fr: "Les présentes conditions sont régies par les lois françaises et toute contestation ou litiges qui pourraient naître de l'interprétation ou de l'exécution de celles-ci seront de la compétence exclusive des tribunaux dont dépend le siège social de la société Immo Com SARL.\n\nLa langue de référence, pour le règlement de contentieux éventuels, est le français.",
        en: 'These conditions are governed by French law and any dispute arising from their interpretation or execution shall be subject to the exclusive jurisdiction of the courts where Immo Com SARL has its registered office.\n\nThe reference language for any disputes is French.',
        de: 'Diese Bedingungen unterliegen französischem Recht und alle Streitigkeiten, die sich aus ihrer Auslegung oder Ausführung ergeben, unterliegen der ausschließlichen Zuständigkeit der Gerichte, in deren Bezirk sich der Sitz von Immo Com SARL befindet.\n\nDie Referenzsprache für alle Streitigkeiten ist Französisch.',
        zh: '这些条款受法国法律管辖，因其解释或执行而产生的任何争议应由 Immo Com SARL 注册地所在法院专属管辖。\n\n任何争议的参考语言为法语。',
      },
    },
  ],
  contactEmail: 'staff@lessuitesducygne.fr',
};

// ============ POLITIQUE DE CONFIDENTIALITÉ ============
const politiqueConfidentialite = {
  _id: 'pagePolitiqueConfidentialite',
  _type: 'pagePolitiqueConfidentialite',
  title: {
    fr: 'Politique de Confidentialité',
    en: 'Privacy Policy',
    de: 'Datenschutzerklärung',
    zh: '隐私政策',
  },
  lastUpdate: 'janvier 2026',
  sections: [
    {
      _key: 'introduction',
      titre: {
        fr: 'Introduction',
        en: 'Introduction',
        de: 'Einleitung',
        zh: '简介',
      },
      contenu: {
        fr: "Les Suites du Cygne s'engage à protéger la vie privée des utilisateurs de son site web. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).",
        en: 'Les Suites du Cygne is committed to protecting the privacy of its website users. This privacy policy explains how we collect, use and protect your personal data in accordance with the General Data Protection Regulation (GDPR).',
        de: 'Les Suites du Cygne verpflichtet sich, die Privatsphäre seiner Website-Benutzer zu schützen. Diese Datenschutzerklärung erklärt, wie wir Ihre personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) erheben, verwenden und schützen.',
        zh: 'Les Suites du Cygne 致力于保护其网站用户的隐私。本隐私政策解释了我们如何根据《通用数据保护条例》(GDPR) 收集、使用和保护您的个人数据。',
      },
    },
    {
      _key: 'donnees-collectees',
      titre: {
        fr: 'Données collectées',
        en: 'Data Collected',
        de: 'Erhobene Daten',
        zh: '收集的数据',
      },
      contenu: {
        fr: "Dans le cadre de nos services, nous pouvons collecter les données suivantes :\n\n• Données d'identification : nom, prénom\n• Coordonnées : adresse email, numéro de téléphone, adresse postale\n• Données de réservation : dates de séjour, nombre de personnes, préférences\n• Données de paiement : traitées de manière sécurisée par notre prestataire de paiement\n• Données de navigation : adresse IP, type de navigateur, pages visitées",
        en: "As part of our services, we may collect the following data:\n\n• Identification data: surname, first name\n• Contact details: email address, phone number, postal address\n• Booking data: stay dates, number of people, preferences\n• Payment data: processed securely by our payment provider\n• Browsing data: IP address, browser type, pages visited",
        de: "Im Rahmen unserer Dienstleistungen können wir folgende Daten erheben:\n\n• Identifikationsdaten: Name, Vorname\n• Kontaktdaten: E-Mail-Adresse, Telefonnummer, Postanschrift\n• Buchungsdaten: Aufenthaltsdaten, Personenanzahl, Präferenzen\n• Zahlungsdaten: werden sicher von unserem Zahlungsanbieter verarbeitet\n• Navigationsdaten: IP-Adresse, Browsertyp, besuchte Seiten",
        zh: "作为我们服务的一部分，我们可能会收集以下数据：\n\n• 身份数据：姓名\n• 联系方式：电子邮件地址、电话号码、邮寄地址\n• 预订数据：住宿日期、人数、偏好\n• 支付数据：由我们的支付服务提供商安全处理\n• 浏览数据：IP 地址、浏览器类型、访问的页面",
      },
    },
    {
      _key: 'finalite',
      titre: {
        fr: 'Finalité du traitement',
        en: 'Purpose of Processing',
        de: 'Zweck der Verarbeitung',
        zh: '处理目的',
      },
      contenu: {
        fr: "Vos données personnelles sont collectées pour les finalités suivantes :\n\n• Traitement et gestion de vos réservations\n• Communication relative à votre séjour (confirmation, informations pratiques)\n• Réponse à vos demandes de renseignements\n• Établissement des factures et documents comptables\n• Amélioration de nos services et de l'expérience utilisateur",
        en: "Your personal data is collected for the following purposes:\n\n• Processing and managing your bookings\n• Communication regarding your stay (confirmation, practical information)\n• Responding to your inquiries\n• Issuing invoices and accounting documents\n• Improving our services and user experience",
        de: "Ihre personenbezogenen Daten werden für folgende Zwecke erhoben:\n\n• Bearbeitung und Verwaltung Ihrer Buchungen\n• Kommunikation bezüglich Ihres Aufenthalts (Bestätigung, praktische Informationen)\n• Beantwortung Ihrer Anfragen\n• Ausstellung von Rechnungen und Buchhaltungsunterlagen\n• Verbesserung unserer Dienstleistungen und der Benutzererfahrung",
        zh: "收集您的个人数据用于以下目的：\n\n• 处理和管理您的预订\n• 与您的住宿相关的沟通（确认、实用信息）\n• 回复您的咨询\n• 开具发票和会计文件\n• 改进我们的服务和用户体验",
      },
    },
    {
      _key: 'duree-conservation',
      titre: {
        fr: 'Durée de conservation',
        en: 'Data Retention Period',
        de: 'Aufbewahrungsdauer',
        zh: '数据保留期',
      },
      contenu: {
        fr: "Vos données personnelles sont conservées pendant les durées suivantes :\n\n• Données de réservation : 3 ans après la fin de la relation commerciale\n• Documents comptables : 10 ans (obligation légale)\n• Données de navigation (cookies) : 13 mois maximum",
        en: "Your personal data is retained for the following periods:\n\n• Booking data: 3 years after the end of the business relationship\n• Accounting documents: 10 years (legal requirement)\n• Browsing data (cookies): 13 months maximum",
        de: "Ihre personenbezogenen Daten werden für folgende Zeiträume aufbewahrt:\n\n• Buchungsdaten: 3 Jahre nach Ende der Geschäftsbeziehung\n• Buchhaltungsunterlagen: 10 Jahre (gesetzliche Anforderung)\n• Navigationsdaten (Cookies): maximal 13 Monate",
        zh: "您的个人数据将保留以下期限：\n\n• 预订数据：商业关系结束后3年\n• 会计文件：10年（法律要求）\n• 浏览数据（cookies）：最长13个月",
      },
    },
    {
      _key: 'vos-droits',
      titre: {
        fr: 'Vos droits',
        en: 'Your Rights',
        de: 'Ihre Rechte',
        zh: '您的权利',
      },
      contenu: {
        fr: "Conformément au RGPD, vous disposez des droits suivants :\n\n• Droit d'accès : obtenir une copie de vos données personnelles\n• Droit de rectification : corriger des données inexactes\n• Droit à l'effacement : demander la suppression de vos données\n• Droit à la portabilité : recevoir vos données dans un format structuré\n• Droit d'opposition : vous opposer au traitement de vos données\n• Droit de limitation : limiter le traitement de vos données\n\nPour exercer ces droits, contactez-nous à : staff@lessuitesducygne.fr\n\nVous pouvez également introduire une réclamation auprès de la CNIL : www.cnil.fr",
        en: "In accordance with the GDPR, you have the following rights:\n\n• Right of access: obtain a copy of your personal data\n• Right to rectification: correct inaccurate data\n• Right to erasure: request deletion of your data\n• Right to data portability: receive your data in a structured format\n• Right to object: object to the processing of your data\n• Right to restriction: limit the processing of your data\n\nTo exercise these rights, contact us at: staff@lessuitesducygne.fr\n\nYou may also file a complaint with the CNIL: www.cnil.fr",
        de: "Gemäß der DSGVO haben Sie folgende Rechte:\n\n• Auskunftsrecht: eine Kopie Ihrer personenbezogenen Daten erhalten\n• Recht auf Berichtigung: unrichtige Daten korrigieren\n• Recht auf Löschung: Löschung Ihrer Daten verlangen\n• Recht auf Datenübertragbarkeit: Ihre Daten in einem strukturierten Format erhalten\n• Widerspruchsrecht: der Verarbeitung Ihrer Daten widersprechen\n• Recht auf Einschränkung: die Verarbeitung Ihrer Daten einschränken\n\nUm diese Rechte auszuüben, kontaktieren Sie uns unter: staff@lessuitesducygne.fr\n\nSie können auch eine Beschwerde bei der CNIL einreichen: www.cnil.fr",
        zh: "根据 GDPR，您享有以下权利：\n\n• 访问权：获取您个人数据的副本\n• 更正权：更正不准确的数据\n• 删除权：要求删除您的数据\n• 数据可携带权：以结构化格式接收您的数据\n• 反对权：反对处理您的数据\n• 限制权：限制对您数据的处理\n\n要行使这些权利，请联系我们：staff@lessuitesducygne.fr\n\n您也可以向 CNIL 提出投诉：www.cnil.fr",
      },
    },
    {
      _key: 'securite',
      titre: {
        fr: 'Sécurité des données',
        en: 'Data Security',
        de: 'Datensicherheit',
        zh: '数据安全',
      },
      contenu: {
        fr: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Notre site utilise le protocole HTTPS pour sécuriser les échanges de données.",
        en: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, modification, disclosure or destruction. Our site uses the HTTPS protocol to secure data exchanges.",
        de: "Wir setzen geeignete technische und organisatorische Maßnahmen um, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen. Unsere Website verwendet das HTTPS-Protokoll zur Sicherung des Datenaustauschs.",
        zh: "我们实施适当的技术和组织措施来保护您的个人数据免受未经授权的访问、修改、披露或破坏。我们的网站使用 HTTPS 协议来保护数据交换的安全。",
      },
    },
  ],
  contact: {
    nom: 'Les Suites du Cygne',
    adresse: '20-22 Rue des Boulangers\n68000 Colmar, France',
    email: 'staff@lessuitesducygne.fr',
    telephone: '06 09 17 24 61',
  },
};

// ============ CONDITIONS GÉNÉRALES DE VENTE ============
const conditionsGenerales = {
  _id: 'pageConditionsGenerales',
  _type: 'pageConditionsGenerales',
  title: {
    fr: 'Conditions Générales de Vente',
    en: 'Terms and Conditions',
    de: 'Allgemeine Geschäftsbedingungen',
    zh: '销售条款',
  },
  lastUpdate: 'janvier 2026',
  articles: [
    {
      _key: 'article-1',
      numero: 'Article 1',
      titre: {
        fr: 'Objet',
        en: 'Purpose',
        de: 'Gegenstand',
        zh: '目的',
      },
      contenu: {
        fr: "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Les Suites du Cygne et ses clients dans le cadre de la location saisonnière d'appartements meublés situés au 20-22 Rue des Boulangers, 68000 Colmar.\n\nToute réservation implique l'acceptation sans réserve des présentes CGV.",
        en: "These Terms and Conditions govern the contractual relationship between Les Suites du Cygne and its clients for the seasonal rental of furnished apartments located at 20-22 Rue des Boulangers, 68000 Colmar.\n\nAny booking implies unreserved acceptance of these Terms and Conditions.",
        de: "Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Vertragsbeziehung zwischen Les Suites du Cygne und seinen Kunden für die saisonale Vermietung von möblierten Apartments in der Rue des Boulangers 20-22, 68000 Colmar.\n\nJede Buchung impliziert die vorbehaltlose Annahme dieser AGB.",
        zh: "本销售条款管理 Les Suites du Cygne 与其客户之间就位于 20-22 Rue des Boulangers, 68000 Colmar 的带家具公寓的季节性租赁的合同关系。\n\n任何预订均意味着无保留地接受本条款。",
      },
    },
    {
      _key: 'article-2',
      numero: 'Article 2',
      titre: {
        fr: 'Réservation et formation du contrat',
        en: 'Booking and Contract Formation',
        de: 'Buchung und Vertragsabschluss',
        zh: '预订和合同形成',
      },
      contenu: {
        fr: "2.1 Demande de réservation\nLa demande de réservation peut être effectuée via notre site internet, par email ou par téléphone. La proposition de contrat qui vous est faite est valable deux jours.\n\n2.2 Confirmation de réservation\nLe contrat de location est considéré comme définitivement conclu dès réception de l'acompte de 50% du montant total du séjour.\n\n2.3 Capacité d'accueil\nLe nombre de personnes ne peut dépasser la capacité maximale indiquée pour chaque appartement. Tout dépassement non autorisé pourra entraîner la résiliation immédiate du contrat sans remboursement.",
        en: "2.1 Booking Request\nBooking requests can be made through our website, by email or by phone. The contract proposal is valid for two days.\n\n2.2 Booking Confirmation\nThe rental contract is considered definitively concluded upon receipt of the 50% deposit of the total stay amount.\n\n2.3 Capacity\nThe number of guests cannot exceed the maximum capacity indicated for each apartment. Any unauthorized excess may result in immediate termination of the contract without refund.",
        de: "2.1 Buchungsanfrage\nBuchungsanfragen können über unsere Website, per E-Mail oder telefonisch erfolgen. Das Vertragsangebot ist zwei Tage gültig.\n\n2.2 Buchungsbestätigung\nDer Mietvertrag gilt als endgültig abgeschlossen, sobald die Anzahlung von 50% des Gesamtaufenthaltsbetrags eingegangen ist.\n\n2.3 Kapazität\nDie Anzahl der Gäste darf die für jede Wohnung angegebene Höchstkapazität nicht überschreiten. Jede unbefugte Überschreitung kann zur sofortigen Kündigung des Vertrags ohne Rückerstattung führen.",
        zh: "2.1 预订请求\n可通过我们的网站、电子邮件或电话提出预订请求。合同报价有效期为两天。\n\n2.2 预订确认\n收到住宿总金额 50% 的定金后，租赁合同即视为正式成立。\n\n2.3 容量\n客人人数不得超过每间公寓规定的最大容量。任何未经授权的超额可能导致合同立即终止且不予退款。",
      },
    },
    {
      _key: 'article-3',
      numero: 'Article 3',
      titre: {
        fr: 'Tarifs et modalités de paiement',
        en: 'Prices and Payment Terms',
        de: 'Preise und Zahlungsbedingungen',
        zh: '价格和付款条款',
      },
      contenu: {
        fr: "3.1 Tarifs\nLes tarifs sont indiqués en euros, toutes taxes comprises. Ils comprennent la location de l'appartement, les charges (eau, électricité, chauffage), le linge de maison et le ménage de fin de séjour.\n\n3.2 Acompte\nUn acompte de 50% du montant total est demandé à la réservation pour confirmer celle-ci.\n\n3.3 Solde\nLe solde de la location (50% restants) doit être versé au plus tard 60 jours avant la date d'arrivée.\n\n3.4 Moyens de paiement acceptés\nCarte bancaire, virement bancaire.",
        en: "3.1 Prices\nPrices are indicated in euros, all taxes included. They include apartment rental, utilities (water, electricity, heating), household linen and end-of-stay cleaning.\n\n3.2 Deposit\nA 50% deposit of the total amount is required at booking to confirm it.\n\n3.3 Balance\nThe rental balance (remaining 50%) must be paid no later than 60 days before the arrival date.\n\n3.4 Accepted Payment Methods\nCredit card, bank transfer.",
        de: "3.1 Preise\nDie Preise sind in Euro angegeben, alle Steuern inbegriffen. Sie beinhalten die Wohnungsmiete, Nebenkosten (Wasser, Strom, Heizung), Haushaltswäsche und Endreinigung.\n\n3.2 Anzahlung\nEine Anzahlung von 50% des Gesamtbetrags ist bei der Buchung zur Bestätigung erforderlich.\n\n3.3 Restzahlung\nDer Restbetrag der Miete (verbleibende 50%) muss spätestens 60 Tage vor dem Anreisedatum bezahlt werden.\n\n3.4 Akzeptierte Zahlungsmethoden\nKreditkarte, Banküberweisung.",
        zh: "3.1 价格\n价格以欧元标示，含所有税费。包括公寓租金、公用事业费（水、电、暖气）、家用织物和退房清洁。\n\n3.2 定金\n预订时需支付总金额 50% 的定金以确认预订。\n\n3.3 余款\n租金余额（剩余 50%）必须在抵达日期前至少 60 天支付。\n\n3.4 接受的付款方式\n信用卡、银行转账。",
      },
    },
    {
      _key: 'article-4',
      numero: 'Article 4',
      titre: {
        fr: 'Dépôt de garantie',
        en: 'Security Deposit',
        de: 'Kaution',
        zh: '押金',
      },
      contenu: {
        fr: "Une garantie de 500 euros est demandée par pré-autorisation sur votre carte de crédit avant l'entrée dans les lieux.\n\nCette garantie couvre les éventuels dommages causés au logement, au mobilier ou aux équipements, ainsi que les frais de ménage supplémentaires si nécessaire.\n\nLa pré-autorisation est annulée dans les 7 jours suivant le départ, sauf en cas de dégradations constatées. Tout dommage ou disparition fera l'objet d'une demande de dédommagement à hauteur des sommes engagées, majorées des frais occasionnés.",
        en: "A €500 security deposit is required via pre-authorization on your credit card before check-in.\n\nThis deposit covers any damage to the accommodation, furniture or equipment, as well as additional cleaning costs if necessary.\n\nThe pre-authorization is cancelled within 7 days after departure, unless damage is found. Any damage or loss will result in a compensation request for the amounts incurred, plus any additional costs.",
        de: "Eine Kaution von 500 Euro wird per Vorautorisierung auf Ihrer Kreditkarte vor dem Einzug verlangt.\n\nDiese Kaution deckt eventuelle Schäden an der Unterkunft, den Möbeln oder der Ausstattung sowie zusätzliche Reinigungskosten bei Bedarf.\n\nDie Vorautorisierung wird innerhalb von 7 Tagen nach der Abreise storniert, es sei denn, es werden Schäden festgestellt. Bei Schäden oder Verlusten wird eine Entschädigung in Höhe der entstandenen Beträge zuzüglich etwaiger Zusatzkosten verlangt.",
        zh: "入住前需通过信用卡预授权支付 500 欧元押金。\n\n该押金用于支付住宿、家具或设备可能造成的任何损坏，以及必要时的额外清洁费用。\n\n除非发现损坏，否则预授权将在退房后 7 天内取消。任何损坏或丢失将导致要求赔偿所产生的金额，以及任何额外费用。",
      },
    },
    {
      _key: 'article-5',
      numero: 'Article 5',
      titre: {
        fr: "Conditions d'annulation",
        en: 'Cancellation Policy',
        de: 'Stornierungsbedingungen',
        zh: '取消政策',
      },
      contenu: {
        fr: "5.1 Annulation par le client\n\n• Plus de 60 jours avant l'arrivée : Annulation possible moyennant 50€ de frais d'annulation. L'acompte (moins les frais) est remboursé.\n• Entre 60 et 30 jours avant l'arrivée : 50% du montant total est dû.\n• Moins de 30 jours avant l'arrivée : 100% du montant total est dû.\n• Non-présentation (no-show) : 100% du montant total est dû.\n\n5.2 Assurance annulation\nNous vous recommandons de souscrire une assurance annulation auprès de votre assureur ou d'un organisme spécialisé.\n\n5.3 Annulation par le propriétaire\nEn cas d'annulation de notre fait, le client sera intégralement remboursé des sommes versées. Aucune indemnité supplémentaire ne pourra être réclamée.",
        en: "5.1 Cancellation by the Client\n\n• More than 60 days before arrival: Cancellation possible with €50 cancellation fee. Deposit (minus fees) is refunded.\n• Between 60 and 30 days before arrival: 50% of total amount is due.\n• Less than 30 days before arrival: 100% of total amount is due.\n• No-show: 100% of total amount is due.\n\n5.2 Cancellation Insurance\nWe recommend taking out cancellation insurance with your insurer or a specialized organization.\n\n5.3 Cancellation by the Owner\nIn case of cancellation on our part, the client will be fully refunded. No additional compensation may be claimed.",
        de: "5.1 Stornierung durch den Kunden\n\n• Mehr als 60 Tage vor Anreise: Stornierung möglich mit 50€ Stornogebühr. Anzahlung (abzüglich Gebühren) wird erstattet.\n• Zwischen 60 und 30 Tagen vor Anreise: 50% des Gesamtbetrags sind fällig.\n• Weniger als 30 Tage vor Anreise: 100% des Gesamtbetrags sind fällig.\n• Nichterscheinen: 100% des Gesamtbetrags sind fällig.\n\n5.2 Reiserücktrittsversicherung\nWir empfehlen den Abschluss einer Reiserücktrittsversicherung bei Ihrem Versicherer oder einem spezialisierten Anbieter.\n\n5.3 Stornierung durch den Eigentümer\nIm Falle einer Stornierung unsererseits wird der Kunde vollständig erstattet. Keine zusätzliche Entschädigung kann geltend gemacht werden.",
        zh: "5.1 客户取消\n\n• 抵达前超过60天：可取消，需支付50欧元取消费。定金（扣除费用后）将退还。\n• 抵达前60至30天：需支付总金额的50%。\n• 抵达前少于30天：需支付总金额的100%。\n• 未入住：需支付总金额的100%。\n\n5.2 取消保险\n我们建议您向您的保险公司或专业机构购买取消保险。\n\n5.3 业主取消\n如果我们取消，客户将获得全额退款。不得要求额外赔偿。",
      },
    },
    {
      _key: 'article-6',
      numero: 'Article 6',
      titre: {
        fr: 'Arrivée et départ',
        en: 'Check-in and Check-out',
        de: 'An- und Abreise',
        zh: '入住和退房',
      },
      contenu: {
        fr: "6.1 Arrivée (check-in)\nL'appartement est disponible à partir de 16h00 le jour d'arrivée. L'accès se fait de manière autonome via un système de boîte à clés sécurisée. Les codes d'accès vous seront communiqués après un appel téléphonique de check-in.\n\n6.2 Départ (check-out)\nL'appartement doit être libéré au plus tard à 11h00 le jour du départ.\n\n6.3 État des lieux\nL'appartement est remis propre et en bon état. À votre départ, merci de le laisser dans un état correct (vaisselle faite, poubelles sorties).\n\n6.4 Ménage\nLes frais de ménage inclus couvrent 2 heures de travail. Si l'état de l'appartement à votre départ nécessite un temps de nettoyage supérieur, un supplément de 50€ par heure supplémentaire sera prélevé sur le dépôt de garantie.",
        en: "6.1 Check-in\nThe apartment is available from 4:00 PM on the day of arrival. Access is self-service via a secure key box system. Access codes will be provided after a phone check-in call.\n\n6.2 Check-out\nThe apartment must be vacated by 11:00 AM at the latest on the day of departure.\n\n6.3 Inventory\nThe apartment is provided clean and in good condition. Upon departure, please leave it in a proper state (dishes done, trash taken out).\n\n6.4 Cleaning\nIncluded cleaning covers 2 hours of work. If the apartment's condition upon departure requires additional cleaning time, a supplement of €50 per additional hour will be deducted from the security deposit.",
        de: "6.1 Check-in\nDie Wohnung ist ab 16:00 Uhr am Anreisetag verfügbar. Der Zugang erfolgt selbstständig über ein sicheres Schlüsselboxsystem. Die Zugangscodes werden nach einem telefonischen Check-in mitgeteilt.\n\n6.2 Check-out\nDie Wohnung muss spätestens um 11:00 Uhr am Abreisetag geräumt werden.\n\n6.3 Zustandsbericht\nDie Wohnung wird sauber und in gutem Zustand übergeben. Bitte hinterlassen Sie sie bei der Abreise in ordentlichem Zustand (Geschirr gespült, Müll entsorgt).\n\n6.4 Reinigung\nDie enthaltene Reinigung umfasst 2 Arbeitsstunden. Wenn der Zustand der Wohnung bei der Abreise zusätzliche Reinigungszeit erfordert, wird ein Zuschlag von 50€ pro zusätzlicher Stunde von der Kaution abgezogen.",
        zh: "6.1 入住\n公寓于抵达当天下午4:00起可用。通过安全钥匙箱系统自助进入。电话办理入住手续后将提供访问代码。\n\n6.2 退房\n最迟于离开当天上午11:00前腾空公寓。\n\n6.3 房况\n公寓交付时干净且状况良好。离开时，请保持适当状态（洗好碗、倒好垃圾）。\n\n6.4 清洁\n包含的清洁费用涵盖2小时的工作。如果您离开时公寓的状况需要额外的清洁时间，每增加一小时将从押金中扣除50欧元。",
      },
    },
    {
      _key: 'article-7',
      numero: 'Article 7',
      titre: {
        fr: 'Règlement intérieur',
        en: 'House Rules',
        de: 'Hausordnung',
        zh: '内部规定',
      },
      contenu: {
        fr: "• Non-fumeur : Il est strictement interdit de fumer à l'intérieur des appartements.\n• Animaux : Les animaux de compagnie ne sont pas acceptés.\n• Bruit : Par respect pour le voisinage, le calme est demandé entre 22h et 8h.\n• Fêtes et événements : Les fêtes et événements bruyants sont interdits.\n• Sous-location : La sous-location est strictement interdite.",
        en: "• Non-smoking: Smoking inside the apartments is strictly prohibited.\n• Pets: Pets are not accepted.\n• Noise: Out of respect for neighbors, quiet is required between 10 PM and 8 AM.\n• Parties and events: Noisy parties and events are prohibited.\n• Subletting: Subletting is strictly prohibited.",
        de: "• Nichtraucher: Das Rauchen in den Wohnungen ist strengstens untersagt.\n• Haustiere: Haustiere sind nicht erlaubt.\n• Lärm: Aus Rücksicht auf die Nachbarn wird zwischen 22 und 8 Uhr Ruhe erbeten.\n• Partys und Veranstaltungen: Laute Partys und Veranstaltungen sind untersagt.\n• Untervermietung: Untervermietung ist strengstens untersagt.",
        zh: "• 禁烟：严禁在公寓内吸烟。\n• 宠物：不接受宠物。\n• 噪音：出于对邻居的尊重，晚上10点至早上8点之间需保持安静。\n• 派对和活动：禁止喧闹的派对和活动。\n• 转租：严禁转租。",
      },
    },
    {
      _key: 'article-8',
      numero: 'Article 8',
      titre: {
        fr: 'Responsabilité',
        en: 'Liability',
        de: 'Haftung',
        zh: '责任',
      },
      contenu: {
        fr: "8.1 Responsabilité du locataire\nLe locataire est responsable des dommages causés à l'appartement, au mobilier et aux équipements pendant la durée de son séjour. Il doit jouir du logement en bon père de famille.\n\n8.2 Responsabilité du propriétaire\nLe propriétaire ne saurait être tenu responsable des vols, pertes d'objets ou dommages subis par le locataire pendant son séjour. Une assurance personnelle est recommandée.\n\n8.3 Force majeure\nAucune des parties ne pourra être tenue responsable en cas de force majeure (catastrophe naturelle, pandémie, guerre, etc.).",
        en: "8.1 Tenant's Liability\nThe tenant is responsible for damage caused to the apartment, furniture and equipment during their stay. They must use the accommodation responsibly.\n\n8.2 Owner's Liability\nThe owner cannot be held responsible for theft, loss of belongings or damage suffered by the tenant during their stay. Personal insurance is recommended.\n\n8.3 Force Majeure\nNeither party shall be held liable in case of force majeure (natural disaster, pandemic, war, etc.).",
        de: "8.1 Haftung des Mieters\nDer Mieter haftet für Schäden, die während seines Aufenthalts an der Wohnung, den Möbeln und der Ausstattung verursacht werden. Er muss die Unterkunft pfleglich behandeln.\n\n8.2 Haftung des Eigentümers\nDer Eigentümer kann nicht für Diebstahl, Verlust von Gegenständen oder Schäden, die der Mieter während seines Aufenthalts erleidet, haftbar gemacht werden. Eine persönliche Versicherung wird empfohlen.\n\n8.3 Höhere Gewalt\nKeine der Parteien haftet im Falle höherer Gewalt (Naturkatastrophe, Pandemie, Krieg usw.).",
        zh: "8.1 租客责任\n租客对住宿期间对公寓、家具和设备造成的损坏负责。必须合理使用住所。\n\n8.2 业主责任\n业主对租客在住宿期间遭受的盗窃、物品丢失或损坏不承担责任。建议购买个人保险。\n\n8.3 不可抗力\n任何一方均不对不可抗力（自然灾害、流行病、战争等）承担责任。",
      },
    },
    {
      _key: 'article-9',
      numero: 'Article 9',
      titre: {
        fr: 'Droit applicable',
        en: 'Applicable Law',
        de: 'Anwendbares Recht',
        zh: '适用法律',
      },
      contenu: {
        fr: "Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents de Colmar.",
        en: "These Terms and Conditions are governed by French law. In case of dispute, the parties will endeavor to find an amicable solution. Failing that, the dispute will be brought before the competent courts of Colmar.",
        de: "Diese AGB unterliegen französischem Recht. Im Streitfall werden die Parteien versuchen, eine gütliche Lösung zu finden. Andernfalls wird der Streit vor die zuständigen Gerichte von Colmar gebracht.",
        zh: "本条款受法国法律管辖。如发生争议，双方将努力寻求友好解决方案。如未能达成，争议将提交科尔马主管法院处理。",
      },
    },
  ],
  contact: {
    nom: 'Les Suites du Cygne',
    adresse: '20-22 Rue des Boulangers\n68000 Colmar, France',
    email: 'staff@lessuitesducygne.fr',
    telephone: '06 09 17 24 61',
  },
};

async function seedLegalPages() {
  console.log('Seeding legal pages...');

  try {
    // Create Mentions Légales
    console.log('Creating Mentions Légales...');
    await client.createOrReplace(mentionsLegales);
    console.log('✅ Mentions Légales created');

    // Create Politique de Confidentialité
    console.log('Creating Politique de Confidentialité...');
    await client.createOrReplace(politiqueConfidentialite);
    console.log('✅ Politique de Confidentialité created');

    // Create Conditions Générales
    console.log('Creating Conditions Générales...');
    await client.createOrReplace(conditionsGenerales);
    console.log('✅ Conditions Générales created');

    console.log('\n🎉 All legal pages seeded successfully!');
  } catch (error) {
    console.error('Error seeding legal pages:', error);
    throw error;
  }
}

seedLegalPages();
