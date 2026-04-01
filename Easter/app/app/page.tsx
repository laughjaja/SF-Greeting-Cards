import { LuxuryEnvelope } from "@/components/luxury-envelope"

export default function Page() {
  return (
    <LuxuryEnvelope
      message={{
        accentBodyIndexes: [2],
        body: [
          "A simple thank you for your trust, your partnership, and the conversations that have made the work both meaningful and enjoyable.",
          "Wishing you, your family, and your team a restful long weekend. Enjoy the time off.",
          "We look forward to continuing the work this spring."
        ],
      }}
    />
  )
}
