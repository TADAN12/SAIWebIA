import SignIn from "./signin";
import {gatewayHost,gatewayPort} from "../../gateway.js"
export default function Page() {
  console.log(process.env)
  return(
    <SignIn gatewayHost={gatewayHost} gatewayPort={gatewayPort}></SignIn>
  )
}
