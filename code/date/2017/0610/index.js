/**
 * Created by Citrus on 2017/6/10.
 */
// callback
function getTime(func){
    let st = new Date().getTime();
    setTimeout(function(){
        let et = new Date().getTime();
        let data = et - st;
        func(data);
    }, 500)
}

function showTime(data){
    console.log('1:' + data);
}

getTime(showTime);

// async await
function getSyncTime(){
    return new Promise((resolve, reject) => {
        let st = new Date().getTime();
        setTimeout(() => {
            let et = new Date().getTime();
            let data = et - st;
            resolve(data);
        },500);
    })
}

async function showSyncTime(){
    let data = await getSyncTime();
    console.log('2:' + data);
}

showSyncTime();