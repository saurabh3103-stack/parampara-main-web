import React from 'react';
import BrahmanBhojForm from './BrahmanBhojForm'

export default function BrahmanBhoj() {
  const breadcrumbLinks = [
    { label: 'Home', url: '/' },
    { label: 'Brahman Bhoj', url: '/brahman-bhoj' },
    { pagename: 'Brahman Bhoj' },
  ];
  
  return (
    <>
      <div className="bg-gradient-to-br from-orange-100 to-yellow-100 min-h-screen">
        <div className="container mx-auto">
          {/* <nav className="py-4 px-4">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbLinks.map((link, index) => (
                <li key={index} className="flex items-center">
                  {link.url ? (
                    <>
                      <a href={link.url} className="text-orange-700 hover:text-orange-900">{link.label}</a>
                      <span className="mx-2 text-orange-400">/</span>
                    </>
                  ) : (
                    <span className="text-orange-900 font-medium">{link.pagename}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav> */}
          <BrahmanBhojForm/>
        </div>
      </div>
    </>
  );
}