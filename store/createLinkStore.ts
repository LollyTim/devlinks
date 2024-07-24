import { create } from "zustand";

interface Link {
  platform: string;
  url: string;
}

interface Store {
  links: Link[];
  addLink: () => void;
  removeLink: (index: number) => void;
  updateLink: (index: number, newLink: Link) => void;
}

const useStore = create<Store>((set) => ({
  links: [],
  addLink: () =>
    set((state) => ({
      links: [...state.links, { platform: "", url: "" }],
    })),
  removeLink: (index) =>
    set((state) => ({
      links: state.links.filter((_, i) => i !== index),
    })),
  updateLink: (index, newLink) =>
    set((state) => ({
      links: state.links.map((link, i) => (i === index ? newLink : link)),
    })),
}));

export { useStore };
