"use client";

class storage {
  constructor() {}

  private validate(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  get(key: string) {
     
    const item = window.localStorage.getItem(key);

    if (!item) {
      return {};
    }

    if (this.validate(item)) {
      return JSON.parse(item);
    }

    return {};
  }

  set(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export const useStorage = new storage();
