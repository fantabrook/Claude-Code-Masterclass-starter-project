// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p>
          Welcome to Pocket Heist — the covert mission board for your office chaos. Accept daring assignments, outwit your colleagues, and climb the leaderboard one sneaky task at a time. Whether you&apos;re staging the ultimate desk prank or orchestrating a surprise team lunch, every heist counts.
        </p>
      </div>
    </div>
  )
}
