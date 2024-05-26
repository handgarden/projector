import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GetProjectQuery, UpdateProjectMutation } from "../gql/graphql";
import { produce } from "immer";

type ProjectType = GetProjectQuery["project"];
type SlideType = GetProjectQuery["project"]["slides"][number];
type UpdateProjectType = UpdateProjectMutation["updateProject"];

type ProjectStoreType = {
  project: ProjectType | null;
  setProject: (project: ProjectType) => void;
  deleteProject: () => void;
  updateProject: (project: UpdateProjectType) => void;
  addNewSlide: (slide: Omit<SlideType, "seq">) => void;
  setSlide: (slide: SlideType) => void;
  updateSlide: (slide: SlideType) => void;
  deleteSlide: (slide: SlideType) => void;
};

export const useProjectStore = create<
  ProjectStoreType,
  [["zustand/devtools", never]]
>(
  devtools((set) => ({
    project: null,
    setProject: (project: ProjectType) => {
      const sortedSlides = [...project.slides]
        .sort((a, b) => a.seq - b.seq)
        .map((slide) => {
          const sortedImages = [...slide.images].sort((a, b) => a.seq - b.seq);
          return {
            ...slide,
            images: sortedImages,
          };
        });

      set((prev) => ({
        ...prev,
        project: {
          ...project,
          slides: sortedSlides,
        },
      }));
    },
    updateProject: (project: UpdateProjectType) => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;
          state.project.title = project.title;
          state.project.description = project.description;
        })
      );
    },
    deleteProject: () => {
      set(
        produce((state: ProjectStoreType) => {
          state.project = null;
        })
      );
    },
    setSlide: (slide: SlideType) => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;
          const sortedImages = [...slide.images].sort((a, b) => a.seq - b.seq);
          const updatedSlide = state.project.slides.map((s) => {
            if (s.seq !== slide.seq) {
              return s;
            }
            return {
              ...slide,
              images: sortedImages,
            };
          });
          const sortedSlides = [...updatedSlide].sort((a, b) => a.seq - b.seq);
          state.project.slides = sortedSlides;
        })
      );
    },
    addNewSlide: (slide) => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;

          state.project.slides = [
            ...state.project.slides,
            {
              ...slide,
              seq: state.project.slides.length + 1,
            },
          ];
        })
      );
    },
    updateSlide: (slide: SlideType) => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;
          state.project.slides = state.project.slides.map((s) => {
            if (s.seq !== slide.seq) {
              return s;
            }
            return slide;
          });
        })
      );
    },
    deleteSlide: (slide: SlideType) => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;
          if (state.project.slides.length < 1) {
            return;
          }
          state.project.slides = state.project.slides
            .filter((s) => s.seq !== slide.seq)
            .map((s, i) => {
              s.seq = i + 1;
              return s;
            });
        })
      );
    },
  }))
);
