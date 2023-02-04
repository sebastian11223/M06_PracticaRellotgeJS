function Clock(hora, minuts,segons,estat,sentit) {
    this.hora = hora;
    this.minuts = minuts;
    this.segons = segons;
    this.estat = estat;
    this.sentit = sentit;
    this.sentit = true //true: endavant; false: endarrere
    this.ref = 0; //és la referència que retorna setInterval
    this.formata = function() {
      let cad_segon = this.segons.toString();
      let cad_minut = this.minuts.toString();
      let cad_hora = this.hora.toString();   
       
      return  cad_hora + ':' + cad_minut + ':' + cad_segon;
       
    }

    //referenciamos la funcion formata
    this.formata = function() {
      return this.formata();
    }



    this.arrenca = function() { 
       if (estat==false) estat=true;
       this.ref = setTimeout(() => {
          if (this.sentit) {
            this.segons++;
            if (this.segons == 60)
             this.segon = 0;
             this.minuts += 1;
             if (this.minuts == 60) {
                this.minuts = 0;
                this.hora += 1;
             }
          }
 
       }, 1000);
    };
 
    this.accionar = function(){
      return this.arrenca();
    }

    this.stop = function(){
      if (this.estat == true) this.estat = false;
         clearInterval(this.ref);
    }

    this.stoped = function() {
      return this.stop();
    }

    this.resetear = function() {
   //llamamos a la funcion de parar el reloj 
   //y reseteamos los datos a 0
      this.stop();
      this.segons = 0;
      this.minuts = 0;
      this.hora = 0;
    }

    this.reseteado = function(){
      return this.resetear();
    }
  }

let RelojOriginal = new Clock(hora=new Date().getHours(),minuts=new Date().getMinutes(), segons=new Date().getSeconds(), true, true);
let Reloj2 = new Clock(0,0,0, true, true);
let Reloj3 = new Clock(0,5,0, false, true);
let cron = 0;

function resultado(){
    let reloj = document.querySelector(".reloj");
    let parar = document.querySelector(".parar");
    let iniciar = document.querySelector(".iniciar");
    reloj.innerHTML = RelojOriginal.format();
    //cuando llegue a 10 segundos el segundo reloj se inicia
    if(cron > 10){
        Reloj2.accionar();
        iniciar.innerHTML = Reloj2.format();
    }

    parar.innerHTML = Reloj3.format();
    //el reloj 3 se para cada vez que el segundo reloj
    //tenga minutos pares (entra en modo pausa).
    if(Reloj2.minutos % 2 == 0){
        Reloj3.stop();
    
    }else{
        Reloj3.arrenca();
    }
    //con la variable cron lo que hacemos es incrementar el tiempo simulando al reloj 
    cron++;
    RelojOriginal.accionar();
    run();
}

function run(){
    temps = setTimeout(resultado,1000);
}
run();

console.log(RelojOriginal);

 
 