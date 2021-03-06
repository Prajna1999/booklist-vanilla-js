// Create book class to dynamically add properties.
class Book{
    constructor(title, author, isbn){
        this.title=title,
        this.author=author,
        this.isbn=isbn
    }
}

// Class to handle UI tasks.
class UI{
    // Dont want to be instanitated everytime. 
    // This static method is required so that book list does not get recycled 
    // everytime the page refreshes. Objects to be added to the local memory.
    static displayBoooks(){
       
        const books=Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));
    }
    // Add a clear filed method.
    static clearFields(){
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";

    }
    // show alert messages.
    static showMessage(message){
        const alertDiv= document.createElement('div');
        alertDiv.className=('toast-container');
        alertDiv.appendChild(document.createTextNode(message));

        // import form element.
        const container=document.querySelector(".container");
        const form=document.querySelector("#book-form");
        container.insertBefore(alertDiv, form);

        // Vanish after 3 seconds from the UI.
        setTimeout(()=>alertDiv.remove(), 1000)


    }
    // Add a delete functioa
    static deleteBook(el){
        
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
        }
    }
    // add book to the UI
    static addBookToList(book){
        // create row to put inside the tbody..
        const list=document.querySelector("#book-list");
        // create a tr.
        const row=document.createElement("tr");

        // Add columns.
        row.innerHTML=`
           <td>${book.title}</td> 
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td><a href="#" class="btn-small red lighten-1 white-text delete">X</td>
        
        
        `;
        list.appendChild(row);
    }
}
// local storage.
class Store{
    static getBooks(){
        let books;
        if(!localStorage.getItem('books')){
            books=[];
        }else{
            // As string data types.
            books=JSON.parse(localStorage.getItem('books'));
        }
    return books;

    }
    static addBooks(book){
        const books=Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBooks(isbn){
        const books=Store.getBooks(); //AN array object

        // loop through each book in the JSON object.
        books.forEach((book, index)=>{
            if(book.isbn===isbn) {
                books.splice(index,1);

            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }


}
// event: display books.
document.addEventListener("DOMContentLoaded", UI.displayBoooks);

// Event: click Submit.
document.querySelector("#book-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector('#isbn').value;

    //Validation. All book form fields must be filled.
    if(title==="" || author==="" || isbn===""){

   
        UI.showMessage("Fill Every Field you shithead");
   
        
    }else{
            // instantiate a book object (class).
    const book=new Book(title, author, isbn);

    // Add to the list and show.
    UI.addBookToList(book);

    // Add book to the localStorage.
    Store.addBooks(book);

    // clear form fileds after submitting.
    UI.clearFields();
    }




})

// Event: delete event.
document.querySelector("#book-list").addEventListener('click', (e)=>{
    UI.deleteBook(e.target);

    // remove from the local storage
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
})


