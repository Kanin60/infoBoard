
    function skema(){
        const skemaApi = "../../_localeAPI/schedules.json"
        console.log(skemaApi);
        let skemaData;

        fetch(skemaApi)
            .then((dataReceived) =>{
                return dataReceived.json();
            })
            .then(data =>{
                skemaData = data.value;
                console.log(data.value);
            })
            .catch((error) => {
                console.error('Hello',error);
            });
    }
    
    skema();