import { mapIntigerToSafeString } from "./hash";

export class SimDB {
  namespace: string;
  private innerNamespace: string;
  constructor(namespace = "def") {
    this.namespace = namespace;
    let hashMap = localStorage["namespace_map"];
    if (!hashMap) {
      hashMap = [namespace];
      this.innerNamespace = mapIntigerToSafeString(0);
      localStorage["namespace_map"] = JSON.stringify(hashMap);
    } else {
      hashMap = JSON.stringify(hashMap);
      const index = hashMap.indexOf(namespace);
      if (index === -1) {
        this.innerNamespace = mapIntigerToSafeString(hashMap.length);
        hashMap.push(namespace);
        localStorage["namespace_map"] = JSON.stringify(hashMap);
      } else {
        this.innerNamespace = mapIntigerToSafeString(index);
      }
    }
  }
  private innerKey(key: string) {
    return `${this.innerNamespace}_${key}`;
  }
  get(key: string) {
    const val = localStorage[this.innerKey(key)];
    if (val) {
      return JSON.parse(val);
    }
    return undefined;
  }
  set(key: string, val: any) {
    if (val === undefined) {
      return true;
    }
    localStorage[this.innerKey(key)] = JSON.stringify(val);
  }
  del(key: string) {
    localStorage.removeItem(this.innerKey(key));
  }
  clear() {
    for (const key of Object.keys(localStorage)) {
      if (key.split("_")[0] === this.namespace) {
        this.del(key);
      }
    }
  }
}

export class SessionDB {}
