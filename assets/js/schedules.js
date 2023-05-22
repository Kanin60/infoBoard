schedulesFetch();

function schedulesFetch(){
const scheduleApi = "../../_localeAPI/schedules.json";//JSON_FIL til TEST 
    // console.log(scheduleApi);

    fetch(scheduleApi).then(
        (dataReceived) =>{
            return dataReceived.json();
        }
    ).then(
        (data => {
            let scheduleData = data.value;
            buildscheduleData(scheduleData);
            // console.log(scheduleData);
        })
    ).catch(
        (error) => {
            console.error("**  Her er fejlen!  **", error);
        }
    );


    function buildscheduleData(data){
        // console.log(data);
        // console.log("Her er alt dataen fra skemaet: \n", data);
        data.sort((a, b) => Date.parse(a.StartDate) - Date.parse(b.StartDate));
        //parse retunere StartDate i milisekunder fra 1. januar 1970 (UNIX-time)
        // console.log("Er dataen sorteret efter tid?",data); //Ja, den er sorteret
        //filtrere uddannelser så der kun er fra medie-gangen og brobyggere
        const specificEducation = data.filter( obj => obj.Education === "Mediegrafiker" || obj.Education === "Grafisk teknik." || obj.Education === "Webudvikler" || obj.Education === "FGU med EUD.");
        // console.log("lulu", specificEducation);
        let dataFirst = specificEducation.splice(0,9);
        // console.log('U R?',dataFirst);




        dataFirst.forEach(card => {
                let tid = card.StartDate.split("T")[1].split(":")[0] + ":" + card.StartDate.split("T")[1].split(":")[1];
                //"2023-05-09T 08:15 :00+02:00"
                let holdnavn = card.Team;
                let uddannelse = card.Education;
                let titel = card.Subject;
                let lokale = card.Room;
                // console.log(tid, dato, holdnavn, uddannelse, titel, lokale);
                // console.log('WUT U?',card);


                const skemaHoldContainer = document.getElementById('skema');
                const skemaParagraph = document.createElement('p');
            
                skemaParagraph.innerHTML =`${tid} ${uddannelse} ${holdnavn} ${titel} ${lokale} <br><br>`;
                skemaHoldContainer.appendChild(skemaParagraph);
        });
    }
}
