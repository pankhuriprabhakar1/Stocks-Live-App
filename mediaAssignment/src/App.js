import React from 'react';
import StockPageHeader from './pages/StockPageHeader';
import StockPageContent from './pages/StockPageContent';

//App component to render stock live app components
function App() {
  return (
    <div>
      <StockPageHeader></StockPageHeader>
      <StockPageContent></StockPageContent>
    </div>    
  );
}

export default App;
