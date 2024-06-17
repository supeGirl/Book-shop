'use strict'

function onInit(){
 renderBooks()   
}

function renderBooks(){
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
   const bookRow = gBooks.map((book,idx) => `<tbody>
        <tr class = "${idx === 1 ? 'second-row' : ''}"> 
   <td>${book.title}</td>
   <td>${book.price}</td>
   <td>
   <button class="read">Read</button>
   <button class="update">Update</button>
   <button class="delete">Delete</button>
   </td>
   </tr>
   </tbody>
    `)
   const srtHtml = titleRow + bookRow.join('')
   elBooksList.innerHTML = srtHtml
 
}