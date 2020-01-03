//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI(){}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
}

UI.prototype.deleteBook = function(target) {
    if(target.className==='delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function (text, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(text));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //Timeout after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);

}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();
    // Validate
    if(title === '' || author === '' || isbn === '') {
        //Error Alert
            ui.showAlert('please fill all fields', 'error');
    } else {    
        // Add book to list
        ui.addBookToList(book);
        ui.showAlert('Book Added', 'success');
        ui.clearFields();
    }
    e.preventDefault();
});

// 
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book deleted', 'success');
    e.preventDefault();
})