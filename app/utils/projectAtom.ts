// atoms.ts
import { atom } from "jotai";
import { Feature, Project, Task } from "../types";

export const projectAtom = atom<Project>({
  project_id: 0,
  title: "",
  description: "",
  image_url: "",
  link: null,
  user_id: 0,
  features: [],
});

export const featuresAtom = atom<Feature[]>((get) => get(projectAtom).features);

export const tasksAtom = atom<Task[]>((get) =>
  get(featuresAtom).reduce((acc: Task[], feature: Feature) => {
    return [...acc, ...feature.tasks];
  }, [])
);
