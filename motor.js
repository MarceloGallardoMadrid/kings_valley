const flags={
	PRIMERA_PIEZA:true
};
const tipoMovimiento={
	SEL:1,
	MOV:0
};
class Movimiento{
	constructor(tipo,pieza,x,y){
		this.tipo=tipo;
		this.pieza=pieza;
		this.x=x;
		this.y=y;
	}
	
};

class Turno{
	constructor(){
		this.uno=true;
		this.dos=false;
	}
	cambio(){
		if(this.uno){
			this.uno=false;
			this.dos=true;
		}
		else{
			this.uno=true;
			this.dos=false;
		}
	}
	UNO(){
		return this.uno;
	}
	DOS(){
		return this.dos;
	}
};
class Juego{
	//1 peon,2 rey, postivo jugador 1, negativo jugador 2
	//Jugador 1,1 jugador 2,2
	constructor(){
		this.casillas=[1,1,2,1,1,
						0,0,0,0,0,
						0,0,0,0,0,
						0,0,0,0,0,
						-1,-1,-2,-1,-1];
		this.casillaslibres=[];
		this.piezas=[];
		this.turno=new Turno();
		this.seleccion=false;
		this.olddiv=-1;
		this.piezaSeleccionada=-1;
		this.movs=[];
		this.llenarPiezas();
		this.flags=flags;
	};
	llenarPiezas(){
		let p1a,p2a,p3a,p4a,fa;
		let p1r,p2r,p3r,p4r,fr;
		p1a=new Pieza(tipos.PEON,colores.AZUL,1,0,0);
		p2a=new Pieza(tipos.PEON,colores.AZUL,1,1,0);
		p3a=new Pieza(tipos.PEON,colores.AZUL,1,3,0);
		p4a=new Pieza(tipos.PEON,colores.AZUL,1,4,0);
		p1r=new Pieza(tipos.PEON,colores.ROJO,2,0,4);
		p2r=new Pieza(tipos.PEON,colores.ROJO,2,1,4);
		p3r=new Pieza(tipos.PEON,colores.ROJO,2,3,4);
		p4r=new Pieza(tipos.PEON,colores.ROJO,2,4,4);
		fa=new Pieza(tipos.FARAON,colores.AZUL,1,2,0);
		fr=new Pieza(tipos.FARAON,colores.ROJO,2,2,4);
		this.piezas.push(p1a);
		this.piezas.push(p2a);
		this.piezas.push(p3a);
		this.piezas.push(p4a);
		this.piezas.push(p1r);
		this.piezas.push(p2r);
		this.piezas.push(p3r);
		this.piezas.push(p4r);
		this.piezas.push(fa);
		this.piezas.push(fr);
	};
	seleccionada(){
		return this.seleccion;
	};
	existePieza(c){
		for(let i=0;i<10;i++){
			let p=this.piezas[i];
			if(p.estaPieza(c)){
				return true;
			};
		};
		return false;
	};
	estaLibre(c){
		for(let i=0;i<this.casillaslibres.length;i++){
			let cas=this.casillaslibres[i];
			if(c.esIgual(cas)){
				return true;
			}
			
		}
		return false;
	}
	calcularCasillasLibresHorizontal(x,y){
		//Calcular para la izquierda
		let lastc;
		let recorrido=x-1;
		for(let i=recorrido;i>-1;i--){
			let c=new Casilla(i,y);
			if(i==0&&!this.existePieza(c)){
				this.casillaslibres.push(c);
				
			}
			if(i!=recorrido&&this.existePieza(c)&&(!lastc.esIgual(new Casilla(2,2))||this.piezaSeleccionada.tipo==tipos.FARAON)){
				if(!this.existePieza(lastc)){
					this.casillaslibres.push(lastc);
					
				}

			}
			if(this.existePieza(c)){
				break;
			}
			lastc=c;
		}
		//Calcular para la derecha
		recorrido=4-x;
		for(let i=x+1;i<5;i++){
			let c=new Casilla(i,y);
			if(i==4&&!this.existePieza(c)){
				this.casillaslibres.push(c);
			}
			if(i!=(x+1)&&this.existePieza(c)&&(!lastc.esIgual(new Casilla(2,2))||this.piezaSeleccionada.tipo==tipos.FARAON)){
				if(!this.existePieza(lastc)){
					this.casillaslibres.push(lastc);
					
				}
				
			}
			if(this.existePieza(c)){
				break;
			}
			lastc=c;
		}
	}
	calcularCasillasLibresVertical(x,y){
		//Calcular para aarriba
		let lastc;
		let recorrido=y-1;
		for(let i=recorrido;i>-1;i--){
			let c=new Casilla(x,i);
			if(i==0&&!this.existePieza(c)){
				this.casillaslibres.push(c);
			}
			if(i!=recorrido&&this.existePieza(c)&&(!lastc.esIgual(new Casilla(2,2))||this.piezaSeleccionada.tipo==tipos.FARAON)){
				if(!this.existePieza(lastc)){
					this.casillaslibres.push(lastc);
					
				}
				
			}
			if(this.existePieza(c)){
				break;
			}
			lastc=c;
		}
		//Calcular para abajo
		recorrido=4-y;
		for(let i=y+1;i<5;i++){
			let c=new Casilla(x,i);
			if(i==4&&!this.existePieza(c)){
				this.casillaslibres.push(c);
			}
			if(i!=(y+1)&&this.existePieza(c)&&(!lastc.esIgual(new Casilla(2,2))||this.piezaSeleccionada.tipo==tipos.FARAON)){
				if(!this.existePieza(lastc)){
					this.casillaslibres.push(lastc);
				}
				
			}
			if(this.existePieza(c)){
				break;
			}
			lastc=c;
		}
	}
	calcularCasillasLibresDiagonales(x,y){
		//Calcular diagonal superior Izquierda
		let lastc;
		let recorrido=Math.min(x,y);
		let i=x-1;
		let j=y-1;
		for(let k=0;k<recorrido;k++){
			let c=new Casilla(i,j);
			if(k==(recorrido-1)&&!this.existePieza(c)){
				this.casillaslibres.push(c);
			}
			if(k!=0&&this.existePieza(c)&&(!lastc.esIgual(new Casilla(2,2))||this.piezaSeleccionada.tipo==tipos.FARAON)){
				if(!this.existePieza(lastc)){
					this.casillaslibres.push(lastc);
				}
				
			}
			if(this.existePieza(c)){
				break;
			}
			i--;
			j--;
			lastc=c;
		}
		//Calcular diagonal inferior izquierda
		recorrido=Math.min(x,4-y);
		i=x-1;
		j=y+1;
		for(let k=0;k<recorrido;k++){
			let c=new Casilla(i,j);
			if(k==(recorrido-1)&&!this.existePieza(c)){
				this.casillaslibres.push(c);
			}
			if(k!=0&&this.existePieza(c)&&(!lastc.esIgual(new Casilla(2,2))||this.piezaSeleccionada.tipo==tipos.FARAON)){
				if(!this.existePieza(lastc)){
					this.casillaslibres.push(lastc);
				}
				
			}
			i--;
			j++;
			if(this.existePieza(c)){
				break;
			}
			lastc=c;
		}
		//Calcular diagonal inferior derecha
		recorrido=Math.min(4-x,4-y);
		i=x+1;
		j=y+1;
		for(let k=0;k<recorrido;k++){
			let c=new Casilla(i,j);
			if(k==(recorrido-1)&&!this.existePieza(c)){
				this.casillaslibres.push(c);
			}
			if(k!=0&&this.existePieza(c)&&(!lastc.esIgual(new Casilla(2,2))||this.piezaSeleccionada.tipo==tipos.FARAON)){
				if(!this.existePieza(lastc)){
					
					this.casillaslibres.push(lastc);
				}
			}
			i++;
			j++;
			if(this.existePieza(c)){
				break;
			}
			lastc=c;
		}
		//Calcular diagonal superior derecha
		recorrido=Math.min(4-x,y);
		i=x+1;
		j=y-1;
		for(let k=0;k<recorrido;k++){
			let c=new Casilla(i,j);
			if(k==(recorrido-1)&&!this.existePieza(c)){
				this.casillaslibres.push(c);
			}
			if(k!=0&&this.existePieza(c)&&(!lastc.esIgual(new Casilla(2,2))||this.piezaSeleccionada.tipo==tipos.FARAON)){
				if(!this.existePieza(lastc)){
					this.casillaslibres.push(lastc);
				}
				
			}
			i++;
			j--;
			if(this.existePieza(c)){
				break;
			}
			lastc=c;
		}
	}
	calcularCasillasLibres(){
		let lastc;
		let x=this.piezaSeleccionada.casilla.X();
		let y=this.piezaSeleccionada.casilla.Y();
		this.calcularCasillasLibresHorizontal(x,y);
		this.calcularCasillasLibresVertical(x,y);
		this.calcularCasillasLibresDiagonales(x,y);
	}
	seleccionar(idx,divid){
		for(let i=0;i<10;i++){
			let p=this.piezas[i];
			if(p.esPieza(idx)){
				if(this.turno.UNO()&&(p.jugador==1)){
					this.privSeleccionar(divid,p);
					this.casillaslibres=[];
					this.calcularCasillasLibres();
					break;
				}
				if(this.turno.DOS&&(p.jugador==2)){
					this.privSeleccionar(divid,p);
					this.casillaslibres=[];
					this.calcularCasillasLibres();
					break;
				}
				
			}
		}
	}
	mover(c,idx){
		let oldidx=this.piezaSeleccionada.indice();
		this.casillas[oldidx]=0;
		let p = this.piezaSeleccionada;
		let m = new Movimiento(tipoMovimiento.MOV,p,p.casilla.X(),p.casilla.Y());
		this.movs.push(m);
		this.piezaSeleccionada.mover(c.X(),c.Y());
		if(this.piezaSeleccionada.jugador==1){
			if(this.piezaSeleccionada.tipo==tipos.FARAON){
				this.casillas[idx]=2;
			}
			else{
				this.casillas[idx]=1;
			}
		}
		else{
			if(this.piezaSeleccionada.tipo==tipos.FARAON){
				this.casillas[idx]=-2;
			}
			else{
				this.casillas[idx]=-1;
			}
		}

		this.seleccion=false;
	}
	privSeleccionar(divid,p){
		this.olddiv=divid;
		this.piezaSeleccionada=p;
		this.seleccion=true;
		let m=new Movimiento(tipoMovimiento.SEL,p,p.casilla.X(),p.casilla.Y());
		this.movs.push(m);
	}
	PIEZA(){
		return this.piezaSeleccionada;
	}
	cambio(){
		this.turno.cambio();
	}
}