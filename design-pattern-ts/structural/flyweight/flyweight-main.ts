import { WatchStyle1, WatchStyle2, WatchStyle3 } from "./watch-gui";

function flyweightMain(){
    const watchStyle1 = new WatchStyle1();
    watchStyle1.render();

    console.log("--------------------------------");
    
    const watchStyle2 = new WatchStyle2();
    watchStyle2.render();

    console.log("--------------------------------");

    const watchStyle3 = new WatchStyle3();
    watchStyle3.render();
}

flyweightMain();