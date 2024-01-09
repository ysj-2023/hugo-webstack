/*搜索功能实现*/
document.getElementById('search-input').addEventListener('input', function() {  
    var keyword = this.value.toLowerCase(); // 将关键词转换为小写，便于匹配时不区分大小写   
    if (keyword.trim() === '') { // 检查keyword是否为空或只包含空格  
        var resultsList = document.getElementById('search-results');  
        resultsList.innerHTML = '';  // 清空结果列表  
        return;  
    }  
    var xCards = document.getElementsByClassName('xe-card');  
    var results = []; // 存储匹配结果的数组 
    
    for (var i = 0; i < xCards.length; i++) {  
        var cardLink = xCards[i].querySelector('a');  
        // 获取a标签中class为overflowClip_1、2的文本内容
        var clipContent = cardLink.querySelector('.overflowClip_1').textContent + "- " + cardLink.querySelector('.overflowClip_2').textContent;
        // 获取a标签中img标签的data-src属性值
        var imgSrc = cardLink.querySelector('img').getAttribute('data-src'); 
        if (cardLink) {  
            var cardText = cardLink.textContent.toLowerCase();  
            if (cardText.indexOf(keyword) !== -1) {  // 检查是否包含关键词
                // 将匹配到的a标签的需要用到的内容 添加到结果数组中   
                results.push({  
                    href: cardLink.href,  
                    text: clipContent,
                    img: imgSrc
                });  
            }  
        }  
    }  
    
    var resultsList = document.getElementById('search-results');  
    resultsList.innerHTML = '';  //初始化搜索结果列表
    if (results.length > 0) {  
        for (var j = 0; j < results.length; j++) {  
            var listItem = document.createElement('li');  
            // 加一个i标签用于显示logo
            var newIcon = document.createElement('i');
            var img = document.createElement('img');  
            img.src = results[j].img;
            
            img.classList.add('lazy');
            img.setAttribute('onerror', "javascript:this.src='/images/favicon.png'");
            newIcon.appendChild(img);
            // 添加a标签
            var newLink = document.createElement('a');  
            newLink.href = results[j].href;  
            newLink.textContent = results[j].text; 
            newLink.target = "_blank";
            // 将新增元素加入到搜索结果列表
            listItem.appendChild(newIcon);
            listItem.appendChild(newLink);  
            resultsList.appendChild(listItem);  
        }  
    } else {  
        resultsList.textContent = '没有找到匹配的内容。';  
    }  
});        

/*搜索按钮：打开搜索框*/
document.getElementById('search-btn').addEventListener('click', function() {  
    var searchBox = document.getElementById('overlay');  
    if (searchBox.style.display === 'none') {  
    searchBox.style.display = 'block';
    var inputElement = document.getElementById('search-input');  
    inputElement.focus(); 
    } else {  
    searchBox.style.display = 'none';
    }  
});
/*Ctrl+F：打开搜索框*/
document.addEventListener('keydown', function(event) { 
    var searchBox = document.getElementById('overlay');
    var inputElement = document.getElementById('search-input');  
    if (event.ctrlKey && event.key === 'f') { // CTRL+F  
        if (searchBox.style.display === 'none') {               
            searchBox.style.display = 'block';
            inputElement.focus();
            event.preventDefault(); // 阻止默认行为 
        }else{
            searchBox.style.display = 'none';
            event.preventDefault();
        }
    }  
});

/*点击空白处：关闭搜索框*/
document.getElementById('overlay').addEventListener('click', function(event) {  
    var searchBox = document.getElementById('overlay');
    var searchBox = document.getElementById('search-box');  
        if (!searchBox.contains(event.target)) { // 点击的不是search-box本身或其子元素  
        this.style.display = 'none'; // 将overlay的display值设为none  
        }  
});

/*键盘事件：结果列表选择*/        
var input = document.getElementById("search-input");
var results = document.getElementById("search-results");
var items = results.getElementsByTagName("li");
var index = -1; // 当前选中的索引
document.addEventListener("keydown", function (event) {
    var height = items[0].offsetHeight; // 每个li的高度
    var visible = Math.floor(results.clientHeight / height); // 可视区域内能显示的li的个数
    // 如果按下上箭头
    if (event.key === 'ArrowUp') {
        // 如果当前没有选中任何项，或者已经选中第一项，就选中最后一项
        if (index == -1 || index == 0) {
            index = items.length - 1;
        } else {
            // 否则，选中上一项
            index--;
        }
        // 遍历所有的项，给选中的项添加高亮样式，其他项移除高亮样式
        for (var i = 0; i < items.length; i++) {
            if (i == index) {
                items[i].classList.add("highlight");
                // 滚动到选中的项的位置
                items[i].scrollIntoView();
            } else {
                items[i].classList.remove("highlight");
            }
        }
    }
    // 如果按下下箭头
    if (event.key === 'ArrowDown') {
        if (index == -1 || index == items.length - 1) {
            index = 0;
        } else {
            // 否则，选中下一项
            index++;
        }
        // 遍历所有的项，给选中的项添加高亮样式，其他项移除高亮样式
        for (var i = 0; i < items.length; i++) {
            if (i == index) {
                items[i].classList.add("highlight");
                // 如果选中的项在可视区域的第一个或者最后一个，就滚动到选中的项的位置
                if (i % visible == 0 || i % visible == visible - 1) {
                    // 滚动到选中的项的位置
                    items[i].scrollIntoView();
                }
            } else {
                items[i].classList.remove("highlight");
            }
        }
    }
    // 如果按下回车键
    if (event.key === 'Enter') {
        // 如果当前有选中的项，就触发该项的链接的点击事件
        if (index != -1) {
            var link = items[index].getElementsByTagName("a")[0];
            link.click();
        }
    }
});