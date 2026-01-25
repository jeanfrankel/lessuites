import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from './i18n-config';

// Fichiers à ignorer pour le middleware (statiques, API, etc.)
const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string | undefined {
    // Négociation de contenu basée sur les headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    try {
        return matchLocale(languages, locales, i18n.defaultLocale);
    } catch (e) {
        return i18n.defaultLocale;
    }
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // 1. Ignorer les fichiers statiques (images, icons, etc) et l'API
    // Vérifie si le chemin contient une extension (ex: .jpg, .css) ou commence par /api ou /studio
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/studio') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/images') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    // 2. Vérifier si le chemin contient déjà la locale (ex: /en/appartements)
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // 3. Si la locale est manquante, on redirige
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // Si l'utilisateur est sur la racine pure "/", on redirige vers la locale détectée
        // Exemple: / -> /fr (ou /en selon navigateur)
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    // Matcher pour appliquer le middleware sur toutes les pages sauf exceptions
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
