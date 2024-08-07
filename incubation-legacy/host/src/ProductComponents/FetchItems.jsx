const fetchItems = () => {
    return fetch('/items.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };
  
  export default fetchItems;
  