function Column(id, name) {
	var self = this;
	
	this.id = id;
    this.name = name || 'Nie podano nazwy';
	this.element = createColumn();

	function createColumn() {
		var $row = $('<div>').addClass('row');
    	var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('X');
		var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
		$columnDelete.click(function() {self.removeColumn();});
		
		$columnAddCard.click(function(event) {
			var cardName = prompt("Wpisz nazwę karty");
			event.preventDefault();
			$.ajax({
			    url: baseUrl + '/card',
			    method: 'POST',
			    data: {
			    name: cardName,
			    bootcamp_kanban_column_id: self.id
			    },
			    success: function(response) {
			        var card = new Card(response.id, cardName);
			        self.createCard(card);
			    	}
				});
			});
			
		$column.append($row);
		$row.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard);
		$column.append($columnCardList);
		return $column;
		}
	}

Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	removeColumn: function() {
	    var self = this;
	    $.ajax({
	    	url: baseUrl + '/column/' + self.id,
	    	method: 'DELETE',
	    	success: function(response){
	    		self.element.remove();
	      		}
	    	});
	 	}
	};