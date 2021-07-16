const bookInput = document.querySelector('#book_input');
const bookList = document.querySelector('#book_list');
let library = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `"${title}" by ${author}, ${pages} pages, ${(read)?'already read':'not read yet'}`;
    }
    console.log(this.info());
}

function addBookToLibrary() {
    library.push( new Book(
        document.querySelector('#title_input').value,
        document.querySelector('#author_input').value,
        document.querySelector('#pages_input').value,
        document.querySelector('#read_input').checked
    ) );
    displayBook();
}

function displayBook() {
    const bookRow = document.createElement('tr');
    const bookTitleCell = document.createElement('td');
    bookTitleCell.textContent = library[library.length-1].title;
    bookRow.appendChild(bookTitleCell);
    const bookAuthorCell = document.createElement('td');
    bookAuthorCell.textContent = library[library.length-1].author;
    bookRow.appendChild(bookAuthorCell);
    const bookPagesCell = document.createElement('td');
    bookPagesCell.textContent = library[library.length-1].pages;
    bookRow.appendChild(bookPagesCell);
    const bookReadCell = document.createElement('td');
    bookReadCell.textContent = (library[library.length-1].read)?'yes':'no';
    bookRow.appendChild(bookReadCell);
    bookList.appendChild(bookRow);
}

document.querySelector('#add_book').addEventListener('click', addBookToLibrary);

document.querySelector('#new_book').addEventListener('click', () => bookInput.classList.toggle("hidden"));