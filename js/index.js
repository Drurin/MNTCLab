function scroller() {
    fetch('https://raw.githubusercontent.com/Drurin/MNTCLab/master/certificationNames.json').then(r => r.json()).then(function (fetched) {
        var string = "";
        for (i = 0; i < fetched.length; i++) {
            string += `<br><br><br><b><u>${fetched[i].certification}</u></b><br>`;
            for (ii = 0; ii < fetched[i].names.length; ii++) {
                string += `${fetched[i].names[ii]} <br>`;
            }
        }
        document.getElementById('marquee').innerHTML = `${string}`;

        $('.marquee').marquee({
            speed: 50,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'up',
            duplicated: true,
        });
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

function abb(num, fixed) {
    if (num === null) {
        return null;
    }
    if (num === 0) {
        return '0';
    }
    fixed = (!fixed || fixed < 0) ? 2 : fixed;
    var b = (num).toPrecision(2).split("e"),
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed),
        d = c < 0 ? c : Math.abs(c),
        e = d + ['', 'K', 'M', 'B', 'T'][k];
    return e;
}

function foldinginfo() { //For future errors, refer to: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
        fetch('https://cors-anywhere.herokuapp.com/https://stats.foldingathome.org/api/team/227286').then(r => r.json()).then(function (fetched) {
            for (let i = 0; i < 20; i++) {
                window.logo = fetched.logo;
                window.teamRank = fetched.rank;
                window.credit = fetched.credit;
                window.wus = fetched.wus;
            }
                
                var anchor = document.getElementById("logo");
                var att = document.createAttribute("src");
                att.value = logo;
                anchor.setAttributeNode(att);

                let scoreNew, scorePast = credit;
                let wusNew, wusPast = wus;
                var now = new Date();
                if (now.getHours() == 0) {
                    scorePast = scoreNew;
                    wusPast = wusNew;
                    scoreNew = credit;
                    wusNew = wus;
                    document.getElementById('24hrC').innerHTML = `${abb(scoreNew - scorePast)} Credits`;
                    document.getElementById('24hrW').innerHTML = `${abb(wusNew - wusPast)} WUs`;
                }

                let slCount = 0;
                function SL() {
                    if (slCount >= 20) {
                        slCount = 0;
                    }
                    document.getElementById('spotlight').innerHTML = `<u><b>${fetched.donors[slCount].name}</b></u><br>Global Rank: ${fetched.donors[slCount].rank}, Team Rank: ${slCount+1}, Credits: ${abb(fetched.donors[slCount].credit)}, WUs: ${abb(fetched.donors[slCount].wus)}`;
                    slCount++;
                    setTimeout(SL, 20000);
                }
                SL();

                document.getElementById('credits').innerHTML = `<b style="font-weight: 800;">${abb(credit)}</b> Credits`;
                document.getElementById('wus').innerHTML = `<b style="font-weight: 800;">${abb(wus)}</b> WUs`;
                document.getElementById('rank').innerHTML = `RANK <b style="font-weight: 900;">${teamRank}</b>`;
            
        });
}

setInterval(foldinginfo(), 1800000)
document.onload = scroller();