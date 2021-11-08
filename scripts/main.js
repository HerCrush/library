const bookInput = document.querySelector('#book_input');
const bookList = document.querySelector('#book_list');
const newBookBtn = document.querySelector('#new_book')
const addBookBtn = document.querySelector('#add_book');

let library = [];
let libraryRow = [];
let bookColors = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read)?'already read':'not read yet'}`;
}
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

loadData();

const checkInput = function(titleInput, authorInput, pagesInput) {
    titleInput.setCustomValidity('');
    authorInput.setCustomValidity('');
    pagesInput.setCustomValidity('');
    if(titleInput.checkValidity() === false) {
        titleInput.setCustomValidity('Please, enter the book title.');
        alert(titleInput.validationMessage);
        return false;
    }
    else if(authorInput.checkValidity() === false) {
        authorInput.setCustomValidity('Please, enter the book author.');
        alert(authorInput.validationMessage);
        return false;
    }
    else if(pagesInput.checkValidity() === false) {
        pagesInput.setCustomValidity('Please, enter the number of pages.');
        alert(pagesInput.validationMessage);
        return false;
    }
    else {
        titleInput.setCustomValidity('');
        authorInput.setCustomValidity('');
        pagesInput.setCustomValidity('');
        return true;
    }
}

function addBookToLibrary() {
    const titleInput = document.querySelector('#title_input');
    const authorInput = document.querySelector('#author_input');
    const pagesInput = document.querySelector('#pages_input');
    const readInput = document.querySelector('#read_input');
    if(checkInput(titleInput, authorInput, pagesInput) === false) return;
    library.push( new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.checked
    ) );
    displayBooks();
    bookInput.classList.toggle("hidden");
    storeData();
}

function displayBooks() {
    for(let j=0;j<libraryRow.length;j++) {
        libraryRow[j].remove();
    }
    libraryRow.length=0;
    for(let i=0;i<library.length;i++) {
        libraryRow.push(document.createElement('tr'));

        const bookTitleCell = document.createElement('td');
        bookTitleCell.dataset.colored = i;
        bookTitleCell.textContent = library[i].title;

        const bookAuthorCell = document.createElement('td');
        bookAuthorCell.dataset.colored = i;
        bookAuthorCell.textContent = library[i].author;

        const bookPagesCell = document.createElement('td');
        bookPagesCell.dataset.colored = i;
        bookPagesCell.textContent = library[i].pages;

        const bookReadCell = document.createElement('td');
        bookReadCell.dataset.colored = i;
        bookReadCell.classList.add("read_cell");
        const readCheckbox = document.createElement('input');
        readCheckbox.type = "checkbox";
        readCheckbox.checked = library[i].read;
        bookReadCell.appendChild(readCheckbox);
        readCheckbox.addEventListener('change', () => {
            library[i].toggleRead();
            localStorage.setItem('readData'+i,library[i].read);
        });

        const removeBookCell = document.createElement('td');
        removeBookCell.classList.add("remove_cell");
        const removeBookBtn = document.createElement('button');
        removeBookBtn.dataset.index = i;
        removeBookBtn.textContent = "remove";
        removeBookCell.appendChild(removeBookBtn);
        removeBookBtn.addEventListener('click', removeBook);

        libraryRow[i].append(bookTitleCell, bookAuthorCell, bookPagesCell, bookReadCell, removeBookCell);
        bookList.appendChild(libraryRow[i]);
        colorBook(i);
    }
}

function removeBook(e) {
    let index = e.target.dataset.index;
    library.splice(index, 1);
    libraryRow[index].remove();
    bookColors.splice(index, 1);
    for(let k=index;k<library.length;k++) {
        localStorage.setItem('titleData'+(k),library[k].title);
        localStorage.setItem('authorData'+(k),library[k].author);
        localStorage.setItem('pagesData'+(k),library[k].pages);
        localStorage.setItem('readData'+(k),library[k].read);
        localStorage.setItem('colorData'+(k),bookColors[k]);
    }
    localStorage.setItem('libraryLength',library.length);
    displayBooks();
}

function colorBook(i) {
    let color;
    if(i >= 0 && i < bookColors.length) {
        color = bookColors[i];
    }
    else {
        color = bookColors[i] = Math.floor(Math.random()*360);
    }
    document.querySelectorAll(`td[data-colored="${i}"]`).forEach( e => {e.style.cssText = `color: white;
        background: linear-gradient(hsl(${color}, 65%, 65%) 20%,
        hsl(${color}, 65%, 50%) 80%,
        hsl(${color}, 65%, 20%));`
    } )
}

function storeData() {
    localStorage.setItem('titleData'+(library.length-1),library[library.length-1].title);
    localStorage.setItem('authorData'+(library.length-1),library[library.length-1].author);
    localStorage.setItem('pagesData'+(library.length-1),library[library.length-1].pages);
    localStorage.setItem('readData'+(library.length-1),library[library.length-1].read);
    localStorage.setItem('libraryLength',library.length);
    localStorage.setItem('colorData'+(bookColors.length-1),bookColors[bookColors.length-1]);
}

function loadData() {
    let max = localStorage.getItem('libraryLength');
    for(let i=0;i<max;i++) {
        library.push(new Book(
        localStorage.getItem('titleData'+i),
        localStorage.getItem('authorData'+i),
        localStorage.getItem('pagesData'+i),
        JSON.parse(localStorage.getItem('readData'+i))
        ) );
        bookColors[i] = localStorage.getItem('colorData'+i);
    }
    displayBooks();
}

addBookBtn.addEventListener('click', addBookToLibrary);

newBookBtn.addEventListener('click', () => bookInput.classList.toggle("hidden"));