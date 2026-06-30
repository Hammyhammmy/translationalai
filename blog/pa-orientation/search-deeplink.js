// Parse the Interactive page's ?tab=&id= deep link (from global site search).
// `has(tab, id)` returns truthy if that id is a real entry in that tab's data.
// Returns {tab, id} when both valid, {tab, id:null} when the tab is valid but the
// id is missing/unknown (switch the tab anyway), or null when there's nothing to do.
const TABS = ['normal', 'presentations', 'conditions', 'oncology', 'andrology', 'trauma', 'hardware'];

export function parseDeepLink(search, has) {
  const p = new URLSearchParams(search || '');
  const tab = p.get('tab');
  const id = p.get('id');
  if (!tab || !TABS.includes(tab)) return null;
  if (id && has(tab, id)) return { tab, id };
  return { tab, id: null };
}
