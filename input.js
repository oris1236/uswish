
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
    // read input and calculate
   //alert("got it.")
   var table = document.getElementById("mytable");
   var rbtn1 = document.getElementById("10F");
   var rbtn2 = document.getElementById("13F");

   console.log( rbtn1.checked );
   console.log( rbtn2.checked );
   
   //for( var i = 1; i <= 3; i++ ) {
   //console.log( "i=" + i );
    let date     = table.rows[1].cells[0].children[0].value;
    let amount   = table.rows[1].cells[1].children[0].value;
    let memo     = table.rows[1].cells[2].children[0].value;
    let sheetidx = 1;//10F

    if( rbtn2.checked ) {
        sheetidx = 2;//13F
    }
   
    $.ajax({
        url:"https://script.google.com/macros/s/AKfycbx8s8sskQgtFC9j5-Xq4txWl8Vv8ZGKpHdGXqiUlM2tSQMTggwAfLvV29wpDcovzNME/exec",
        data:{
            "date" : date,
            "amount" : amount,
            "memo" : memo,
            "sheetidx" : sheetidx
        },

        success:  function(response) {
            const myArray = response.split(",");
            var el = document.getElementById("report");
            if(myArray[0]>0){
                el.innerHTML = `<h1>10F給13F ${myArray[0]}</h1>`;
            }
            else {
                el.innerHTML = `<h1>13F給10F ${myArray[1]}</h1>`;
            }
        }
    })

//}

})
