import React from 'react';

const Breadcrumb = ({ links }) => {
  const lastItem = links[links.length - 1];
  return (
    <>
      <div id="website_visitors" className="astrologers-work py-12 bg-white" style={{ padding: "40px" }}>
        <div className="mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
          {lastItem.pagename && (
            <h2 className="text-center">
              {lastItem.pagename}
            </h2>
          )}
        </div>
      </div>
      <nav
        className="flex mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {links.map((link, index) => (
            <li
              key={index}
              className="inline-flex items-center"
            >
              {/* Render separator only if it's not the first or last item */}
              {index !== 0 && index !== links.length - 1 && (
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              {link.url ? (
                <a
                  href={link.url}
                  className={`ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 ${index !== 0 ? 'md:ml-2' : ''}`}
                >
                  {link.label}
                </a>
              ) : (
                <span
                  className={`ml-1 text-sm font-medium text-gray-500 ${index !== 0 ? 'md:ml-2' : ''}`}
                >
                  {link.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
