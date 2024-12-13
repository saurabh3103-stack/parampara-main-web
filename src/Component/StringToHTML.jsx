import React from "react";

const StringToHTML = ({ htmlString }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

export default StringToHTML;
