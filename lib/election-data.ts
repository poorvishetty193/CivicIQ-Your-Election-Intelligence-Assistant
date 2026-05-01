export type ElectionPhase = {
  id: string
  title: string
  description: string
  dateRange: string
  voterAction: string
  status: "completed" | "active" | "upcoming"
  type: ("presidential" | "midterm" | "local")[]
}

export const ELECTION_PHASES: ElectionPhase[] = [
  {
    id: "1",
    title: "Candidate Filing",
    description: "Candidates declare their intent to run and register with the appropriate election authorities. This process varies widely by state and office.",
    dateRange: "January - March (Election Year)",
    voterAction: "Start paying attention to who is entering the race and their initial platforms.",
    status: "completed",
    type: ["presidential", "midterm", "local"],
  },
  {
    id: "2",
    title: "Primary Elections",
    description: "Political parties select their official nominees for the general election. In presidential years, this includes caucuses and primary votes state by state.",
    dateRange: "February - August",
    voterAction: "Check if your state has an open or closed primary, ensure you are registered with a party if required, and vote in the primary.",
    status: "completed",
    type: ["presidential", "midterm", "local"],
  },
  {
    id: "3",
    title: "Voter Registration Deadline",
    description: "The final day residents can register to vote or update their existing registration for the upcoming general election.",
    dateRange: "October (Usually 15-30 days before Election Day)",
    voterAction: "Verify your voter registration status and address at least one month before the deadline.",
    status: "completed",
    type: ["presidential", "midterm", "local"],
  },
  {
    id: "4",
    title: "Early Voting Opens",
    description: "A period prior to Election Day where voters can cast their ballot in person at designated polling locations.",
    dateRange: "October - November",
    voterAction: "Find your early voting location and hours. Voting early often means shorter lines.",
    status: "active",
    type: ["presidential", "midterm", "local"],
  },
  {
    id: "5",
    title: "Absentee/Mail Ballot Deadline",
    description: "The deadline to request a mail-in ballot and the final date it must be postmarked or returned to the election office.",
    dateRange: "Late October - Election Day",
    voterAction: "Request your ballot early, follow all signature and envelope instructions carefully, and track your ballot if your state allows.",
    status: "active",
    type: ["presidential", "midterm", "local"],
  },
  {
    id: "6",
    title: "Election Day",
    description: "The final day to cast a ballot in person. By law, it is the Tuesday next after the first Monday in November.",
    dateRange: "First Tuesday following first Monday in November",
    voterAction: "Know your polling place, bring accepted ID if required, and stay in line if the polls close while you are waiting.",
    status: "upcoming",
    type: ["presidential", "midterm", "local"],
  },
  {
    id: "7",
    title: "Vote Counting & Certification",
    description: "Election officials process all eligible ballots, conduct audits, and officially certify the election results.",
    dateRange: "November - December",
    voterAction: "Be patient. Counting every legally cast vote takes time, especially in close races or states with many mail-in ballots.",
    status: "upcoming",
    type: ["presidential", "midterm", "local"],
  },
  {
    id: "8",
    title: "Inauguration / Taking Office",
    description: "The winning candidates are sworn into office and begin their terms.",
    dateRange: "January",
    voterAction: "Hold your elected officials accountable to their campaign promises.",
    status: "upcoming",
    type: ["presidential", "midterm", "local"],
  },
]
