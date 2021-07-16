const bookInput = document.querySelector('#book_input');
const bookList = document.querySelector('#book_list');
const newBookBtn = document.querySelector('#new_book')
const addBookBtn = document.querySelector('#add_book');

let library = [];
let libraryRow = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `"${title}" by ${author}, ${pages} pages, ${(read)?'already read':'not read yet'}`;
    }
}

function addBookToLibrary() {
    library.push( new Book(
        document.querySelector('#title_input').value,
        document.querySelector('#author_input').value,
        document.querySelector('#pages_input').value,
        document.querySelector('#read_input').checked
    ) );
    displayBook();
    bookInput.classList.toggle("hidden")
}

function displayBook() {
    for(let j=0;j<libraryRow.length;j++) {
        libraryRow[j].remove();
    }
    libraryRow.length=0;
    for(let i=0;i<library.length;i++) {
        libraryRow.push(document.createElement('tr'));
        libraryRow[i].setAttribute("data-index", i);

        const bookTitleCell = document.createElement('td');
        bookTitleCell.textContent = library[i].title;
        libraryRow[i].appendChild(bookTitleCell);

        const bookAuthorCell = document.createElement('td');
        bookAuthorCell.textContent = library[i].author;
        libraryRow[i].appendChild(bookAuthorCell);

        const bookPagesCell = document.createElement('td');
        bookPagesCell.textContent = library[i].pages;
        libraryRow[i].appendChild(bookPagesCell);

        const bookReadCell = document.createElement('td');
        bookReadCell.textContent = (library[i].read)?'yes':'no';
        libraryRow[i].appendChild(bookReadCell);

        const removeBookCell = document.createElement('td');
        const removeBookBtn = document.createElement('button');
        removeBookBtn.setAttribute("data-index", i);
        removeBookBtn.textContent = "remove";
        removeBookBtn.addEventListener('click', removeBook);
        removeBookCell.appendChild(removeBookBtn);
        libraryRow[i].appendChild(removeBookCell);

        bookList.appendChild(libraryRow[i]);
    }
}

function removeBook(e) {
    let index = e.target.attributes[0].value;
    library.splice(index,1);
    libraryRow.splice(index,1);
    document.querySelector(`tr[data-index="${index}"]`).remove();
}

addBookBtn.addEventListener('click', addBookToLibrary);

newBookBtn.addEventListener('click', () => bookInput.classList.toggle("hidden"));