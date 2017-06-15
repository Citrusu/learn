/**
 * Created by Citrus on 2017/6/12.
 */
function getSyncTime(){
    return new Promise((resolve, reject) => {
        let st = new Date().getTime();
        setTimeout(() => {
            let et = new Date().getTime();
            let useTime = et - st;
            resolve(useTime);
        },500)
    })
}

async function showTime(){
    let useTime = await getSyncTime();
    console.log(useTime);
}

showTime();