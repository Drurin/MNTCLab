function scroller() {
    fetch('https://raw.githubusercontent.com/Drurin/MNTCLab/master/certificationNames.json').then(r => r.json()).then(function (fetched) {
        var string = "";
        for (i = 0; i < fetched.length; i++) {
            string += `<br><br><br><b><u>${fetched[i].certification}</u></b><br>`;
            for (ii = 0; ii < fetched[i].names.length; ii++) {
                string += `${fetched[i].names[ii]} <br>`;
            }
        }
    document.getElementById('scrollingText').innerHTML = `${string}`;
    });
}

window.onload = function () {
    function clock() {
        var now = new Date();
        var TwentyFourHour = now.getHours();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        var mid = 'PM';
        if (min < 10) {
            min = "0" + min;
        }
        if (hour > 12) {
            hour = hour - 12;
        }
        if (hour == 0) {
            hour = 12;
        }
        if (TwentyFourHour < 12) {
            mid = 'AM';
        }
        document.getElementById('clock').innerHTML = hour + ':' + min + ':' + sec + ' ' + mid;
        setTimeout(clock, 1000);
    }

    clock();
}

function foldinginfo() { //For future errors, refer to: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
        fetch('https://cors-anywhere.herokuapp.com/https://stats.foldingathome.org/api/team/227286').then(r => r.json()).then(function (fetched) {
            for (let i = 0; i < fetched.donors.length; i++) {
                let name = fetched.donors[i].name;
                let rank = fetched.donors[i].rank;
                let credit = fetched.donors[i].credit;

                console.log(`${name}- [rank: ${rank}, credits: ${credit}]`);
            }
        });
}

setInterval(foldinginfo(), 3600000)
document.onload = scroller();