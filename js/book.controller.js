'use strict'

function onInit() {
  renderBooks()
}

function renderBooks() {
  const elBooksList = document.querySelector('.books-list')

  const titleRow = `
    <thead>
      <tr class="title-row">
        <th>Title</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
  `
  const bookRow = gBooks.map(
    (book, idx) => `<tbody>
        <tr class = "${idx === 1 ? 'second-row' : ''}"> 
   <td>${book.title}</td>
   <td>${book.price}</td>
   <td>
   <button class="read">Read</button>
   <button class="update"  onclick="onUpdateBook('${book.id}')">Update</button>
   <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
   </td>
   </tr>
   </tbody>
    `
  )
  const srtHtml = titleRow + bookRow.join('')
  elBooksList.innerHTML = srtHtml
}

function onRemoveBook(bookId) {
  const isBookRemoved = removeBook(bookId)

  if (isBookRemoved) {
    renderBooks()
  } else {
    alert(`Failed to remove book with ID ('${bookId}').`)
  }
}

function onUpdateBook(bookId) {
  const book = gBooks.find((book) => book.id === bookId)
  if (!book) {
    alert(`Book with ID ('${bookId}') not found.`)
    return
  }

  const newPrice = +prompt('Enter a new price')
  if (isValidPrice(newPrice)) {
    updateBook(bookId, newPrice)
    renderBooks()
  } else {
    alert('Please enter a valid positive number for the price!')
  }
}

function onAddBook() {
  const bookName = prompt('What`s the book`s name?')
  if (!bookName) return

  const bookPrice = +prompt('What`s the book`s price?')
 if(!isValidPrice(bookPrice)) return

  addBook(bookName, bookPrice)
  renderBooks()
}



