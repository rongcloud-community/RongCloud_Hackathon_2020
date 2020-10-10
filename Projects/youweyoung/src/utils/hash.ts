export function hashString(str: string) {
  if (typeof str !== 'string') {
    return '';
  }
  let hash = 5381;
  let i = str.length;

  const i1 = str.charCodeAt(1);
  const i2 = str.charCodeAt(i);
  const i3 = str.charCodeAt(Math.floor(i / 2));
  let fs =
    mapIntigerToSafeString(i1) +
    mapIntigerToSafeString(i2) +
    mapIntigerToSafeString(i3);

  while (i) {
    // tslint:disable-next-line: no-bitwise
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  // tslint:disable-next-line: no-bitwise
  fs += '-' + mapIntigerToSafeString(hash >>> 0);
  return fs + '-' + mapIntigerToSafeString(str.length);
}

export function mapIntigerToSafeString(v: number): string {
  if (typeof v !== 'number' || isNaN(v)) {
    return '';
  }
  const t = safeChar.length;
  if (v < t) {
    return safeChar[v];
  }
  const left = v % t;
  return safeChar[left] + mapIntigerToSafeString((v - left) / t);
}

export const safeChar =
  '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
