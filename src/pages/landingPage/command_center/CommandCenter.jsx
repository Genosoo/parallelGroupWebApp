import Activity from "./activity/Activity"
import "./CommandCenterStyle.css"
export default function CommandCenter() {
  return (
    <div className="commandCenterContainer">
      <h1 className="title">Command Center</h1>

      <Activity />
    </div>
  )
}
