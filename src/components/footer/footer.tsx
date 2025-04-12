import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col space-y-4">
              <div className="w-10 h-10">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                  <path
                    d="M4 12C4 9.79086 5.79086 8 8 8H16C18.2091 8 20 9.79086 20 12C20 14.2091 18.2091 16 16 16H8C5.79086 16 4 14.2091 4 12Z"
                    fill="currentColor"
                    opacity="0.7"
                  />
                  <path
                    d="M4 18C4 15.7909 5.79086 14 8 14H16C18.2091 14 20 15.7909 20 18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18Z"
                    fill="currentColor"
                    opacity="0.4"
                  />
                  <path
                    d="M4 6C4 3.79086 5.79086 2 8 2H16C18.2091 2 20 3.79086 20 6C20 8.20914 18.2091 10 16 10H8C5.79086 10 4 8.20914 4 6Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-sm md:text-base">Aprendiendo con personajes</p>
            </div>

            {/* Social media icons */}
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="col-span-1">
            <h3 className="font-medium text-white mb-4">Create video</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Upload
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Edit
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Share
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-white mb-4">Sign in</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-white mb-4">Sign up</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Free
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Business
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Aprendiendo con personajes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
