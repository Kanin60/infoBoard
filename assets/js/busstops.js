
function busDepartureFetch(){
const busApi = "../../_localeAPI/multiDepartureBoard.json"
    console.log(busApi);

    fetch(busApi).then(
        (dataReceived) =>{
            return dataReceived.json();
        }
    ).then(
        (data => {
            let busData = data.MultiDepartureBoard.Departure;
            buildBusData(busData);
        })
    ).catch(
        (error) => {
            console.error("**  Her er fejlen!  **", error);
        }
    );
}
busDepartureFetch();


function buildBusData(data){
    console.log("Her er busdataen", data);

    const setApiDate = (addDays = 0) => {
        let curDate = addDays
            ? new Date(new Date().getTime() + addDays * 86400 * 1000)
            : new Date()
        let strYear = curDate.getFullYear()
        let strMonth = (curDate.getMonth() + 1).toString().padStart(2, 0)
        let strDate = curDate.getDate().toString().padStart(2, 0)
        return `${strYear}-${strMonth}-${strDate}`
    }
    // console.log(setApiDate);



    ; (async () => {
        // console.log("busdata modtaget",{data});

        let dataFive = data.splice(0,6);
        console.log('her er five',dataFive);

        dataFive.map((data) => {
            // console.log(data);
            buildBusCard(data);
        });

        function buildBusCard(data){
            console.log('HER',data);
            let busName = data.name.replace(/^Bybus\s/, '');
            const bustider = document.getElementById("div5");
            bustider.innerHTML =`<h2>Bustider: </h2>`;
            const bus = document.getElementById("bus");
            document.querySelector('bus').innerHTML = `<p>${busName} ${data.direction} ${data.time}</p>`;
        }
    })();

        };        
