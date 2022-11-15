var theurl = "https://script.google.com/macros/s/AKfycbxl0CcOtOENsIbQZ7nfpyyvcb02KHBfzrW4wrA5w7IPAaSa1BCtCAYUC0avmOzF-1940g/exec";
var secondurl = "";
var btn = document.getElementById("btn");

function send(){
    //console.log( "btn.addEventListener" );
    var rbtn1 = document.getElementById("10F");
    var rbtn2 = document.getElementById("13F");

    //debug code
    //console.log( rbtn1.checked );
    //console.log( rbtn2.checked );
    
    let date     = document.getElementById("date").value;
    let amount   = document.getElementById("amount").value;
    let memo     = document.getElementById("memo").value;
    let sheetidx = 1;//10F

    if( rbtn2.checked ) {
        sheetidx = 2;//13F
    }
   
    console.log( "before ajax" );
    $.ajax({
        type:"GET",
        //url:"https://script.google.com/macros/s/AKfycbx8s8sskQgtFC9j5-Xq4txWl8Vv8ZGKpHdGXqiUlM2tSQMTggwAfLvV29wpDcovzNME/exec",
        url:theurl,
        data:{
            "date" : date,
            "amount" : amount,
            "memo" : memo,
            "sheetidx" : sheetidx
        },
        success:  function(response) {
            //alert(response);
            const myArray = response.split(",");
            var el = document.getElementById("report");
            if(myArray[0]>0){
                el.innerHTML = `<h1>10F給13F ${myArray[0]}</h1>`;
            }
            else {
                el.innerHTML = `<h1>13F給10F ${myArray[1]}</h1>`;
            }
        },
    });
    console.log( "after ajax" );
};

btn.addEventListener("click", send);

function cleartable(){
    let table = document.getElementById("thetable");
    let tbody = document.getElementsByTagName('tbody')[0];
    console.log(tbody);
    //if( !tbody ) {
    if( typeof(tbody) != 'undefined' ) {
        console.log("!tbody");
        table.removeChild(tbody);
        console.log("remove tbody");
    }

    console.log("end clear table.");
}

function creattable( response ){
    cleartable();

    const myArray = response.split(":");
    let table = document.getElementById("thetable");

    tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const firstdata = myArray[0].split(",");

    // Creating and adding data to second row of the table
    let row_0 = document.createElement('tr');
    let row_0_data_0 = document.createElement('td');
    row_0_data_0.innerHTML = `${firstdata[0]}`;
    let row_0_data_1 = document.createElement('td');
    row_0_data_1.innerHTML = `${firstdata[1]}`;
    let row_0_data_2 = document.createElement('td');
    row_0_data_2.innerHTML = `${firstdata[2]}`;
    let row_0_data_3 = document.createElement('td');
    row_0_data_3.innerHTML = `<input id="ckb0" type="checkbox">`;

    row_0.appendChild(row_0_data_0);
    row_0.appendChild(row_0_data_1);
    row_0.appendChild(row_0_data_2);
    row_0.appendChild(row_0_data_3);
    tbody.appendChild(row_0);

    const seconddata = myArray[1].split(",");
    let row_1 = document.createElement('tr');
    let row_1_data_0 = document.createElement('td');
    row_1_data_0.innerHTML = `${seconddata[0]}`;
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.innerHTML = `${seconddata[1]}`;
    let row_1_data_2 = document.createElement('td');
    row_1_data_2.innerHTML = `${seconddata[2]}`;
    let row_1_data_3 = document.createElement('td');
    row_1_data_3.innerHTML = `<input id="ckb1" type="checkbox">`;

    row_1.appendChild(row_1_data_0);
    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    tbody.appendChild(row_1);

    //
    const thirddata = myArray[2].split(",");
    let row_2 = document.createElement('tr');
    let row_2_data_0 = document.createElement('td');
    row_2_data_0.innerHTML = `${thirddata[0]}`;
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = `${thirddata[1]}`;
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = `${thirddata[2]}`;
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = `<input id="ckb2" type="checkbox">`;

    row_2.appendChild(row_2_data_0);
    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);
}

function filltable( response ){
    const myArray = response.split(":");
    var el = document.getElementById("record1");
    el.innerHTML = `${myArray[0]}`;
    el = document.getElementById("record2");
    el.innerHTML = `${myArray[1]}`;
    el = document.getElementById("record3");
    el.innerHTML = `${myArray[2]}`;
};
var show10F = document.getElementById("show10F");

show10F.addEventListener("click", function(){
   
    $.ajax({
        type:"POST",
        url:theurl,
        data:{
            "index" : 0 // 0:10F, 1:13F
        },

        success:  function(response) {
            //alert("show10F");
            creattable(response);
            //console.log( response );
        }
    })
});

var show13F = document.getElementById("show13F");

show13F.addEventListener("click", function(){
   
    $.ajax({
        type:"POST",
        url:theurl,
        data:{
            "index" : 1 // 0:10F, 1:13F
        },

        success:  function(response) {
            //alert("show13F");
            creattable(response);
            //console.log( response );
        }
    })
});

function calldeleterow( index, flooridx ) {
    $.ajax({
        type:"GET",
        url:secondurl,
        data:{
            "index" : index,
            "flooridx" : flooridx
        },
        success:  function(response) {
        },
    });
} 


function deleterow(){
    var ckb1 = document.getElementById("ckb1");
    var ckb2 = document.getElementById("ckb2");
    var ckb3 = document.getElementById("ckb3");

    var s10F = document.getElementById("show10F");
    var s13F = document.getElementById("show13F");

    var flooridx = 1;
    if( s13F.checked ) {
        flooridx = 2;
    }

    /*if( ckb3.checked ) {
        calldeleterow( 3, flooridx );
    }

    if( ckb2.checked ) {
        calldeleterow( 2, flooridx );
    }

    if( ckb1.checked ) {
        calldeleterow( 1, flooridx );
    }*/

    cleartable();
}

btn_delete.addEventListener("click", deleterow);