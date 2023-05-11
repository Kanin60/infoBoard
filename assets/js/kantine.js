kantineFetch();

function kantineFetch(){
const kantineApi = "../../_localeAPI/Kantine.json";

    fetch(kantineApi).then(
        (dataReceived) =>{
            return dataReceived.json();
        }
    ).then(
        (data => {
            // console.log(data);
            let kantineData = data.Days;
            console.log(kantineData)
            // buildKantineData(kantineData);
        })
    ).catch(
        (error) => {
            console.error("**  Her er fejlen!  **", error);
        }
    );

    // function buildKantineData(data) {
    //     console.log(data);
    // }
    
}