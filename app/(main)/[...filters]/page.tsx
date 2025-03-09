import { getParams, getPosts, type PostParams } from "@/lib/posts"
import { BlogPostPreview } from "@/ui/BlogPostPreview"

/**
 * Aside from our home page which lists all posts, we can further filter down
 * posts by type e.g. (post or video) and tag (e.g. react or next). We can use
 * `generateStaticParams()` to generate a static list of all possible params of
 * our filters based on our database of posts.
 */
export const generateStaticParams = () => {
  return getParams()
}

export default async function Page(props: { params: Promise<PostParams> }) {
  const params = await props.params
  const { posts, filters } = getPosts(params)

  return (
    <div className="mt-8 space-y-10">
      {filters?.tag ? (
        <div className="flex space-x-2">
          <div className="rounded-full border border-rose-100/5 py-0.5 px-2 text-rose-100/90">
            {filters.tag}
          </div>
        </div>
      ) : null}

      {posts.map((post) => {
        if (post.type === "Post") {
          return <BlogPostPreview key={post.slug} {...post} />
        }
      })}
    </div>
  )
}
