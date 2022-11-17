var theurl      = "https://script.google.com/macros/s/AKfycbxYlZaRTtJnFoQeRLYKnyf_tury7zF7_CdK6g0eOa1up6Q_rxPSpj4by4y6Z41srz3AgA/exec";
var secondurl   = "https://script.google.com/macros/s/AKfycbwdJVCYkFfPTjvm7mz4PkJerFyiIFWf8Gmf2ulOAoJG-HdI5OywjnX6axhP0vlk1-2q/exec";
var btn = document.getElementById("btn");
var btn_delete = document.getElementById("btn_delete");
var show10F = document.getElementById("show10F");
var show13F = document.getElementById("show13F");

function updatereport(){
    $.ajax({
        type:"POST",
        url:theurl,
        data:{
            "index" : 0
        },

        success:  function(response) {
            console.log("response in onload:"+response);
            const myArray = response.split(",");
            var el = document.getElementById("report");
            if(myArray[0]>0){
                el.innerHTML = `<h3>10F給13F: $${myArray[0]}</h3>`;
            }
            else {
                el.innerHTML = `<h3>13F給10F: $${myArray[1]}</h3>`;
            }
        },
    })
}
window.onload=function(){
    console.log("onload triggered");
    updatereport();
};

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

    console.log("send before ajax");
    $.ajax({
        type:"GET",
        url:theurl,
        data:{
            "date" : date,
            "amount" : amount,
            "memo" : memo,
            "sheetidx" : sheetidx
        },
        success:  function(response) {
            //updatereport();
        },
        error: function(msg) {
            console.log("error:"+msg);
        },
    });
    console.log("send end");
};

btn.addEventListener("click", send);

function cleartable(){
    let table = document.getElementById("thetable");
    let tbody = document.getElementsByTagName('tbody')[0];

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
    row_0_data_3.innerHTML = `<input id="ckb1" type="checkbox">`;

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
    row_1_data_3.innerHTML = `<input id="ckb2" type="checkbox">`;

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
    row_2_data_3.innerHTML = `<input id="ckb3" type="checkbox">`;

    row_2.appendChild(row_2_data_0);
    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);
};

function filltable( response ){
    const myArray = response.split(":");
    var el = document.getElementById("record1");
    el.innerHTML = `${myArray[0]}`;
    el = document.getElementById("record2");
    el.innerHTML = `${myArray[1]}`;
    el = document.getElementById("record3");
    el.innerHTML = `${myArray[2]}`;
};

function callgetdata( index ) {
    $.ajax({
        type:"POST",
        url:theurl,
        data:{
            "index" : index // 0:10F, 1:13F
        },

        success:  function(response) {
            creattable(response);
        }
    })
};

function getdatafromsheet(){
    var index = 1;
    if( show13F.checked ) {
        index = 2;
    }
    callgetdata( index );
};

show10F.addEventListener("click", function(){
    callgetdata( 1 );
});

show13F.addEventListener("click", function(){
    callgetdata( 2 );
});

function calldeleterow( index, flooridx ) {
    console.log("befor ajax in calldeleterow");
    $.ajax({
        type:"GET",
        url:secondurl,
        data:{
            "index" : index+1,
            "flooridx" : flooridx
        },
        success:  function(response) {
        },
    });

    console.log("after in calldeleterow");
};


function deleterow(){
    var ckb1 = document.getElementById("ckb1");
    var ckb2 = document.getElementById("ckb2");
    var ckb3 = document.getElementById("ckb3");

    var flooridx = 1;
    if( show13F.checked ) {
        flooridx = 2;
    }
    console.log("line196" + flooridx );
    console.log("line 206");
    if( typeof(ckb3) == 'undefined' ) {
        console.log("ckb3 is undefined");
    }
    console.log("line 210");
    if( ckb3.checked ) {
        calldeleterow( 3, flooridx );
    }
    console.log("line 214");
    if( ckb2.checked ) {
        calldeleterow( 2, flooridx );
    }
    console.log("line 218");
    if( ckb1.checked ) {
        console.log("line 220");
        calldeleterow( 1, flooridx );
        console.log("line 222");
    }

    //history.go(0);
    getdatafromsheet();
    updatereport();
};

btn_delete.addEventListener("click", deleterow);