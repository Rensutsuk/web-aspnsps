import { createRouteHandler } from "uploadthing/next";

import { uploadRouter } from "@/app/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
