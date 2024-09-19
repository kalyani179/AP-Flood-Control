import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#ccd8f1] p-7 pt-20 text-center">
      <p className="text-xs text-gray-500">
        Developed by{' '}
        <a 
          href="https://www.qoptars.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Qoptars Private Limited
        </a>{' '}
        and{' '}
        <a 
          href="https://enhub.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Enhub.ai
        </a>
      </p>
    </footer>
  );
};

export default Footer;
