"use client"

import { FOCUS_VISIBLE_OUTLINE, LINK_SUBTLE_STYLES } from "@/lib/constants"
import clsx from "clsx"
import Link from "next/link"
// import { useState } from "react"
import confetti from "canvas-confetti"

const WEEKDAYS_INNIT = {
  Monday: "It's Monday, innit!",
  Tuesday: "It's Chewsday innit!",
  Wednesday: "It's Wednesday innit!",
  Thursday: "It's Thursday, innit!",
  Friday: "It's Friday, innit!",
  Saturday: "It's Saturday innit! Enjoy your weekend!",
  Sunday: "It's Sunday innit",
}

export const SiteFooter = () => {
  const getDayAndMessage = () => {
    const day = new Date().toLocaleDateString("en-GB", { weekday: "long" })
    return WEEKDAYS_INNIT[day] ?? "Welcome innit!"
  }

  const fireConfetti = () => {
    const defaults = {
      origin: { y: 0.7 },
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["text"],
      scalar: 2,
    }

    confetti({
      ...defaults,
      particleCount: 300,
      text: "🔥",
    })

    confetti({
      ...defaults,
      particleCount: 300,
      text: "🚀",
    })

    const end = Date.now() + 1 * 1000

    ;(function frame() {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#bb0000", "#ffffff"],
      })
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#bb0000", "#ffffff"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()

    const defaults2 = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["star"],
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    }

    function shoot() {
      confetti({
        ...defaults2,
        particleCount: 150,
        scalar: 1.2,
        shapes: ["star"],
      })

      confetti({
        ...defaults2,
        particleCount: 150,
        scalar: 0.75,
        shapes: ["circle"],
      })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)

    const duration = 2000
    const animationEnd = Date.now() + duration
    let skew = 1

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    ;(function frame() {
      const timeLeft = animationEnd - Date.now()
      const ticks = Math.max(200, 500 * (timeLeft / duration))
      skew = Math.max(0.8, skew - 0.001)

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      })

      if (timeLeft > 0) {
        requestAnimationFrame(frame)
      }
    })()
  }

  const handleClick = () => {
    fireConfetti()
  }

  return (
    <footer className="mt-36 pb-36 text-base relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col justify-between items-center lg:flex-row">
          <div className="mb-4 lg:mb-0">
            <button
              className="text-rose-100 cursor-pointer transition-all duration-300 transform 
                         hover:scale-110 active:scale-95 px-4 py-2 rounded-lg 
                         hover:bg-rose-100/10 active:bg-rose-100/20
                         focus:outline-none focus:ring-2 focus:ring-rose-500/70"
              onClick={handleClick}
              aria-label="Click for celebration animation"
            >
              {getDayAndMessage()}
            </button>
          </div>

          <nav className="flex justify-center space-x-5">
            <Link
              href="/blog"
              className={clsx(
                LINK_SUBTLE_STYLES,
                FOCUS_VISIBLE_OUTLINE,
                "transition-all hover:text-rose-100",
              )}
            >
              Blog
            </Link>

            <Link
              href="https://twitter.com/developerayo"
              className={clsx(
                LINK_SUBTLE_STYLES,
                FOCUS_VISIBLE_OUTLINE,
                "transition-all hover:text-rose-100",
              )}
            >
              X
            </Link>
            <Link
              href="https://shodipoayomide.com"
              className={clsx(
                LINK_SUBTLE_STYLES,
                FOCUS_VISIBLE_OUTLINE,
                "transition-all hover:text-rose-100",
              )}
            >
              Website
            </Link>
            <Link
              href="https://github.com/developerayo"
              className={clsx(
                LINK_SUBTLE_STYLES,
                FOCUS_VISIBLE_OUTLINE,
                "transition-all hover:text-rose-100",
              )}
            >
              GitHub
            </Link>
          </nav>

           <div className="text-center">
            <p className="text-rose-200/30">
              Built with{" "}
              <span role="img" aria-label="love">
                ❤️
              </span>{" "}
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}