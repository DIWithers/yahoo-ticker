
// $(document).load(function(){
// 	$("#symbol").html(localStorage.getItem("savedSymbols"));
// 	var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + symbol + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
// 	getStockInfo();
// 	buildNewTable(stockInfo);
// });

	
 //populate with past saved search

$(document).ready(function() {

	
	$(".yahoo-form").submit(function() { //event listener = submit
		event.preventDefault(); //don't submit right away, do the next action instead which is console.log
		//Get what user put into the input field
		var symbol = $("#symbol").val();
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + symbol + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		//? is the seperator
		localStorage.setItem("savedSymbols", symbol);
		// console.dir(localStorage.getItem("savedSymbols"));  //retrieved what I put into local storage -  NOT .LOG!

		getStockInfo();
	function getStockInfo() {	
		$.getJSON(url, function(theDataJsFoundIfAny) { //make AJAX(.getJSON - AJAX is a concept) call to url and run function
			var stockInfo = theDataJsFoundIfAny.query.results.quote;

			var stockCount = theDataJsFoundIfAny.query.count;
		

			var newHTML = "";
			if (stockCount > 1) {
			
				for (var i = 0; i < stockInfo.length; i++) {
					newHTML += buildNewTable(stockInfo[i]);
				}
			}
			else {
				newHTML += buildNewTable(stockInfo);
			}
			$(".yahoo-body").html(newHTML);//can use append or html
			$(".table").DataTable(); 

// 			$('.table').on( 'column-visibility.dt', function ( e, settings, column, state ) {
//     console.log(
//         'Column '+ column +' has changed to '+ (state ? 'visible' : 'hidden')
//     );
// } );


		}); //end of .getJSON
		};

	}); //end of submit listener


}); //end of ready
function buildNewTable(stockInfo) {
	if(stockInfo.Change) {
	if (stockInfo.Change[0] === "+") {
		var upDown = "success";
	}  //or stockInfo.Change.splice
	else if (stockInfo.Change[0] === "-") {
		upDown = "danger";
	}
	else {
		var upDown = "";
		stockInfo.Change = 0;
	}
}
	

		var htmlString = "";
		
			htmlString = '<tr><td>' + stockInfo.Symbol + '</td>'; //case sensitive
			htmlString += '<td>' + stockInfo.Name + '</td>';
			htmlString += '<td>' + stockInfo.Ask + '</td>';
			htmlString += '<td>' + stockInfo.Bid + '</td>';
			htmlString += '<td class="' +upDown+ '">' + stockInfo.Change + '</td>';
			htmlString += '<td><button type="button" class="btn btn-default add" onclick="populateStocks();">+</button>'
			htmlString += '<button type="button" class="btn btn-default remove">-</button></td></tr>'

			
			return htmlString;
}
// function populateStocks() {
// 	$("table tr .add").click(function() {
// 		var rowInd = this.rowIndex;
// 		console.log(rowInd);
// 		// buildNewTable(stockInfo[rowInd]);
// 		// $(".stored-body").html(newHTML);//can use append or html
// 		// 	$(".table").DataTable(); 
// 		// 	console.log(newHTML)
// 	})

// }



