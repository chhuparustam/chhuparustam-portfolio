/* Central contact/social source of truth — every consumer
   (Contact section, Footer, Hero actions) imports from here.
   Values are the owner's exact details; never invent, shorten,
   or replace them. `text` is the visible link label; `href` is
   the exact target. Empty href = not rendered. */

export const profile = {
  name: 'Chhuparustam Kumar Kushwaha',
  email: 'chhuparustamkushwaha30@gmail.com',
  phone: '+9779824284308',
  github: 'https://github.com/chhuparustam',
  instagram: 'https://www.instagram.com/chhuparustam.cr/',
  linkedin: 'https://www.linkedin.com/in/chhuparustam-kumar-kushwaha-76b661265/',
};

export const socialLinks = [
  {
    key: 'github',
    label: 'GitHub',
    text: 'GitHub',
    href: profile.github,
    icon: 'github',
    external: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    text: 'Instagram',
    href: profile.instagram,
    icon: 'instagram',
    external: true,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    text: 'LinkedIn',
    href: profile.linkedin,
    icon: 'linkedin',
    external: true,
  },
  {
    key: 'email',
    label: 'Email',
    text: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
    external: false,
  },
  {
    key: 'phone',
    label: 'Phone',
    text: profile.phone,
    href: `tel:${profile.phone}`,
    icon: 'phone',
    external: false,
  },
];

export function getActiveSocialLinks() {
  return socialLinks.filter((link) => Boolean(link.href));
}
