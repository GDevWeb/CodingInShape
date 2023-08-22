import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {currentYear} Coding In Shape. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
