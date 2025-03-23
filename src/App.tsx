import { useState } from 'react';
import ListGroup from './components/ListGroup';
import Alert from './components/Alert';
import Button from './components/Button';

function App() {
  let items = ['plato', 'platofa', 'violetplato', 'amanplato'];
  let heading = "Yo cuando paso cosas al componente";
  
  const handleSelectListItem = (item: string) => {
    console.log(item);
  };

  let [alertVisibility, setAlertVisibility] = useState(false)

  return (
<div>
      {alertVisibility && <Alert>Tocado</Alert>}
      <Button onClick={() => setAlertVisibility(true)}>Tocame</Button>

      <ListGroup
        items={items}
        heading={heading}
        onSelectListItem={handleSelectListItem}
      />
    </div>
  );
}

export default App;