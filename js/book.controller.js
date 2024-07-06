'use strict'

const LAYOUT_KEY = 'layout_db'
var gLayout = loadFromStorage(LAYOUT_KEY) || 'table'

const gQueryOptions = {
  filterBy: {txt: '', minRating: 0},
  sortBy: {sortField: '', sortDir: 1}, // {vendor : -1}
  page: {idx: 0, size: 5},
}

function onInit() {
  readQueryParams()
  renderBooks()
}

function renderBooks() {
  const elBooksList = document.querySelector('tbody')
  const books = getBooks(gQueryOptions)

  if (gLayout === 'cards') {
    renderBooksCards(books)
    return
  }

  if (!books.length) {
    elBooksList.innerHTML = `<tr>
   <td colspan="4">No matching books were found...</td>
     </tr>`
    return
  }

  const strHTMLs = books.map((book, idx) => {
    return `       <tr class = "${idx % 2 === 0 ? 'second-row' : ''}"> 
                    <td>${book.title}</td>
                    <td>$${book.price.toFixed(2)}</td>
                    <td>${book.rating}</td>
                    <td class="actions">
                        <button onclick="onShowDetails('${book.id}')" >Read</button>
                         <button onclick="onUpdateBook('${book.id}', 'price')" >Update price</button>
                        <button onclick="onRemoveBook('${book.id}')" >Delete</button>
                    </td>
                </tr>`
  })

  // Hide cards container
  document.querySelector('.cards-container ').style.display = 'none'
  // Show and render table container
  elBooksList.innerHTML = strHTMLs.join('')
  document.querySelector('table').style.display = 'table'

  setQueryParams()
}

function renderBooksCards(books) {
  const elCardsContainer = document.querySelector('.cards-container')
  if (!books.length) {
    elCardsContainer.innerHTML = `<div class="book-card">No matching books were found...</div>`
    return
  }

  const strHTMLs = books.map((book) => {
    return `
            <div class="book-card">
                <img src="${book.imgUrl}" />
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Rating:</strong> ${book.rating}</p>
                <p><strong>Price:$${book.price}</strong></p>
                <p><strong>Desc:</strong> ${book.description}</p>
                <div class="actions">
                    <button onclick="onShowDetails('${book.id}')" >Read</button>
                    <button onclick="onUpdateBook('${book.id}', 'price')" >Update price</button>
                    <button onclick="onRemoveBook('${book.id}')" >Delete</button>
                </div>
            </div>`
  })

  // Hide table container
  document.querySelector('table').style.display = 'none'
  // Show and render cards container
  elCardsContainer.innerHTML = strHTMLs.join('')
  elCardsContainer.style.display = 'flex'

  setQueryParams()
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
    return showMsg('Please make sure to enter all required book details properly.')
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

function onSetLayout(layout) {
  gLayout = layout
  saveToStorage(LAYOUT_KEY, gLayout)
  renderBooks()
}

function onSetFilterBy(filterBy) {
  console.log('filterBy: ', filterBy)

  if (filterBy.txt !== undefined) gQueryOptions.filterBy.txt = filterBy.txt
  if (filterBy.minRating !== undefined) gQueryOptions.filterBy.minRating = filterBy.minRating
  renderBooks()
  return
}

function onResetFilter() {
  const elFilterTxt = document.querySelector('.filter-txt')
  const elFilterRating = document.querySelector('.filter-rating')

  elFilterTxt.value = ''
  elFilterRating.value = 0

  gQueryOptions.filterBy = {txt: '', minRating: 0}
  renderBooks()
}

function onSetSortBy(elSortField) {
  console.log('elSortField', elSortField.value)

  gQueryOptions.sortBy.sortField = elSortField.value
  renderBooks()
}

function onSetSortDir(elSortDir) {
  const sortDir = elSortDir.checked ? -1 : 1
  gQueryOptions.sortBy.sortDir = sortDir
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

function onNextPage() {
  nextPage(gQueryOptions)
  renderBooks()
}

function onPrevPage() {
 prevPage(gQueryOptions)
 renderBooks()
}

function readQueryParams() {
  const queryParams = new URLSearchParams(window.location.search)

  gQueryOptions.filterBy = {
    txt: queryParams.get('txt') || '',
    minRating: +queryParams.get('minRating') || 0,
  }
  renderQueryParams()
}

function renderQueryParams() {
  document.querySelector('.filter-txt').value = gQueryOptions.filterBy.txt
  document.querySelector('.filter-rating').value = gQueryOptions.filterBy.minRating
}

function setQueryParams() {
  const queryParams = new URLSearchParams()

  queryParams.set('txt', gQueryOptions.filterBy.txt)
  queryParams.set('minRating', gQueryOptions.filterBy.minRating)

  const newUrl =
    window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + queryParams.toString()

  window.history.pushState({path: newUrl}, '', newUrl)
}
