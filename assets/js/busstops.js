busDepartureFetch();

export function busDepartureFetch(){
const busApi = "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1";
//"../../_localeAPI/multiDepartureBoard.json" //JSON_FIL til TEST 
    // console.log(busApi);

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


export function buildBusData(data){
    // console.log("Her er busdataen", data);

    // immediately invoked function expressions(IIFE) - self invoked anonym function 
    ( () => {
        // console.log("busdata modtaget",{data});

        let dataFive = data.splice(0,5);
        // console.log('her er five',dataFive);

        //finder elementet i dom
        const busDataContainer = document.getElementById('busDataContainer');

        //I denne forEach bliver der lavet en paragraf for hvert af opbjekterne i array'et, som indeholder bus, direction og afgang
        dataFive.forEach(bus => {
            const busName = bus.name.replace(/^Bybus\s/, ''); //Sletter bybus ved hjælp af replace og regular expression
            const direction = bus.direction;
            const time = bus.time;
            const busDataParagraph = document.createElement('p');

            busDataParagraph.textContent = `${busName} ${direction} ${time}`;
            busDataContainer.appendChild(busDataParagraph);
        });
    }

        
    )();

};        
