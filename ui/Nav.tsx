import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { faBook, faGlobe } from "@fortawesome/free-solid-svg-icons"
import clsx from "clsx"
import Link from "next/link"
import React, { ElementType } from "react"

function NavItem({
  children,
  href,
  isActive,
  Icon,
}: {
  children: React.ReactNode
  href: string
  isActive?: boolean
  Icon: ElementType
}) {
  return (
    <Link
      href={href}
      className={clsx("group", FOCUS_VISIBLE_OUTLINE)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center sm:space-x-3">
        <div className="mb-0 flex justify-center sm:mb-0 sm:block">
          <div
            className={clsx(
              "rounded-lg bg-gradient-to-tl from-gray-800/80 to-gray-900/80 p-1 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-gray-800/40 group-active:translate-y-1",
              {
                "ring-[2px] ring-gray-800/30 ring-offset-1 ring-offset-black/5":
                  isActive,
              },
            )}
          >
            <Icon className="w-[20px] sm:w-[16px] transform text-gray-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
          </div>
        </div>
        <div className="hidden sm:block transition-colors group-hover:text-gray-50 ml-2">
          {children}
        </div>
      </div>
    </Link>
  )
}

export const Nav = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-base font-medium leading-none text-rose-100/90">
      <NavItem
        href="https://github.com/developerayo"
        Icon={() => (
          <FontAwesomeIcon icon={faGithub} className="w-[24px] h-[24px]" />
        )}
      >
        GitHub
      </NavItem>

      <NavItem
        href="https://twitter.com/developerayo"
        Icon={() => (
          <FontAwesomeIcon icon={faXTwitter} className="w-[24px] h-[24px]" />
        )}
      >
        X
      </NavItem>

      <NavItem
        href="https://shodipoayomide.com"
        Icon={() => (
          <FontAwesomeIcon icon={faGlobe} className="w-[24px] h-[24px]" />
        )}
      >
        Website
      </NavItem>
    </div>
  )
}
