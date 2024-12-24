import { defineDocumentType } from "contentlayer/source-files"
import GithubSlugger from "github-slugger"
// esbuild doesn't support module aliases 😤🤌
// https://github.com/evanw/esbuild/issues/394
// https://github.com/contentlayerdev/contentlayer/issues/238
import { formatShortDate } from "../../lib/formatShortDate"
import { Series } from "./Series"
import { Tag } from "./Tag"

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    description: { type: "string" },
    status: { type: "enum", options: ["draft", "published"], required: true },
    series: {
      type: "nested",
      of: Series,
    },
    tags: {
      type: "list",
      of: Tag,
    },
  },
  computedFields: {
    headings: {
      type: "json",
      resolve: async (doc) => {
        const slugger = new GithubSlugger()
        const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g

        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => ({
            heading: groups?.flag?.length,
            text: groups?.content,
            slug: groups?.content ? slugger.slug(groups?.content) : undefined
          })
        )

        return headings
      },
    },
    publishedAtFormatted: {
      type: "string",
      resolve: (doc) => {
        return formatShortDate(doc.publishedAt)
      },
    },
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.sourceFileName
          // hello-world.mdx => hello-world
          .replace(/\.mdx$/, ""),
    },
  },
}))
