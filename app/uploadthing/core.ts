import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const uploadRouter = {
  blogImage: f({ image: { maxFileSize: '8MB', maxFileCount: 1 } }).onUploadComplete(async ({ file }) => {
    return { url: file.url }
  }),
  blogImages: f({ image: { maxFileSize: '8MB', maxFileCount: 10 } }).onUploadComplete(async ({ file }) => {
    return { url: file.url }
  }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter
