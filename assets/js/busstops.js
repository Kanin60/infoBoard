
function busDepartureFetch(){
const busApi = "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1";
//"../../_localeAPI/multiDepartureBoard.json"
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

        const busDataContainer = document.getElementById('busDataContainer');

        dataFive.forEach(bus => {
            const busName = bus.name.replace(/^Bybus\s/, '');
            const direction = bus.direction;
            const time = bus.time;
            const busDataParagraph = document.createElement('p');
            
            busDataParagraph.textContent = `${busName} ${direction} ${time}`;
        
            busDataContainer.appendChild(busDataParagraph);
        });
    }

        
    )();

};        
