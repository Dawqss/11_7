var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column').click(function(){
	if($('div.column').length === 5) {
		alert('Maxymalna ilość kolumn wynosi: 5');
	} else {
		var columnName = prompt('Wpisz nazwę kolumny');
		$.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
            	name: columnName
    		},
    		success: function(response){
    			var column = new Column(response.id, columnName);
    			board.createColumn(column);
          	}
        });
	}
});
	
function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
}