import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function HomeButton() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="flex justify-start">
        <Link
          to="/guest"
          className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-white to-white/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Home className="w-4 h-4 text-blue-600" />
          </div>
        </Link>
      </div>
    </nav>
  )
}
