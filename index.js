let juego=new Juego();

function teclear(e){
	if(event.ctrlKey&&e.code=="KeyZ"){
		alert("atras");
	}
}
document.addEventListener("keydown",teclear);
function getIdx(divid){
	let values=divid.split("_");
	return (values[1]-1)+(values[2]-1)*5;
}
function getCasilla(idx){
	let y=Math.floor(idx/5);
	let x=idx%5;
	return new Casilla(x,y);
}
function mover(div){
	let divid=div.id;
	let idx=getIdx(divid);
	let v=juego.casillas[idx];
	let c=getCasilla(idx);

	if(juego.seleccion){
		if(juego.turno.UNO){
			if(juego.estaLibre(c)){
				juego.mover(c,idx);
				juego.cambio();
				pintarTablero();
				escribirTxt();
				evaluarVictoria();
			}
			
		}
		else{
			if(juego.estaLibre(c)){
				juego.mover(c,idx);
				juego.cambio();
				pintarTablero();
				escribirTxt();
				evaluarVictoria();
			}
		}
		console.log(juego);
	}
	else{
		
		if(juego.turno.UNO()){
			if(v>0){
				juego.seleccionar(idx,divid);
				pintarSeleccion();
				escribirTxt();
			}
			
		}
		else{
			if(v<0){
				juego.seleccionar(idx,divid);
				pintarSeleccion();
				escribirTxt();
			}
		}
		console.log(juego);
	}
}
function getImgId(pieza){
	let x=pieza.casilla.X();
	let y=pieza.casilla.Y();
	return "i_"+(x+1)+"_"+(y+1);
}
function pintarSeleccion(){
	let div=document.getElementById(juego.olddiv);
	div.classList.add("seleccionada");
}
function pintarTablero(){
	let divs=document.getElementsByClassName("seleccionada");
	if(divs.length!=0){
		divs[0].classList.remove("seleccionada");
	}
	
	for(let i=0;i<10;i++){
		let p=juego.piezas[i];
		let imgid=getImgId(p);
		let img=document.getElementById(imgid);
		pintarImagen(p,img);
	}
	for(let i=0;i<25;i++){
		if(juego.casillas[i]==0){
			let c=getCasilla(i);
			let imgid=getImgId(new Pieza(1,1,1,c.X(),c.Y()));
			let img=document.getElementById(imgid);
			
			ocultarImagen(img);
		}
		
	}
	
}
function ocultarImagen(img){
	img.src="";
	img.style.visibility="hidden";
}
function pintarImagen(p,img){
	let src="resources/";
	if(p.jugador==1){
		if(p.tipo==tipos.PEON){
			src+="anubisazul.png";
		}
		else{
			src+="faraonazul.png";
		}
	}
	else{
		if(p.tipo==tipos.PEON){
			src+="anubisrojo.png";
		}
		else{
			src+="faraonrojo.png";
		}
	}
	img.src=src;
	img.style.visibility="visible";
}
function escribirTxt(){
	if(juego.turno.UNO()){
		let txtTurno=document.getElementById("txtTurno");
		txtTurno.value="Juega el uno";
	}
	else{
		let txtTurno=document.getElementById("txtTurno");
		txtTurno.value="Juega el dos";
	}
}
function evaluarVictoria(){
	if(juego.casillas[12]==2){
		let txtVic=document.getElementById("txtVictoria");
		txtVic.value="Gano el 1";
	}
	if(juego.casillas[12]==-2){
		let txtVic=document.getElementById("txtVictoria");
		txtVic.value="Gano el 2";
	}
}
function restart(){
	juego=new Juego();
	pintarTablero();
	escribirTxt();
}