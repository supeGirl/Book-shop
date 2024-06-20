'use strict'

function onInit() {
  _createBooks()

  renderBooks()
}

function renderBooks() {
  const elBooksList = document.querySelector('tbody')

  const books = getBooks()

  const srtHtml = books
    .map(
      (book, idx) => `
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
  const isComfirmed = confirm('are you sure you want to delete?')

  if (!isComfirmed) {
    alert('ok im not removing')
    return
  }
  alert('delete ')
  removeBook(bookId)
  renderBooks()
}

// Update
function onUpdateBook(bookId, key) {
  const book = getBookById(bookId)
  const newPrice = +prompt('Enter a new price ' + book.price)
  if (!newPrice || newPrice <= 0) return alert('You must add valid price')

  updateBook(bookId, key, newPrice)
  renderBooks()
}

// Create - with Propmts
function onAddBook() {
  const bookName = prompt('What`s the book`s name?')
  const bookPrice = +prompt('What`s the book`s price?')

  addBook(bookName, bookPrice)
  renderBooks()
}

// Get
function onShowDetails(ev, bookId) {
  ev.stopPropagation()
  const elDetails = document.querySelector('.book-details')
  const elPre = elDetails.querySelector('.book-details pre')
  const book = getBookById(bookId)

  //call function in the service that represent the book details
  const formattedDetails = formatBookDetails(bookId)

  elPre.innerText = formattedDetails
  elDetails.showModal()
}
