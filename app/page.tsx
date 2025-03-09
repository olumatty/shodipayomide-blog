import { meta } from "@/lib/constants"
import { getPosts } from "@/lib/posts"
import { BlogPostPreview } from "@/ui/BlogPostPreview"
import { IntersectionSwap } from "@/ui/IntersectionSwap"
import { Nav } from "@/ui/Nav"
import { ProfileImageLarge } from "@/ui/ProfileImage"
import { SiteHeader } from "@/ui/SiteHeader"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: meta.tagline,
  description: meta.description,
}

export default async function Page() {
  const { posts } = getPosts()

  return (
    <>
      <IntersectionSwap nav={<SiteHeader />}>
        <div className="space-y-8 -mt-6 lg:mt-0">
          <div className="flex items-center space-x-6">
            <ProfileImageLarge />

            <div className="mt-2">
              <h1 className="text-3xl font-semibold leading-none text-rose-100/90">
                Shodipo Ayomide
              </h1>
              <h2 className="mt-2 items-center space-y-2 text-lg font-medium leading-none text-rose-100/50 lg:mt-0 lg:flex lg:space-y-0 lg:space-x-2">
                <div className="whitespace-nowrap">
                  Head of Developer Relations at
                </div>
                <div className="flex space-x-2">
                  <a
                    className="group flex items-center space-x-1.5"
                    href="https://nukl.ai"
                  >
                    <div className="mb-1 h-6 w-6 rounded-md p-[2px] shadow-lg shadow-gray-900/60 ring-2 ring-gray-400/20 group-hover:shadow-xl group-hover:shadow-gray-700 group-hover:ring-gray-400/30">
                      <img
                        src="https://static.chainbroker.io/mediafiles/projects/nuklai/nukl.jpeg"
                        alt="Nuklai"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="group-hover:text-gray-100/90">Nuklai</div>
                  </a>
                </div>
              </h2>
            </div>
          </div>

          <div className="text-xl text-rose-100/90">{meta.description}</div>

          <Nav />
        </div>
      </IntersectionSwap>

      <div className="mt-10 space-y-10">
        {posts.map((post) => {
          if (post.type === "Post") {
            return <BlogPostPreview key={post.slug} {...post} />
          }
        })}
      </div>
    </>
  )
}
