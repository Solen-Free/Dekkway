import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <img src="/logo.png" alt="DEKKWAY Logo" className="h-6 w-6" />
              <span>DEKKWAY</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Votre plateforme immobilière de confiance au Sénégal. Connecter les propriétaires et les locataires depuis 2025.
            </p>
          </div>
          <FooterSection title="Liens Rapides" links={[
            { href: "/", label: "Accueil" },
            { href: "/properties", label: "Propriétés" },
            { href: "/search", label: "Recherche" },
            { href: "/about", label: "À Propos" },
          ]} />
          <FooterSection title="Légal" links={[
            { href: "/terms", label: "Conditions d'utilisation" },
            { href: "/privacy", label: "Politique de confidentialité" },
            { href: "/cookies", label: "Politique de cookies" },
          ]} />
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <a href="mailto:contact@dekkway.com" className="hover:underline">contact@dekkway.com</a></li>
              <li>Téléphone: <a href="tel:+221XXXXXXXXX" className="hover:underline">+221 XX XXX XX XX</a></li>
              <li>Adresse: Dakar, Sénégal</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DEKKWAY. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ title, links }) => (
  <div>
    <h3 className="font-semibold mb-3">{title}</h3>
    <ul className="space-y-2 text-sm">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
