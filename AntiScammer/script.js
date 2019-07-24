var rates = [
    [1.0, 0.88, 0.76, 22.78, 1.41],
    [1.12, 1.0, 0.86, 25.63, 1.58],
    [1.31, 1.15, 1.0, 29.64, 1.82],
    [0.04, 0.03, 0.03, 1.0, 0.06],
    [0.71, 0.63, 0.54, 16.21, 1.0]
];

var rateName = new Object();
var rateEnum = {
    USD: 0,
    EUR: 1,
    GBP: 2,
    CZK: 3,
    AUD: 4
};
var fromInput = 0;
var toInput = 0;
var fromCurrency = "EUR";
var toCurrency = "CZK";

//   USD EUR GBP CZK AUD
//USD
//EUR
//GBP
//CZK
//AUD

function dropDownFrom(value) {
    $("#dropDownFrom").text(value);
    fromCurrency = $("#dropDownFrom")
        .text()
        .replace(/\s/g, "");
    toCurrency = $("#dropDownTo")
        .text()
        .replace(/\s/g, "");
    if ($("#fromInput").val() != "") {
        fromInput = $("#fromInput").val();
    }
    if ($("#toInput").val() != "") {
        toInput = $("#toInput").val();
    }
    updateCard();
    displayRate(fromCurrency, toCurrency);
    // console.log(fromCurrency);
}

function dropDownTo(value) {
    $("#dropDownTo").text(value);
    fromCurrency = $("#dropDownFrom")
        .text()
        .replace(/\s/g, "");
    toCurrency = $("#dropDownTo")
        .text()
        .replace(/\s/g, "");
    if ($("#fromInput").val() != "") {
        fromInput = $("#fromInput").val();
    }
    if ($("#toInput").val() != "") {
        toInput = $("#toInput").val();
    }
    updateCard();
    displayRate(fromCurrency, toCurrency);
    // console.log(toCurrency);
}

function flip() {
    to = $("#dropDownTo").text();
    from = $("#dropDownFrom").text();
    $("#dropDownFrom").text(to);
    $("#dropDownTo").text(from);
    fromCurrency = $("#dropDownFrom").text();
    toCurrency = $("#dropDownTo").text();
    if ($("#fromInput").val() != "") {
        fromInput = $("#fromInput").val();
    }
    if ($("#toInput").val() != "") {
        toInput = $("#toInput").val();
    }
    displayRate();
    updateCard();
    // toInput = $("#toInput").val(fromInput);
    // fromInput = $("#fromInput").val(toInput);

    // console.log(fromCurrency);
    // console.log(toCurrency);
}

function fromInputAssign() {
    if ($("#fromInput").val() != "") {
        fromInput = $("#fromInput").val();
    }
    updateCard();
    //console.log(fromInput);
}

function toInputAssign() {
    if ($("#toInput").val() != "") {
        toInput = $("#toInput").val();
    }
    updateCard();
    //console.log(toInput);
}

function displayRate() {
    fromCurrency = $("#dropDownFrom")
        .text()
        .replace(/\s/g, "");
    toCurrency = $("#dropDownTo")
        .text()
        .replace(/\s/g, "");
    $("#second").text(
        "1 " +
        fromCurrency +
        " = " +
        rates[rateEnum[fromCurrency]][rateEnum[toCurrency]] +
        " " +
        toCurrency
    );
}

function addFav() {
    $("#favoriteModal").modal("hide");
    Swal.fire({
        title: "Added to Favorites!",
        type: "success",
        showConfirmButton: false,
        timer: 1500
    });
}

function applyFav() {
    $("#editModal").modal("hide");
    Swal.fire({
        title: "Changes Saved!",
        type: "success",
        showConfirmButton: false,
        timer: 1500
    });
}

function deleteFavorite() {
    $("#editModal").modal("hide");
    Swal.fire({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                type: "success",
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

function updateCard() {
    if (toInput == 0 || fromInput == 0) {
        document.getElementById("msgImage").src = "Icons/info.png";
        document.getElementById("msgText").style.color = '#48a0dc';
        $("#msgText").html('Scammer or not?<br>Let\'s see.');
        return;
    }
    console.log(fromInput + " " + toInput);
    myRate = toInput / fromInput;
    realRate = rates[rateEnum[fromCurrency]][rateEnum[toCurrency]];
    loss = toInput / realRate - fromInput;
    percentage = 100 - (myRate / realRate) * 100;
    if (percentage > 50) {
        //red-red
        document.getElementById("msgImage").src = "Icons/red-red-red.png";
        document.getElementById("msgText").style.color = '#d75a4a';
    } else if (percentage > 40 && percentage <= 50) {
        //red
        document.getElementById("msgImage").src = "Icons/red-red.png";
        document.getElementById("msgText").style.color = '#f8696b';
    } else if (percentage > 30 && percentage <= 40) {
        //red
        document.getElementById("msgImage").src = "Icons/red.png";
        document.getElementById("msgText").style.color = '#fb9574';
    } else if (percentage > 20 && percentage <= 30) {
        //yellow-red
        document.getElementById("msgImage").src = "Icons/yellow-red.png";
        document.getElementById("msgText").style.color = '#fdc07c';
    } else if (percentage > 15 && percentage <= 20) {
        //yellow
        document.getElementById("msgImage").src = "Icons/yellow.png";
        document.getElementById("msgText").style.color = '#efce4a';
    } else if (percentage > 10 && percentage <= 15) {
        //green-yellow
        document.getElementById("msgImage").src = "Icons/green-yellow.png";
        document.getElementById("msgText").style.color = '#cbdc81';
    } else if (percentage > 5 && percentage <= 10) {
        //green
        document.getElementById("msgImage").src = "Icons/green.png";
        document.getElementById("msgText").style.color = '#97cd7e';
    } else if (percentage > 0 && percentage <= 5) {
        //green-green
        document.getElementById("msgImage").src = "Icons/green-green.png";
        document.getElementById("msgText").style.color = '#63be7b';
    } else {
        //green-green-green
        document.getElementById("msgImage").src = "Icons/green-green-green.png";
        document.getElementById("msgText").style.color = '#25ae88';
    }
    if (percentage > 0) {
        $("#msgText").text('Difference from real rate is ' + Math.round(loss * 100) / 100 + ' ' + fromCurrency + ' (' + Math.abs(Math.round(percentage * 100) / 100) + '%)');
    } else {
        $("#msgText").text('Better than the real rate by ' + Math.round(loss * 100) / 100 + ' ' + fromCurrency + ' (' + Math.abs(Math.round(percentage * 100) / 100) + '%)');
    }
    console.log("My rate: " + myRate);
    console.log("Real rate: " + realRate);
    console.log("Loss: " + loss);
    console.log("Percentage: " + percentage);
}