import { Link } from "react-router-dom"
import { Home, ChevronRight } from "lucide-react"

const Breadcrumb = ({ links }) => {
  return (
    <nav className="py-4 max-w-7xl mx-auto  w-full ">
      <ol className="flex items-center flex-wrap text-sm">
        {links.map((link, index) => (
          <li key={index} className="flex items-center">
            {link.url ? (
              <>
                <Link to={link.url} className="text-orange-700 hover:text-orange-900 flex items-center">
                  {index === 0 ? (
                    <>
                      <Home className="h-3.5 w-3.5 mr-1" />
                      {link.label}
                    </>
                  ) : (
                    link.label
                  )}
                </Link>
                <ChevronRight className="h-3 w-3 mx-2 text-orange-400" />
              </>
            ) : (
              <span className="text-orange-900 font-medium">{link.pagename}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb

