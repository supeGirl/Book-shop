'use strict'

var gBooks = [
  {
    id: 'bg4J78',
    title: 'The adventures of Lori Ipsi',
    price: 120,
    imgUrl: 'lori-ipsi.jpg',
  },
  {
    id: 'bg4J77',
    title: 'World Atlas',
    price: 300,
    imgUrl: 'world-atlas.jpg',
  },
  {
    id: 'bg4J75',
    title: 'Zorba the Greek',
    price: 87,
    imgUrl: 'zorba-the-greek.jpg',
  },
]

function getBooks() {
  return gBooks
}

function removeBook(bookId) {
  const idx = gBooks.findIndex((book) => book.id === bookId)
  if (idx !== -1) {
    gBooks.splice(idx, 1)
    return true
  } else {
    return false
  }
}

function updateBook(bookId, newPrice) {
  const book = gBooks.find((book) => book.id === bookId)

  if (!book) return false

  if (!isValidPrice(newPrice)) {
    alert('Please enter a valid positive number for the price!')
  }

  book.price = newPrice
}

function addBook(title, price) {
  if (!title) return
  if (!isValidPrice(price)) return

  const newBook = {
    id: makeid(),
    title: title,
    price: price,
  }

  gBooks.unshift(newBook)
}

function getBookById(bookId) {
  return gBooks.find((book) => book.id === bookId)
}
