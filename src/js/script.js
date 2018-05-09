import { BASE_DIR } from '../constants.yml';
import axios from 'axios';

//---------------------------------------
// Events
//---------------------------------------
// 進むボタンクリック
document.querySelector('.content--next').addEventListener('click', (evt) => {
    const targetPageUrl = evt.target.getAttribute("data-href");
    pushState(targetPageUrl);
    pageChange(targetPageUrl);
});

// 戻るボタンクリック
document.querySelector('.content--back').addEventListener('click', (evt) => {
    const targetPageUrl = evt.target.getAttribute("data-href");
    pushState(targetPageUrl);
    pageChange(targetPageUrl);
});

// popstate
if (window.history && window.history.pushState){
    window.addEventListener("popstate", (event) => {
        console.log(event);
        if (!event.state.targetPageUrl) return;
        const state = event.state.targetPageUrl;
        pushState(state);
        pageChange(state);
    });
}


//---------------------------------------
// function
//---------------------------------------
// pushState(履歴追加)
function pushState(url){
    const pageId = url.split(".")[0];
    const state = { "targetPageUrl" : url };
    history.pushState(state, pageId, url);
}
// ページ切り替え演出
function pageChange(url) {
    // 既存の差し込み要素の操作
    const curLoadList =  document.querySelectorAll(".load");
    for(let elm of curLoadList){
        elm.classList.add("out");
    }
    // 読み込み
    axios.get(url, {
        responseType: 'document'
    })
    .then((response) => {
        const page = response.data;
        // 差し込み用に要素追加
        const wrapper = document.querySelector("#loadwrapper");
        const newElmList = page.querySelectorAll((".load"));
        for(let elm of newElmList){
            wrapper.appendChild(elm);
        }
        return;
    })
    .then(() => {
        // 差し替え
        const outDomList = document.querySelectorAll(".out");
        for(let elm of outDomList){
            elm.parentNode.removeChild(elm);
        }
    })
}
// aタグの遷移防止
function preventLinkEvent(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
}