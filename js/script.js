$(function() {
	function randomString() {								//generowanie id
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    var i = 0;
	    for (i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}

	function Column(name) {
	    var self = this; 

	    this.id = randomString();
	    this.name = name;
	    this.$element = createColumn();

	    function createColumn() {							//kod do tworzenia kolumny
	    	var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add new card');

			$columnDelete.click(function() {				//podpinanie zdarzen
        		self.removeColumn();
			});
			$columnAddCard.click(function() {				//Dodawanie karteczki po kliknięciu w przycisk
        		self.addCard(new Card(prompt("Write card name")));
			});

			$column.append($columnTitle)					//konstruowanie kolumny
        		.append($columnDelete)
        		.append($columnAddCard)
        		.append($columnCardList);
			return $column;									//zwracanie stworzonej kolumny
	    }
    }
  	
  	Column.prototype = {
    	addCard: function(card) {
      		this.$element.children('ul').append(card.$element);
    	},
    	removeColumn: function() {
      		this.$element.remove();
    	}
	};
  	
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard(); 

		function createCard() {								// implementacja tworzenia karty
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

			$cardDelete.click(function(){
        		self.removeCard();
			});

			$card.append($cardDelete)
				.append($cardDescription);
			return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	var board = {
    	name: 'Kanban Board',
    	addColumn: function(column) {
      		this.$element.append(column.$element);
      		initSortable();
    	},
    	$element: $('#board .column-container')
	};
  	
  	 function initSortable() {
   	 	$('.column-card-list').sortable({
      		connectWith: '.column-card-list',
      		placeholder: 'card-placeholder'
   	 	}).disableSelection();
  	}

  	$('.create-column')
  		.click(function(){
			var name = prompt('Write column name');
			var column = new Column(name);
    		board.addColumn(column);
  		});

  	// TWORZENIE KOLUMN
	var todoColumn = new Column('To Do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('Learn Java Script');
	var card2 = new Card('Practice HTML and CSS');
	var card3 = new Card('Create Canban board');

	// DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	todoColumn.addCard(card2);
	doingColumn.addCard(card3);	
	

});