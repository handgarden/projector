const PATH_PREFIX = "/projects";

export const PROJECT_PATH = {
  root: PATH_PREFIX,
  create: `${PATH_PREFIX}/create`,
  details: `${PATH_PREFIX}/:projectId`,
  edit: `${PATH_PREFIX}/:projectId/edit`,
  slide: {
    create: `${PATH_PREFIX}/:projectId/slide/create`,
    update: `${PATH_PREFIX}/:projectId/slide/:slideId`,
  },
} as const;
