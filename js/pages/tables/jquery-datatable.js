$(function () {

    // $('.search').keyup(function(){
    //     var searchItem = $('.search').val();
    //     var listItem = $('.table tbody').children('tr');
    //     var searchSplit = searchItem.replace(/ /g, "'):containsi('");
    //     $.extend($.expr[':'],{
    //         'containsi': function(elen,i,match,array){
    //             return (elen.textContent || Element.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    //         }
    //     })
    //     $(".table tbody tr").not(":containsi('" + searchSplit + "')").each(function(){
    //         $(this).attr('visible',false);
    //     })
    //     $(".table tbody tr:containsi('"+ searchSplit + "')").each(function(){
    //         $(this).attr('visible',true);
    //     })
    // })

    getPagination('.table');
	$('#maxRows').trigger('change');
	function getPagination (table){

		  $('#maxRows').on('change',function(){
		  	$('.pagination').html('');						// reset pagination div
		  	var trnum = 0 ;									// reset tr counter 
		  	var maxRows = parseInt($(this).val());			// get Max Rows from select option
        
              var totalRows = $(table+' tbody tr').length;
              console.log(totalRows)		// numbers of rows 
			 $(table+' tr:gt(0)').each(function(){			// each TR in  table and not the header
			 	trnum++;									// Start Counter 
			 	if (trnum > maxRows ){						// if tr number gt maxRows
			 		
			 		$(this).hide();							// fade it out 
			 	}if (trnum <= maxRows ){$(this).show();}// else fade in Important in case if it ..
			 });											//  was fade out to fade it in 
			 if (totalRows > maxRows){						// if tr total rows gt max rows option
			 	var pagenum = Math.ceil(totalRows/maxRows);	// ceil total(rows/maxrows) to get ..  
			 												//	numbers of pages 
			 	for (var i = 1; i <= pagenum ;){			// for each page append pagination li 
			 	$('.pagination').append('<li data-page="'+i+'">\
								      <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
								    </li>').show();
			 	}											// end for i 
     
         
			} 												// end if row count > max rows
			$('.pagination li:first-child').addClass('active'); // add active class to the first li 
        
        
        //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT
       showig_rows_count(maxRows, 1, totalRows);
        //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT

        $('.pagination li').on('click',function(e){		// on click each page
        e.preventDefault();
				var pageNum = $(this).attr('data-page');	// get it's number
				var trIndex = 0 ;							// reset tr counter
				$('.pagination li').removeClass('active');	// remove active class from all li 
				$(this).addClass('active');					// add active class to the clicked 
        
        
        //SHOWING ROWS NUMBER OUT OF TOTAL
       showig_rows_count(maxRows, pageNum, totalRows);
        //SHOWING ROWS NUMBER OUT OF TOTAL
        
        
        
				 $(table+' tr:gt(0)').each(function(){		// each tr in table not the header
				 	trIndex++;								// tr index counter 
				 	// if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
				 	if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
				 		$(this).hide();		
				 	}else {$(this).show();} 				//else fade in 
				 }); 										// end of for each tr in table
					});										// end of on click pagination list
		});
											// end of on select change 
		 
								// END OF PAGINATION 
    
	}	


//ROWS SHOWING FUNCTION
function showig_rows_count(maxRows, pageNum, totalRows) {
   //Default rows showing
        var end_index = maxRows*pageNum;
        var start_index = ((maxRows*pageNum)- maxRows) + parseFloat(1);
        var string = 'Showing '+ start_index + ' to ' + end_index +' of ' + totalRows + ' entries';               
        $('.rows_count').html(string);
}


// All Table search script
function FilterkeyWord_all_table() {
  
// Count td if you want to search on all table instead of specific column

  var count = $('.table').children('tbody').children('tr:first-child').children('td').length; 

        // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("search_input_all");
  var input_value =     document.getElementById("search_input_all").value;
        filter = input.value.toLowerCase();
  if(input_value !=''){
        table = document.getElementById("table-id");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {
          
          var flag = 0;
           
          for(j = 0; j < count; j++){
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
             
                var td_text = td.innerHTML;  
                if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                //var td_text = td.innerHTML;  
                //td.innerHTML = 'shaban';
                  flag = 1;
                } else {
                  //DO NOTHING
                }
              }
            }
          if(flag==1){
                     tr[i].style.display = "";
          }else {
             tr[i].style.display = "none";
          }
        }
    }else {
      //RESET TABLE
      $('#maxRows').trigger('change');
    }
}



    $(document).ready(function() {

        $.get("crime.json", function(data) {
            var employee_table = '';
            // var dataviolationpercent = [];
            // var wardname = [];
    
            // for (var i in data) {
            //     wardname.push(data[i].fields.ward_name)
            //     dataviolationpercent.push(data[i].fields.violent_sexual_offences_rate_per_1000_ward_population)
            // }
    
            $.each(data, function(key, value) {
                employee_table += "<tr>";
    
                employee_table += "<td>" + value.fields.ward_name + "</td>";
                employee_table += "<td>" + value.fields.year + "</td>";
                employee_table += "<td>" + value.fields.violent_sexual_offences_rate_per_1000_ward_population + "</td>";
                employee_table += "<td>" + value.fields.violent_sexual_offences_number + "</td>";
                employee_table += "<td>" + value.fields.all_crimes_rate_per_1000_ward_population + "</td>";
                employee_table += "<td>" + value.fields.all_crimes_number + "</td>";
                employee_table += "<td>" + value.fields.burglary_rate_per_1000_ward_population + "</td>";
                employee_table += "<td>" + value.fields.burglary_number + "</td>";
    
                employee_table += "</tr>";
            })
            $('.table tbody').append(employee_table);
        })
    })
    
});