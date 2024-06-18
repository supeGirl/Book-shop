'use strict'

var gBooks = [
  {
    id: 'bg4J78',
    title: 'Ikigai',
    price: 240,
    description: `INTERNATIONAL BESTSELLER • 2 MILLION+ COPIES SOLD WORLDWIDE

“Workers looking for more fulfilling positions should start by identifying their ikigai.” ―Business Insider \n
 
“One of the unintended—yet positive—consequences of the [pandemic] is that it is forcing people to reevaluate their jobs, careers, and lives. Use this time wisely, find your personal ikigai, and live your best life.” ―Forbes \n

Find your ikigai (pronounced ee-key-guy) to live longer and bring more meaning and joy to all your days. \n

“Only staying active will make you want to live a hundred years.” —Japanese proverb\n
 
According to the Japanese, everyone has an ikigai—a reason for living. And according to the residents of the Japanese village with the world’s longest-living people, finding it is the key to a happier and longer life. Having a strong sense of ikigai—where what you love, what you’re good at, what you can get paid for, and what the world needs all overlap—means that each day is infused with meaning. It’s the reason we get up in the morning. It’s also the reason many Japanese never really retire (in fact there’s no word in Japanese that means retire in the sense it does in English): They remain active and work at what they enjoy, because they’ve found a real purpose in life—the happiness of always being busy.

In researching this book, the authors interviewed the residents of the Japanese village with the highest percentage of 100-year-olds—one of the world’s Blue Zones. Ikigai reveals the secrets to their longevity and happiness: how they eat, how they move, how they work, how they foster collaboration and community, and—their best-kept secret—how they find the ikigai that brings satisfaction to their lives. And it provides practical tools to help you discover your own ikigai. Because who doesn’t want to find happiness in every day?

`,
    imgUrl: 'jpg/ikigai.jpg',
  },
  {
    id: 'bg4J77',
    title: 'World Atlas',
    price: 290.99,
    description: `With more than 250 maps, graphics, and illustrations, the National Geographic Concise Atlas of the World offers an authoritative and engaging portrayal of the world and all that is in it.

    Expert, up-to-date maps of the world, every continent, and the United States include physical and political details and boundaries, key data for each continent, plus flags and facts for every country, enhanced with representative photographs portraying themes and regions. Additionally, maps and data-based graphics visualize the timely issues of our day, such as population trends, climatic conditions, health, and economics. A special section on space includes maps of Earth’s moon and Mars, as well as diagrams of the solar system, the universe, and exploratory missions. Large-format pages allow for copious detail; a sturdy softcover format promises a long shelf life; and a comprehensive place-name index enables quick and easy searches.
    
    This newest edition of the Concise Atlas of the World brings National Geographic’s award-winning cartography into everyone’s reach.
    `,
    imgUrl: 'jpg/world-atlass.jpg',
  },
  {
    id: 'bg4J75',
    title: 'Zorba the Greek',
    price: 180,
    description: `A stunning new translation of the classic book—and basis for the beloved Oscar-winning film—brings the clarity and beauty of Kazantzakis’s language and story alive.

First published in 1946, Zorba the Greek, is, on one hand, the story of a Greek working man named Zorba, a passionate lover of life, the unnamed narrator who he accompanies to Crete to work in a lignite mine, and the men and women of the town where they settle. On the other hand it is the story of God and man, The Devil and the Saints; the struggle of men to find their souls and purpose in life and it is about love, courage and faith.

Zorba has been acclaimed as one of the truly memorable creations of literature—a character created on a huge scale in the tradition of Falstaff and Sancho Panza. His years have not dimmed the gusto and amazement with which he responds to all life offers him, whether he is working in the mine, confronting mad monks in a mountain monastery, embellishing the tales of his life or making love to avoid sin. Zorba’s life is rich with all the joys and sorrows that living brings and his example awakens in the narrator an understanding of the true meaning of humanity. This is one of the greatest life-affirming novels of our time.

Part of the modern literary canon, Zorba the Greek, has achieved widespread international acclaim and recognition. This new edition translated, directly from Kazantzakis’s Greek original, is a more faithful rendition of his original language, ideas, and story, and presents Zorba as the author meant him to be.`,
    imgUrl: 'jpg/zorba-the-greek.jpg',
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

function formatBookDetails(bookId) {
  const elCoverImg = document.querySelector('.book-cover-img')
  const book = getBookById(bookId) // Assuming you have a function to fetch book details by ID

  if (!book) {
    alert(`Book with id ${bookId} not found.`)
    return ''
  }

  const formattedDetails = `Title: ${book.title}\n
Price: ${book.price}$\n
Description:${book.description}`
  elCoverImg.src = book.imgUrl

  return formattedDetails
}
