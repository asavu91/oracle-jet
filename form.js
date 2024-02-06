define([
  'ojs/ojcore',
  'knockout',
  'ojs/ojinputtext',
  'ojs/ojformlayout',
  'ojs/ojselectsingle',
  'ojs/ojarraydataprovider',
  'jqueryui-amd/unique-id',
  "ojs/ojtemplateengine-utils",
  'ojs/ojradioset',
  "ojs/ojfilepicker"
], function (oj, ko, InputText, FormLayout, SelectSingle, ArrayDataProvider) {
  function FormViewModel() {
    const books = [
      {
        title: "Vagabond",
        author: "Takehiko Inoue"
      },
      {
        title: "Berserk",
        author: "Kentaro Miura"
      },
      {
        title: "Vinland Saga",
        author: "Makoto Yukimura"
      },
    ];


    const booksDataProvider = new ArrayDataProvider(books, { keyAttributes: 'title' });


    this.booksDataProvider = booksDataProvider;
    this.inputBookTitleValue = ko.observable('');
    this.inputAuthorValue = ko.observable('');
    this.inputReturnDateValue = ko.observable('');
    this.inputReasonValue = ko.observable('');
    this.tipPlata = ko.observable('');
    this.inputAdresaValue = ko.observable('');
    

    this.inputReasonDataProvider = new ArrayDataProvider([
      { value: 'damaged', label: 'Carte deteriorată' },
      { value: 'wrongBook', label: 'Carte greșită' },
      { value: 'changedMind', label: 'Mi-am schimbat părerea' }
    ], { keyAttributes: 'value' });

    this.connected = () => {
      document.title = "Return Form";
    
      const selectBookTitle = document.getElementById('selectBookTitle');
    
      books.forEach(book => {
        const option = document.createElement('oj-option');
        option.value = book.title;
        option.label = book.title;
        selectBookTitle.appendChild(option);
      });
    
      // Add an event to listen for changes in the selected title
      selectBookTitle.addEventListener('valueChanged', (event) => {
        const selectedTitle = event.detail.value;
    
        // Find the book in the list of books
        const selectedBook = books.find(book => book.title === selectedTitle);
    
        // Update both book title and author fields
        if (selectedBook) {
          this.inputBookTitleValue(selectedBook.title);
          this.inputAuthorValue(selectedBook.author);
        } else {
        }
    
        
        console.log(this.inputBookTitleValue());
      });
    };
    

    this.submitForm = () => {
      const bookTitle = this.inputBookTitleValue();
      const author = this.inputAuthorValue();
      const returnDate = this.inputReturnDateValue();
      const returnReason = this.inputReasonValue();

      if (bookTitle && author && returnDate && returnReason) {
        alert(`Datele au fost trimise cu succes!\nTitlu: ${bookTitle}\nAutor: ${author}\nMotivul returnării: ${returnReason}`);
      } else {
        alert('Te rugăm să completezi toate câmpurile înainte de a trimite formularul.');
      }
    };
  }

  return FormViewModel;
});
