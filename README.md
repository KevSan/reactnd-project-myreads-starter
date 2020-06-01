This README is pretty straight forward. Simply running `npm install` then `npm start should` do the trick. It worked for my work space and for my local machine. 

For my project, I created three components that get injected into the App.js Component. The BookList component handles the list of books, the Book component prints out each book in a nice format, and the CategoryMenu handles the menu button attached to each book. 

The state lives in the main App.js component and passes an updateShelf function all the way down to the CategoryMenu. Whenever a change is made to a books shelf, CategoryMenu handles it by using the BooksAPI update() function, then it calls on the App.js function updateBookShelf() to handle the changes accordingly. 

The App.js page also makes use of <Route> and <Link> to handle change between the main page and the search page. Lastly, whenever a search query is made, each book is checked against all the bookIDs currently on the shelves. If there's a match, a shelf key will be added to the book where the value is the current's book placement on the shelf. 
