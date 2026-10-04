export type HelpSection = {
  heading?: string
  lines: string[]
}

export type GameHelpContent = {
  title: string
  subtitle?: string
  sections: HelpSection[]
}