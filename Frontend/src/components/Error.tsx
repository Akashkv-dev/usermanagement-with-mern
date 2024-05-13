import { useLocation } from "react-router-dom";

export const Error = () => {
    useLocation()
  return (
    <div>
        <h1>Ooops!!!!</h1>
        <h1>not found</h1>
    </div>
  )
}
