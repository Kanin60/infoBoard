
export function clock(){
    let  date = new Date(),
            hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
            minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
            date = (date.toLocaleDateString());
    document.getElementById('time').innerHTML = hours + ':' + minutes ;
    document.getElementById('date').innerHTML = date.replace(/\./g, "/"); 
}

setInterval(clock, 1000);
