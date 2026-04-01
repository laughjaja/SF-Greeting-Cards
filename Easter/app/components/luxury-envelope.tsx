"use client"

import { useEffect, useMemo, useState } from "react"

interface LuxuryEnvelopeProps {
  artworkSrc?: string
  message: {
    accentBodyIndexes?: number[]
    greeting?: string
    body: string[]
    signature?: string
  }
  seamX?: number
}

const FALLBACK_ARTWORK =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S-s5Bm7Jdm7kMpEUXu6NbqMxa1TZkNCn.png"

export function LuxuryEnvelope({
  artworkSrc = "/usethis.svg",
  message,
  seamX = 0.655,
}: LuxuryEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [resolvedArtworkSrc, setResolvedArtworkSrc] = useState(artworkSrc)

  useEffect(() => {
    setResolvedArtworkSrc(artworkSrc)
  }, [artworkSrc])

  const clampedSeam = useMemo(() => Math.min(Math.max(seamX, 0.1), 0.9), [seamX])
  const seamPercent = useMemo(() => Number((clampedSeam * 100).toFixed(2)), [clampedSeam])
  const accentBodyIndexes = useMemo(
    () => new Set(message.accentBodyIndexes ?? []),
    [message.accentBodyIndexes]
  )
  const leftImageWidth = useMemo(
    () => Number((100 / clampedSeam).toFixed(4)),
    [clampedSeam]
  )
  const rightImageWidth = useMemo(
    () => Number((100 / (1 - clampedSeam)).toFixed(4)),
    [clampedSeam]
  )

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3eee6] px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.72), rgba(255,255,255,0) 42%), linear-gradient(180deg, rgba(138,110,73,0.08), rgba(138,110,73,0))",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-8"
        style={{ width: "min(92vw, 520px)" }}
      >
        <div
          className="relative cursor-pointer select-none"
          onClick={() => setIsOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              setIsOpen((current) => !current)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={isOpen ? "Close envelope" : "Open envelope"}
        >
          <div
            className="relative z-10"
            style={{
              width: "min(84vw, 420px)",
              aspectRatio: "420 / 546",
              perspective: "2600px",
            }}
          >
            <div
              className="absolute inset-0 z-10 overflow-hidden rounded-[8px] border border-[#d9ccb8]/55 shadow-[0_30px_70px_rgba(44,30,14,0.16)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(233,221,201,1), rgba(224,210,188,1))",
              }}
            >
              <div className="grid h-full grid-rows-[20%_1fr_18%]">
                <div
                  className="flex items-center justify-center border-b border-[#ccb99a]/70"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(231,219,199,1), rgba(223,209,187,1))",
                  }}
                >
                  <div className="h-px w-24 bg-[#8c6911]/50" />
                </div>

                <div
                  className="flex items-center justify-center px-9 py-7 sm:px-12 sm:py-9"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(250,247,241,1), rgba(244,238,229,1))",
                  }}
                >
                  <div className="w-full max-w-[16.75rem]">
                    {message.greeting ? (
                      <p className="pb-6 font-serif text-sm italic tracking-[0.08em] text-[#665844]/70">
                        {message.greeting}
                      </p>
                    ) : null}

                    {message.body.map((paragraph, index) => (
                      <p
                        key={index}
                        className="pb-5 font-serif text-[15px] leading-[1.92] tracking-[0.015em] last:pb-0"
                        style={{
                          color: accentBodyIndexes.has(index) ? "#8c6911" : "#000000",
                          fontFamily: accentBodyIndexes.has(index)
                            ? "var(--font-playfair), Georgia, serif"
                            : "var(--font-cormorant), Georgia, serif",
                          fontWeight: accentBodyIndexes.has(index) ? 400 : 600,
                          fontStyle: accentBodyIndexes.has(index) ? "italic" : "normal",
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div
                  className="flex items-center justify-center border-t border-[#ccb99a]/70"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(223,209,187,1), rgba(216,201,179,1))",
                  }}
                >
                  {message.signature ? (
                    <p className="font-serif text-sm italic tracking-[0.1em] text-[#8d7550]">
                      {message.signature}
                    </p>
                  ) : (
                    <div className="h-px w-24 bg-[#8c6911]/38" />
                  )}
                </div>
              </div>
            </div>

            <div
              className="absolute inset-y-0 left-0 z-20"
              style={{
                width: `${seamPercent}%`,
              }}
            >
              <div
                style={{
                  height: "100%",
                  transformOrigin: "0% 50%",
                  transformStyle: "preserve-3d",
                  transform: isOpen ? "rotateY(-112deg)" : "rotateY(0deg)",
                  transition: "transform 1600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  filter: isOpen
                    ? "drop-shadow(-20px 18px 28px rgba(32, 22, 12, 0.16))"
                    : "drop-shadow(0 24px 54px rgba(32, 22, 12, 0.12))",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-l-[8px] rounded-r-[2px]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={resolvedArtworkSrc}
                    alt="Envelope artwork"
                    className="absolute inset-y-0 left-0 h-full max-w-none object-cover"
                    style={{ width: `${leftImageWidth}%` }}
                    draggable="false"
                    onError={() => {
                      if (resolvedArtworkSrc !== FALLBACK_ARTWORK) {
                        setResolvedArtworkSrc(FALLBACK_ARTWORK)
                      }
                    }}
                  />
                </div>

                <div
                  className="absolute inset-0 overflow-hidden rounded-l-[8px] rounded-r-[2px] border-r border-[#ccb99a]/70 bg-[#e4d4bc]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundImage:
                      "linear-gradient(180deg, rgba(233,221,201,1), rgba(224,210,188,1))",
                  }}
                />
              </div>
            </div>

            <div
              className="absolute inset-y-0 z-20"
              style={{
                left: `${seamPercent}%`,
                width: `${100 - seamPercent}%`,
              }}
            >
              <div
                style={{
                  height: "100%",
                  transformOrigin: "100% 50%",
                  transformStyle: "preserve-3d",
                  transform: isOpen ? "rotateY(112deg)" : "rotateY(0deg)",
                  transition: "transform 1600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  filter: isOpen
                    ? "drop-shadow(20px 18px 28px rgba(32, 22, 12, 0.16))"
                    : "drop-shadow(0 24px 54px rgba(32, 22, 12, 0.12))",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-l-[2px] rounded-r-[8px]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={resolvedArtworkSrc}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-y-0 right-0 h-full max-w-none object-cover"
                    style={{ width: `${rightImageWidth}%` }}
                    draggable="false"
                    onError={() => {
                      if (resolvedArtworkSrc !== FALLBACK_ARTWORK) {
                        setResolvedArtworkSrc(FALLBACK_ARTWORK)
                      }
                    }}
                  />
                </div>

                <div
                  className="absolute inset-0 overflow-hidden rounded-l-[2px] rounded-r-[8px] border-l border-[#ccb99a]/70 bg-[#e4d4bc]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundImage:
                      "linear-gradient(180deg, rgba(233,221,201,1), rgba(224,210,188,1))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
