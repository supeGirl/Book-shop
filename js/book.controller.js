'use strict'

function onInit() {
  renderBooks()
}

function renderBooks() {
  const elBooksList = document.querySelector('tbody')

  const books = getBooks()

  const srtHtml = books.map((book, idx) => `
        <tr class = "${idx % 2 === 0 ? 'second-row' : ''}"> 
   <td>${book.title}</td>
   <td>${book.price}</td>
   <td>
   <button class="read" onclick ="onShowDetails(event, '${book.id}')">Read</button>
   <button class="update"  onclick="onUpdateBook('${book.id}')">Update</button>
   <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
   </td>
   </tr>

    `
    )
    .join('')

  elBooksList.innerHTML = srtHtml
}

// CR here
function onRemoveBook(bookId) {
  const isBookRemoved = removeBook(bookId)

  if (isBookRemoved) {
    renderBooks()
  } else {
    alert(`Failed to remove book with ID ('${bookId}').`)
  }
}

function onUpdateBook(bookId) {
  const newPrice = +prompt('Enter a new price')

  updateBook(bookId, newPrice)
  renderBooks()
}

function onAddBook() {
  const bookName = prompt('What`s the book`s name?')
  const bookPrice = +prompt('What`s the book`s price?')

  addBook(bookName, bookPrice)
  renderBooks()
}

function onShowDetails(ev, bookId) {
  ev.stopPropagation()
  const elDetails = document.querySelector('.book-details')
  const elPre = elDetails.querySelector('.book-details pre')
  const book = getBookById(bookId)

  //call function in the service that represent the book details

  elPre.innerText = JSON.stringify(book, null, 3)
  elDetails.showModal()
}
