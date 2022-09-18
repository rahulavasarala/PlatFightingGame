class SpatialTile {

    constructor() {
        this.entities = new Set();
    }


    add_entity(e1) {
        this.entities.add(e1);
    }


    remove_entity(e1) {
        this.entities.delete(e1);
    }
}
