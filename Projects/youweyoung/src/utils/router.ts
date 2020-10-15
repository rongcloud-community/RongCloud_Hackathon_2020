import Router, { RouteConfig, RouteRecord } from 'vue-router';
export const setMatcher = (or: Router, nr: Router) => {
  (or as any).matcher = (nr as any).matcher;
};

export function mergeMeta(e: RouteRecord[]) {
  const meta: any = {};
  e.forEach(el => {
    Object.assign(meta, el.meta);
  });
  return meta;
}
export async function mergeMetaAsync(e: RouteRecord[]) {
  const meta: any = {};
  for (const el of e) {
    if (typeof el.meta?.loader !== 'function') {
      Object.assign(meta, el.meta);
    } else {
      Object.assign(meta, el.meta, await el.meta.loader());
    }
  }
  return meta;
}
export function mergeRoute(nv: RouteConfig[], ov: RouteConfig[]) {
  for (const route of ov) {
    const item = nv.find(el => el.path === route.path);
    if (item) {
      item.children = mergeRoute(route.children || [], item.children || []);
    } else {
      nv.push(route);
    }
  }
  return nv;
}
