var mapp;
var ants = [];
function copy(aObject) {
    if (!aObject) {
        return aObject;
    }

    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        v = aObject[k];
        bObject[k] = (typeof v === "object") ? copy(v) : v;
    }

    return bObject;
}
function is_semechko(){
    for (var l = 0; l < 32; l++) {
        if (mapp[2][l].constructor.name === 'semechko'){

            return true
        }
    return false
    }
}
var gusenici = [];
var dobav = {'left':[-1,0],'right':[1,0],'up':[0,-1],'down':[0,1]};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}
function frc(conf,h){
    var keys = Object.keys(conf).reverse();
    for (var l = 0;l<keys.length;l++){
        if (h>=keys[l]){
            return conf[keys[l]]
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function get_r_pos(x,y){
    r_x = parseInt(x/32);
    r_y = parseInt(y/32);
    return [r_x,r_y]
}
var semechki;
function del_from_map(x,y){
    mapp[y][x] = 0
}
function find_path(cur_y,cur_x) {

    console.log('helloooooo');
    var width = 24;
    var height = 63;
    var visitedMap = JSON.parse(JSON.stringify(mapp));
    var visitedMap = visitedMap;
    var path = [];

    var points = [{'x':cur_x, 'y':cur_y, 'time':0, 'path':path}];

    while (points.length !== 0){
        points = sortByKey(points,'time');
        var x = points[0]['x'];
        var y = points[0]['y'];
        var S = points[0]['time'];
        var path = points[0]['path'];
        points.shift();
        if(x < 0 || y < 1 || x >= width || y >= height){
            continue
        }
        if (visitedMap[x][y] === -1){
            continue
        }
        if (mapp[x][y].constructor.name === 'stonn'){
            continue
        }
        if (mapp[x][y].constructor.name === 'semechko'){
            var finret = [];
            for (var i = 0;i<8;i++){
                finret.push(path[0]);
            }
            return finret
        }

        visitedMap[x][y] = -1;
        var newPath = JSON.parse(JSON.stringify(path));
        newPath.push('down');
        points.push({'x':x+1, 'y':y, 'time':S+1, 'path':newPath});

        var newPath = JSON.parse(JSON.stringify(path));
        newPath.push('right');
        points.push({'x':x, 'y':y+1, 'time':S+1, 'path':newPath});

        var newPath = JSON.parse(JSON.stringify(path));
        newPath.push('up');
        points.push({'x':x-1, 'y':y, 'time':S+1, 'path':newPath});

        var newPath = JSON.parse(JSON.stringify(path));
        newPath.push('left');
        points.push({'x':x, 'y':y-1, 'time':S+1, 'path':newPath});
    }
    return []

}
function desicion(cur_x,cur_y){
    for (var k = 0;k<32;k++){

    }
}
function preload() {
    radioactive = loadSound('tileset/1music.mp3');
}
function setup() {
    semechki = [];
    trava = loadImage("tileset/trava.png");
    dirt = loadImage("tileset/dirt.png");
    eat_sound = loadSound('tileset/smth.mp3');
    egg_p = loadImage('tileset/egg.png');
    semech = loadImage("tileset/semech.png");
    stone = loadImage("tileset/stone.png");
    foodbar = {2:loadImage('tileset/fullfood.png'),1:loadImage('tileset/notfoolfood.png'),0:loadImage('tileset/emptyfood.png')};
    healthbar = {2:loadImage('tileset/fu.png'),1:loadImage('tileset/nf.png'),0:loadImage('tileset/em.png')};
    movements = {'left':loadImage("tileset/ql.png"),'right':loadImage("tileset/qr.png"),'down':loadImage("tileset/qd.png"),'up':loadImage("tileset/qu.png")};
    wmovements = {'left':loadImage("tileset/wl.png"),'right':loadImage("tileset/wr.png"),'down':loadImage("tileset/wd.png"),'up':loadImage("tileset/wu.png")};
    guss = {'left':loadImage('tileset/gusl.png'),'right':loadImage('tileset/gusr.png')};
    createCanvas(1024,768);
    background(135,206,250);
    fill(139,69,19);
    rect(0,96,1024,672);
    startx = getRandomInt(1,31);
    starty = getRandomInt(5,23);
    mapp = spawnmap();
    del_from_map(startx,starty);
    qun = new queen(startx*32,starty*32,'right');
}
function find_rightcam(x_pos){
    if (x_pos + 16 > 64){
        return([32,64])
    }
    else if  (x_pos - 16 < 0){
        return([0,32])
    }
    else {
        return([x_pos-16,x_pos+16])
    }
}
function jff(x,y) {
    if (mapp[y][x] === 0){
        return false
    }
    else {
        return true
    }
}
function jfr(x,y) {
    if (mapp[y][x] === 0){
        return true
    }
    else {
        return false
    }
}
function isblock(cur_x,cur_y,dir) {
    var tabl = {'left':[-1,0,0,26],'right':[33,0,0,26],'up':[0,-1,26,0],'down':[0,33,26,0]};
    for (var i = 0;i<tabl[dir][2];i++){
        if (jfr(parseInt((cur_x+tabl[dir][0]+i)/32),parseInt((cur_y+tabl[dir][1])/32)) === false){
            return false
        }
    }
    for (var k = 0;k<tabl[dir][3];k++){
        if (jfr(parseInt((cur_x+tabl[dir][0])/32),parseInt((cur_y+tabl[dir][1]+k)/32)) === false){
            return false
        }
    }
    return true
}

var fa = 0;
var coco = 0;
function draw() {
    coco += 1;
    if (coco === 1){
        radioactive.play();
    }
    background(135, 206, 250);
    fill(139, 69, 19);
    rect(0, 96, 1024, 672);
    qun.show(find_rightcam(parseInt(qun.x/32)));
    qun.actual = frc(qun.configuration, qun.health);
    qun.hunger = frc(qun.configuration, qun.food);
    console.log(find_rightcam(parseInt(qun.x/32)));
    if (qun.health < 1){
        location.reload();
    }
    for (var i = 0; i < 24; i++) {
        for (var k = find_rightcam(parseInt(qun.x/32))[0]; k < find_rightcam(parseInt(qun.x/32))[1]; k++) {
            if (mapp[i][k] != 0 && mapp[i][k] != 1) {
                mapp[i][k].x = (k-find_rightcam(parseInt(qun.x/32))[0]) * 32;
                mapp[i][k].show()
            }
            if (mapp[i][k].constructor.name === 'egg') {
                var j = Math.random();
                if (j > 0.995) {
                    mapp[i][k].bore();
                }
            }
        }
    }
    var hhh = Math.random();
    if (hhh > 0.995){
        if (qun.food >= 5){
            qun.food -= 5;
            if (qun.health <= 95){
                qun.health += 5
            }
        }
    }
    for (var h = 0; h < ants.length; h++) {
        try {
            if (ants[h].health < 1) {
                delete ants[h]
            }
            else {
                if (ants[h].x > find_rightcam(parseInt(qun.x/32))[0]*32 && ants[h].x < find_rightcam(parseInt(qun.x/32))[1]*32) {
                    ants[h].show();
                }
                ra = Math.random();
                if (ra > 0.8) {
                    if (ants[h].path.length === 0) {
                        ants[h].path = find_path(get_r_pos(ants[h].x, ants[h].y)[0], get_r_pos(ants[h].x, ants[h].y)[1]);
                        if (ants[h].path.length > 0) {
                            if (mapp[get_r_pos(ants[h].x, ants[h].y)[1] + dobav[ants[h].dir][1]][get_r_pos(ants[h].x, ants[h].y)[0] + dobav[ants[h].dir][0]].constructor.name === 'semechko') {
                                console.log('Скушал');
                                qun.food += 5;
                                eat_sound.play();
                            }
                            ants[h].move(ants[h].path[0]);
                            ants[h].path.shift();
                        }

                    }
                    else {
                        ants[h].move(ants[h].path[0]);
                        ants[h].path.shift()
                    }
                }
            }
        }
        catch (e) {
            delete ants[h];
        }
    }
    for (var kl = 0;kl<gusenici.length;kl++){
        if (gusenici[kl].x > find_rightcam(parseInt(qun.x/32))[0]*32 && gusenici[kl].x < find_rightcam(parseInt(qun.x/32))[1]*32){
            gusenici[kl].show();
            var ss = Math.random();
            if (ss > 0.95){
                gusenici[kl].move()
            }
        }

        for (var cc = 0;cc<ants.length;cc++){
            try{
                if (((gusenici[kl].x-ants[cc].x)**2+(gusenici[kl].y-ants[cc].y)**2)**0.5 < 28){
                    ants[cc].health -= 2
                }
            }
            catch (e) {
                console.log('fduhiso')
            }
        }
        if (((gusenici[kl].x-qun.x)**2+(gusenici[kl].y-qun.y)**2)**0.5 < 28){
            var sss = Math.random();
            if (sss>0.7){
                qun.health -= 5
            }
        }
    }
    for (var l = 0; l < 64; l++) {
        a = Math.random();
        if (a > 0.9995 && mapp[2][l] == 0) {
            mapp[2][l] = new semechko(l * 32, 64);

        }
    }
    if (keyIsDown(65)) {
        qun.rotate('left');
        if (isblock(qun.x, qun.y,qun.dir)) {
            qun.move('left')
        }
    }
    else if (keyIsDown(68)) {
        qun.rotate('right');
        if (isblock(qun.x, qun.y,qun.dir)) {
            qun.move('right')
        }
    }
    else if (keyIsDown(87)) {
        qun.rotate('up');
        if (isblock(qun.x, qun.y,qun.dir) && qun.y >= 65) {
            qun.move('up')
        }
    }
    else if (keyIsDown(83)) {
        qun.rotate('down');
        if (isblock(qun.x, qun.y,qun.dir)) {
            qun.move('down')
        }
    }
}
function keyPressed() {
    if (keyCode === 32){
        if (qun.y < 708){
            qun.kopat()
        }
    }
    if (keyCode === 70){
        var choices = ['worker'];
        if (mapp[get_r_pos(qun.x,qun.y)[1]][get_r_pos(qun.x,qun.y)[0]] === 0 && qun.food >= 30){
            mapp[get_r_pos(qun.x,qun.y)[1]][get_r_pos(qun.x,qun.y)[0]] = new egg(get_r_pos(qun.x,qun.y)[0]*32+find_rightcam(parseInt(qun.x/32))[0]*32,get_r_pos(qun.x,qun.y)[1]*32,get_r_pos(qun.x,qun.y)[0]*32+find_rightcam(parseInt(qun.x/32))[0]*32,choose(choices),find_rightcam(parseInt(qun.x/32))[0]);
            qun.food -= 30
        }
    }

}
function spawnmap() {
    var map = [];
    for (var i =0;i<768;i+=32){
        map.push([]);
        if (i < 96) {
            for (var k = 0; k < 2048; k+=32) {
                map[i/32].push(0)
            }
        }
        else if( i == 96 ){
            for (var k = 0; k < 2048; k+=32) {
                map[i/32].push(new block(true,k,i))
            }
        }
        else {
            for (var k = 0; k < 2048; k+=32) {
                var ss = Math.random();
                if (ss > 0.99){
                    map[i/32].push(0);
                    gusenici.push(new gusen(k,i,choose(['left','right'])))
                }
                else if (ss > 0.7){
                    map[i/32].push(new stonn(k,i))
                }
                else{
                    map[i/32].push(new block(false,k,i))
                }
            }
        }
    }
    return map
}
class block {
    constructor(withgr=false,x,y) {
        this.withgr = withgr;
        this.x = x;
        this.y = y;
    }
    show() {
        if (this.withgr) {
            image(trava,this.x,this.y)
        }
        else {
            image(dirt,this.x,this.y)
        }
    }
}
class queen {
    constructor(x,y,dir){
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.variants = {'left':[0,-4],'right':[0,4],'up':[-4,0],'down':[4,0]};
        this.goro = {'left':[0,-16],'right':[0,-16],'up':[0,16],'down':[0,16]};
        this.health = 70;
        this.configuration = {90:[2,2,2,2,2],80:[2,2,2,2,1],70:[2,2,2,2,0],60:[2,2,2,1,0],50:[2,2,2,0,0],40:[2,2,1,0,0],30:[2,2,0,0,0],20:[2,1,0,0,0],10:[2,0,0,0,0],0:[1,0,0,0,0],};
        this.food = 49;
        this.actual = frc(this.configuration,this.health);
        this.hunger = frc(this.configuration,this.food);
    }
    move(stor) {
        this.dir = stor;
        this.x += this.variants[stor][1];
        this.y += this.variants[stor][0];
    }
    rotate(st){
        this.dir = st
    }
    kopat(){
        console.log(this.food);
        if (this.dir === 'left'){
            if (mapp[get_r_pos(this.x+this.goro[this.dir][0],this.ythis.goro[this.dir][1])[1]][get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[0]-1].constructor.name === 'semechko' && this.food < 98){
                this.food += 5;
                eat_sound.play();

            }
            if (mapp[get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[1]][get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[0]-1].constructor.name !== 'stonn'){
                del_from_map(get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[0]-1,get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[1])
            }
        }
        else if (this.dir === 'right'){
            if (mapp[get_r_pos(this.x+4+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[1]][get_r_pos(this.x+4+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[0]+1].constructor.name === 'semechko' && this.food < 98) {
                this.food += 5;
                eat_sound.play();

            }
            if (mapp[get_r_pos(this.x+4+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[1]][get_r_pos(this.x+4+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[0]+1].constructor.name !== 'stonn'){
                //del_from_map(get_r_pos(this.x+4,this.y)[0]+1,get_r_pos(this.x+4,this.y)[1])
                del_from_map(get_r_pos(this.x+4+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[0]+1,get_r_pos(this.x+4+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[1])
            }
        }
        else if (this.dir === 'up'){
            if (mapp[get_r_pos(this.x,this.y)[1]-1][get_r_pos(this.x,this.y)[0]].constructor.name === 'semechko' && this.food < 98) {
                this.food += 5;
                eat_sound.play()
            }
            if (mapp[get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[1]-1][get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[0]].constructor.name !== 'stonn'){
                //del_from_map(get_r_pos(this.x,this.y)[0],get_r_pos(this.x,this.y)[1]-1);
                del_from_map(get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[0],get_r_pos(this.x+this.goro[this.dir][0],this.y+this.goro[this.dir][1])[1]-1)
            }
        }
        else if (this.dir === 'down' && get_r_pos(this.x,this.y)[1] < 22){
            if (mapp[get_r_pos(this.x,this.y+4)[1]+1][get_r_pos(this.x,this.y+4)[0]].constructor.name === 'semechko' && this.food < 98) {
                this.food += 5;
                eat_sound.play()
            }
            if (mapp[get_r_pos(this.x+this.goro[this.dir][0],this.y+4+this.goro[this.dir][1])[1]+1][get_r_pos(this.x+this.goro[this.dir][0],this.y+4+this.goro[this.dir][1])[0]].constructor.name !== 'stonn'){
                //del_from_map(get_r_pos(this.x,this.y+4)[0],get_r_pos(this.x,this.y+4)[1]+1)
                del_from_map(get_r_pos(this.x+this.goro[this.dir][0],this.y+4+this.goro[this.dir][1])[0],get_r_pos(this.x+this.goro[this.dir][0],this.y+4+this.goro[this.dir][1])[1]+1)
            }
        }
    }
    show() {
        /*background(135,206,250);
        fill(139,69,19);
        rect(0,96,1024,672);*/

        image(movements[this.dir],this.x-find_rightcam(parseInt(this.x/32))[0]*32,this.y);
        for (var i = 0;i<5;i++){
            image(healthbar[this.actual[i]],850+i*32,6)
        }
        for (var k = 0;k<5;k++){
            image(foodbar[this.hunger[k]],10+k*32,6)
        }
    }
}
class semechko {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    show() {
        image(semech,this.x,this.y);
    }
}
class egg {
    constructor(x,y,ax,chin,sdv){
        this.x = x;
        this.ax = ax;
        this.y = y;
        this.sdv = sdv;
        this.chin =chin;
    }
    bore(){
        if (this.chin === 'worker'){
            ants.push(new worker(this.x+find_rightcam(parseInt(qun.x/32))[0]*32,this.y,25,'right'));
            mapp[this.y/32][this.ax/32] = 0
        }
    }
    show(){
        image(egg_p,this.x,this.y);
    }
}
class worker {
    constructor(x,y,health,dir){
        this.x = x;
        this.y = y;
        this.health = health;
        this.dir = dir;
        this.mvmnts = {'left':[-4,0],'right':[4,0],'up':[0,-4],'down':[0,4]};
        this.dobav = {'left':[0,0],'right':[1,0],'up':[0,0],'down':[0,1]};
        this.path = [];
    }
    move(cmd){
        this.dir = cmd;
        del_from_map(get_r_pos(this.x,this.y)[0]+this.dobav[this.dir][0],get_r_pos(this.x,this.y)[1]+this.dobav[this.dir][1]);
        console.log(mapp[get_r_pos(this.x,this.y)[1]+this.dobav[this.dir][1]][get_r_pos(this.x,this.y)[0]+this.dobav[this.dir][0]].constructor.name);
        if (mapp[get_r_pos(this.x,this.y)[1]+this.dobav[this.dir][1]][get_r_pos(this.x,this.y)[0]+this.dobav[this.dir][0]].constructor.name === 'semechko'){
            console.log('Скушал');
            qun.food += 5
        }
        this.x += this.mvmnts[cmd][0];
        this.y += this.mvmnts[cmd][1];
    }
    show() {
        image(wmovements[this.dir],this.x-find_rightcam(parseInt(qun.x/32))[0]*32,this.y)
    }

}
class stonn {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    show() {
        image(stone,this.x,this.y)
    }
}
class gusen {
    constructor(x,y,dir,lx,ly) {
        this.x = x;
        this.y = y;
        this.lasx = lx;
        this.lasy = ly;
        this.dir = dir;
        this.path = [];
        this.dobav = {'left':[-1,0],'right':[1,0]};
        this.sdvig = {'left':[-4,0],'right':[4,0]};
        this.change = {'left':'right','right':'left'}
    }
    next(comm){
        this.dir = comm;
        this.x += this.sdvig[comm][0];
        this.y += this.sdvig[comm][1];
    }
    move(){
        if (this.path.length === 0){
            if (mapp[parseInt(this.y/32)+this.dobav[this.dir][1]][parseInt(this.x/32)+this.dobav[this.dir][0]] === 0){
                var fpa = [];
                for (var i = 0;i<8;i++){
                    fpa.push(this.dir)
                }
                this.path = fpa
            }
            else {
                this.dir = this.change[this.dir];
                /*
                var fpa = [];
                for (var i = 0;i<8;i++){
                    fpa.push(this.dir)
                }
                this.path = fpa*/
            }
        }
        else {
            this.next(this.path[0]);
            this.path.shift()
        }
    }
    show(){
        image(guss[this.dir],this.x-find_rightcam(parseInt(qun.x/32))[0]*32,this.y)
    }
}