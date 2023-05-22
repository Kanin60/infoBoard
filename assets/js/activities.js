import { dayMonth2dk, myFetch } from "./helpers.js"

const root = document.getElementById('activity-wrapper');

//funktion til at liste aktiviteter med
export const ActivityList  = async () => {
    const config = await myFetch('./config.json')
    console.log(config);

    //i dag
    let curDate = new Date()
    //idag som Unix timestamp
    let curStamp = Math.round(curDate.getTime() / 1000)
    //midnat som UNIX timestamp
    let nextDayStamp = Math.round(curDate.setHours(0,0,0,0) / 1000) + 96400;
    // console.log();

    //henter data

    const url = "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed";
    const result = await myFetch(url);
    let data = result.value;

    data = data.filter(elm => config.array_valid_educations.includes(elm.Education))

    const friendly_names = await myFetch('https://api.mediehuset.net/infoboard/subjects')
    const arr_friendly_names = friendly_names.result;
    // console.log("Wut",friendly_names);

    data.map((item) => {
        //sætter tidszonen ti DK
        item.StartDate = item.StartDate.replace('+01:00', '+00:00')
        //Sætter tidsformat til 2-cifre - både timer og minutter(00:00)
        item.Time = new Date(item.StartDate).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        })

        //bruger venlige navne
        arr_friendly_names.map(word =>{
            if(word.name.toUpperCase() === item.Education.toUpperCase()) {
                item.Education = word.friendly_name
            }
            if(word.name.toUpperCase() === item.Subject.toUpperCase()) {
                item.Subject = word.friendly_name
            }
        })

        item.Stamp = Math.round(new Date(item.StartDate).getTime() / 1000)

        // console.log(item);
    })
    //sort metoden sortere værdien af objektet. I dette tilfælde sortere den dato.
    data.sort((a , b) => {
        if(a.StartDate === b.StartDate){
            return a.Education < b.Education ? -1 : 1
        } else {
            return a.StartDate < b.StartDate ? -1 : 1
        }
    })

    let acc_html= `
        <table>
            <tr>
                <th>Kl</th>
                <th>Uddannelse</th>
                <th>Hold</th>
                <th>Fag</th>
                <th>Lokale</th>
            </tr>
        `;
    
    //idags aktiviteter
    let activities =[]
    activities.push(
        ...data.filter( //... = spead operator - kan kopiere og samle objekter i et array
            elm => elm.Stamp + 3600 >= curStamp && elm.Stamp < nextDayStamp
        )
    )
    
    //i morgens skema
    let nextday_activities = []
    nextday_activities.push(
        ...data.filter(elm => elm.Stamp >= nextDayStamp)
    )

    if(nextday_activities){
        const nextday_friendly = dayMonth2dk(nextday_activities[0].StartDate);
        activities.push({Day: nextday_friendly})
        activities.push(...nextday_activities)
    }

    if(config.max_num_activities){
        activities = activities.slice(0, config.max_num_activities)
    }

    activities.map(item => {
        acc_html += item.Day ? createDayRow(item) : createRow(item)
    })

    acc_html += `</table>`;
    root.innerHTML = acc_html;
    // console.log(activities);

}

function createRow(item) {
    return `
        <tr>
            <td>${item.Time}</td>
            <td>${item.Education}</td>
            <td>${item.Team}</td>
            <td>${item.Subject}</td>
            <td>${item.Room}</td>
        </tr>
        `;
}

/**
 * Generer row til data til dato
 * @param {object} item 
 * @returns html streng
 */
function createDayRow(item) {
    return `
        <tr>
            <td colspan="5">${item.Day}</td>
        </tr>
        `;
}

