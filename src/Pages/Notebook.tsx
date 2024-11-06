import React from 'react';
import Footer from '../../src/Components/Footer';
import Navbar from '../../src/Components/Navbar';
import LuaNotebook from '../../src/Components/LuaNotebook';

const NoteBookPage: React.FC = () => {
  return (
    <div className="notebook-page app-background">
      <Navbar />
      <main className="py-8">
        <LuaNotebook />
      </main>
      <Footer />
    </div>
  );
};

export default NoteBookPage;
