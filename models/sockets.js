const BandList = require("./band-list");

class Sockets {
    constructor( io ){
        this.io = io;
        this.bandList = new BandList();
        this.socketsEvents();
    }

    socketsEvents( ) {
        this.io.on('connection', socket => {
            console.log('Cliente Conectado...');
            socket.emit('current-bands', this.bandList.getBands());

            socket.on('votar-banda', (id)=>{
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            })

            socket.on('borrar-banda', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            } )

            socket.on('cambiar-nombre-banda', ({id, nombre}) => {
                this.bandList.changeName(id, nombre);
                this.io.emit('current-bands', this.bandList.getBands());
            } )

            socket.on('crear-banda', ({nombre}) => {
                this.bandList.addBand(nombre);
                this.io.emit('current-bands', this.bandList.getBands());
            } )
        });
    }
}

module.exports = Sockets;