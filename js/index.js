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

setInterval(foldinginfo, 3600000)
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

function foldinginfo() {
    fetch('https://stats.foldingathome.org/api/team/227286').then(r => r.json()).then(function (fetched) {
        for (let i = 0; i < fetched.donors.length(); i++) {
            let name = fetched.donor[i].name;
            let rank = fetched.donor[i].rank;
            let credit = fetched.donor[i].credit;

            console.log(`${name}- [rank: ${rank}, credits: ${credit}`);
        }
    });
}

document.onload = scroller();