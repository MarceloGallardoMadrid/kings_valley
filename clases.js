const tipos={
	FARAON:1,
	PEON:0
}
const colores={
	AZUL:1,
	ROJO:0
}	
class Casilla{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	esIndice(idx){
		return idx==(5*this.y+this.x);
	}
	X(){
		return this.x;
	}
	Y(){
		return this.y;
	}
	esIgual(c){
		return (c.X()==this.x&&c.Y()==this.y);
	}
	esCasilla(idx){
		return idx==(5*this.y+this.x);
	}
	indice(){
		return 5*this.y+this.x;
	}
}
class Pieza{
	//La pieza puede ser un rey o un peon, tiene un color y una posicion
	constructor(tipo,color,jugador,x,y){
		this.tipo=tipo;
		this.color=color;
		this.jugador=jugador;
		this.casilla=new Casilla(x,y);
	}
	mover(x,y){
		this.casilla=new Casilla(x,y);
	}
	esPieza(idx){
		return this.casilla.esIndice(idx);
	}
	estaPieza(c){
		return this.casilla.esIgual(c);
	}
	indice(){
		return this.casilla.indice();
	}
}