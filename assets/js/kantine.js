

export function kantineFetch(){
const kantineApi = "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

    fetch(kantineApi).then(
        (dataReceived) =>{
            return dataReceived.json();
        }
    ).then(
        (data => {
            // console.log(data);
            let kantineData = data.Days;
            // console.log(kantineData)
            buildKantineData(kantineData);

        })
    ).catch(
        (error) => {
            console.error("**  Her er fejlen!  **", error);
        }
    );

    function buildKantineData(data) {
        // console.log("Her er data",data);
        // KantinDay = data.Ca
        ;  (async() => {
            const UgensMenu = document.getElementById('div4');
            const Menu = document.createElement('h2');
            Menu.innerHTML = 'Menu' ;
            UgensMenu.appendChild(Menu)

        data.forEach(day => {
            const weekDay  = day.DayName;
            const Dayret = day.Dish;
            // console.log(weekDay,Dayret);

            const ret =document.createElement('p');
            ret.innerHTML = `${weekDay} : ${Dayret}`;
            UgensMenu.appendChild(ret);
            

        });

        }

        
        )();
        
        
    }
}
