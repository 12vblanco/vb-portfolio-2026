import React from "react";

const copyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const CopyToClipboardButton = ({ email, emailIcon, onCopySuccess }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const modifiedEmail = email.replace(/AhT/g, "@").replace(/DhOT/g, ".");
    copyToClipboard(modifiedEmail);

    if (onCopySuccess) {
      onCopySuccess();
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ marginTop: ".3rem", cursor: "pointer", marginLeft: "1px" }}
    >
      <img src={emailIcon} alt="Copy Email" width="220" />
    </div>
  );
};

export default CopyToClipboardButton;
