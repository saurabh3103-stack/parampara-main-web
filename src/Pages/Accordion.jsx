import React, { useState } from 'react';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="accordion-color" data-accordion="collapse" data-active-classes="bg-blue-100 text-blue-600">
      {/* Accordion Item 1 */}
      <div>
        <h2 id="accordion-color-heading-1">
          <button
            type="button"
            className={`flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium ${
              activeIndex === 1 ? 'bg-blue-100 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => toggleAccordion(1)}
          >
            <span>What is Neykart?</span>
            <span data-accordion-icon="" className={`shrink-0 ${activeIndex === 1 ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </h2>
        <div
          id="accordion-color-body-1"
          className={`${activeIndex === 1 ? 'block' : 'hidden'}`}
          aria-labelledby="accordion-color-heading-1"
        >
          <div className="border border-b-0 border-gray-200 p-5">
            <p className="mb-2 text-gray-500">
              Neykart is an HTML5 template of interactive components built on top of Tailwind CSS, including buttons,
              dropdowns, modals, navbars, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Item 2 */}
      <div>
        <h2 id="accordion-color-heading-2">
          <button
            type="button"
            className={`flex w-full items-center justify-between border border-b-0 border-gray-200 p-5 text-left font-medium ${
              activeIndex === 2 ? 'bg-blue-100 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => toggleAccordion(2)}
          >
            <span>Is there an Adobe XD file available?</span>
            <span data-accordion-icon="" className={`shrink-0 ${activeIndex === 2 ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </h2>
        <div
          id="accordion-color-body-2"
          className={`${activeIndex === 2 ? 'block' : 'hidden'}`}
          aria-labelledby="accordion-color-heading-2"
        >
          <div className="border border-b-0 border-gray-200 p-5">
            <p className="mb-2 text-gray-500">
              Neykart is first conceptualized and designed using the Adobe XD software, so everything you see in the
              library has a design equivalent in our XD file.
            </p>
            <p className="text-gray-500">
              Check out the{' '}
              <a href="https://www.adobe.com/xd/" className="text-blue-600 hover:underline">
                Adobe XD design system
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Item 3 */}
      <div>
        <h2 id="accordion-color-heading-3">
          <button
            type="button"
            className={`flex w-full items-center justify-between border border-gray-200 p-5 text-left font-medium ${
              activeIndex === 3 ? 'bg-blue-100 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => toggleAccordion(3)}
          >
            <span>How many pages are available in the Neykart template?</span>
            <span data-accordion-icon="" className={`shrink-0 ${activeIndex === 3 ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </h2>
        <div
          id="accordion-color-body-3"
          className={`${activeIndex === 3 ? 'block' : 'hidden'}`}
          aria-labelledby="accordion-color-heading-3"
        >
          <div className="border border-b-0 border-gray-200 p-5">
            <p className="mb-2 text-gray-500">
              Neykart eCommerce Template comes with a flexible file structure that can be easily used for small to large
              scope projects. This div explains the entire file structure and how to adapt it to your project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
