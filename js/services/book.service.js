'use strict'

var gBooks = [
  {
    id: 'bg4J78',
    title: 'The adventures of Lori Ipsi',
    price: 120,
    imgUrl: 'lori-ipsi.jpg',
  },
  {
    id: 'bg4J78',
    title: 'World Atlas',
    price: 300,
    imgUrl: 'world-atlas.jpg',
  },
  {
    id: 'bg4J78',
    title: 'Zorba the Greek',
    price: 87,
    imgUrl: 'zorba-the-greek.jpg',
  },
]
const showBooks = getBooks()
console.log('The books are:',showBooks)

function getBooks() {
  return gBooks
}
