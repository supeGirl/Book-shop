'use strict'

const gQueryOptions = {
  filterBy: {txt: '', minRating: 0},
  sortBy: {sortField: '', sortDir: 1}, // {vendor : -1}
  page: {idx: 0, size: 4},
}

function onInit() {
  _createBooks()

  renderBooks()
}

function renderBooks() {
  const elBooksList = document.querySelector('tbody')
  const books = getBooks(gQueryOptions)

  if (!books.length) {
    elBooksList.innerHTML = `<tr>
   <td colspan="4">No matching books were found...</td>
     </tr>`
    return
  }

  const srtHtml = books
    .map(
      (book, idx) => `
        <tr class = "${idx % 2 === 0 ? 'second-row' : ''}"> 
   <td>${book.id}</td>
   <td>${book.title}</td>
   <td>${book.price}</td>
   <td>
   <button class="read" onclick ="onShowDetails( '${book.id}')">Read</button>
   <button class="update"  onclick="onUpdateBook('${book.id}', 'price')">Update price</button>
   <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
   <td>${book.rating}</td>
   </td>
   </tr>

    `
    )
    .join('')

  elBooksList.innerHTML = srtHtml
}

//Remove
function onRemoveBook(bookId) {
  const isComfirmed = confirm('are you sure you want to delete?')

  if (!isComfirmed) {
    showMsg('OK! Not removing')
    return
  }
  removeBook(bookId)
  renderBooks()
  showMsg('Deleted')
}

// Update
function onUpdateBook(bookId, key) {
  const book = getBookById(bookId)

  let value = prompt('Update the book ' + key + ' is now ' + book[key])

  if (typeof book[key] === 'number') {
    value = parseInt(value)
  }
  if (!value) return showMsg('A book must have ' + key)

  // const newPrice = +prompt('Enter a new price ' + book.price)
  // if (!newPrice || newPrice <= 0) return alert('You must add valid price')

  updateBook(bookId, key, value)
  renderBooks()
  showMsg('Updated')
}

// Create - with Propmts
function onAddBook() {
  const bookName = prompt('What`s the book`s name?')
  const bookPrice = +prompt('What`s the book`s price?')
  const imgUrl = prompt('What`s the book`s imgUrl?')
  const description = prompt('What`s the book`s description?')

  if (!bookName || !isValidPrice(bookPrice)) {
    return alert('Please make sure to enter all required book details properly.')
  }

  addBook(bookName, bookPrice, imgUrl, description)
  renderBooks()
  showMsg('Added')
}

// Get
function onShowDetails(bookId) {
  const elBookModal = document.querySelector('.book-details')

  const book = getBookById(bookId)

  elBookModal.querySelector('.book-cover-img img').src = book.imgUrl
  elBookModal.querySelector('.book-desc h3').innerText = book.title
  elBookModal.querySelector('.book-desc p').innerText = book.description
  elBookModal.showModal()
}

function onSetFilterBy(filterBy) {

  console.log('filterBy: ', filterBy)

  if(filterBy.txt !== undefined) {
      gQueryOptions.filterBy.txt = filterBy.txt
  }

  if(filterBy.minRating !== undefined) {
      gQueryOptions.filterBy.minRating = filterBy.minRating
  }

  renderBooks()
  return
}

function onResetFilter() {
 const elFilterTxt = document.querySelector('.filter-txt')
 const elFilterRating = document.querySelector('.filter-rating')

 elFilterTxt.value =''
 elFilterRating.value = 0
 
 gQueryOptions.filterBy = {txt : '', minRating: 0}
 renderBooks()
}

function showMsg(action) {
  const msg = action
  const elMsg = document.querySelector('.user-msg')
  elMsg.innerText = msg
  elMsg.classList.remove('hide')

  setTimeout(() => {
    elMsg.classList.add('hide')
  }, 5000)
}
