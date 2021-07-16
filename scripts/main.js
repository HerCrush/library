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
}

document.querySelector('#add_book').addEventListener('click', addBookToLibrary);