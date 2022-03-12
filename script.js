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
    static displayBoooks(){
        const storedBooks=[
            // {
            //     title:"Book One",
            //     author: 'John Doe',
            //     isbn:'23432432'
            // },
            // {
            //     title:"Book Two",
            //     author: "Jane Doe",
            //     isbn:"21308"
            // }
        ];
        const books=storedBooks;
        books.forEach((book)=>UI.addBookToList(book));
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
           <td><a href="#" class="btn-small red lighten-1 white-text">X</td>
        
        
        `;
        list.appendChild(row);
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

    // create a book object (class).
    const book=new Book(title, author, isbn );
    UI.displayBoooks();

})


