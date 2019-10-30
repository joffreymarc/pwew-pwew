var Ennemy = function(name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.life = 1;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 2;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
        });

    bumperMesh = new THREE.Mesh(new THREE.CubeGeometry(15,15,15), this.materialBumper);
    bumperMesh.rotation.x = Math.PI / 2 ;

    sphere = new THREE.SphereGeometry(6, 8, 8);
    THREE.GeometryUtils.merge(sphere, bumperMesh);

    canon = new THREE.CubeGeometry(3, 3, 15);
    THREE.GeometryUtils.merge(canon, sphere);

    this.graphic = new THREE.Mesh(sphere, this.material);
    this.graphic.position.z = 6;
    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction);
};

Ennemy.prototype.accelerate = function (distance) {
    var max = 2;

    this.speed += distance / 4;
    if (this.speed >= max) {
        this.speed = max;
    }
};

Ennemy.prototype.decelerate = function (distance) {
    var min = -1;

    this.speed -= distance / 16;
    if (this.speed <= min) {
        this.speed = min;
    }
};

Ennemy.prototype.displayInfo = function () {
    jQuery('#'+this.name+' >.life').text(this.life);
}

Ennemy.prototype.turnRight = function (angle) {
    this.direction -= angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), angle);
};

Ennemy.prototype.turnLeft = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), angle);
};

Ennemy.prototype.move = function () {
    var moveTo = new THREE.Vector3(
        this.speed * Math.cos(this.direction) + this.graphic.position.x,
        this.speed * Math.sin(this.direction) + this.graphic.position.y,
        this.graphic.position.z
    );

    this.graphic.position = moveTo;

    light1.position.x = this.graphic.position.x;
    light1.position.y = this.graphic.position.y;
    //light1.position.z = this.graphic.position.z - 500;
};
