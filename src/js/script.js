import { BASE_DIR } from '../constants.yml';
import $ from 'jquery';


document.querySelector('.content--back').addEventListener('click', (evt) => {
    pushState();
    pageChange();
});

//---------------------------------------
// Events
//---------------------------------------
// 進むボタンクリック
document.querySelector('.content--next').addEventListener('click', (evt) => {
    // 遷移ボタンがaタグの場合はリンク遷移取り消し
    preventLinkEvent(evt);
});

// 戻るボタンクリック
document.querySelector('.content--back').addEventListener('click', (evt) => {
    // 遷移ボタンがaタグの場合はリンク遷移取り消し
    preventLinkEvent(evt);
});

// popstate
if (window.history && window.history.pushState){
    window.addEventListener("popstate", (event) => {
        if (!event.originalEvent.state) return;
        const state = event.originalEvent.state;
    });
}


//---------------------------------------
// function
//---------------------------------------
// pushState操作
function pushState(){
    const targetPageUrl = evt.target.getAttribute("href");
    const pageId = targetPageUrl.split(".")[0];
    const state = {"targetPageUrl": targetPageUrl};
    history.pushState(state, pageId, targetPageUrl);
}
// ページ切り替え演出
function pageChange(url) {
    // 必要なところをロード
    $("#wrapper").on('load',"#loadimg", ()=> {
        
    })

    // 切り替え演出
    document.querySelector('.content').classList.add('fadeout');
}
// aタグの遷移防止
function preventLinkEvent(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
}