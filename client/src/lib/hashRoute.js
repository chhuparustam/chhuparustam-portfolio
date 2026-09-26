/* Lightweight hash routing — no router dependency. Two shapes:
   '' or '#section' renders the homepage (scrolling to the section
   when one is named); '#/project/:id' renders the project detail
   page. Unknown '#/...' shapes fall back to the homepage. */

export function getRouteFromHash(hash) {
  if (typeof hash !== 'string' || hash === '' || hash === '#') {
    return { name: 'home', id: null, section: null };
  }
  const projectMatch = hash.match(/^#\/project\/([\w-]+)\/?$/);
  if (projectMatch) {
    return { name: 'project', id: projectMatch[1], section: null };
  }
  if (hash.startsWith('#/')) {
    return { name: 'home', id: null, section: null };
  }
  return { name: 'home', id: null, section: hash.slice(1) };
}

export function projectPath(id) {
  return `#/project/${id}`;
}
