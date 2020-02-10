// 挑战一、AJAX 加载CSS
getCSS.onclick = () => {
  // AJAX剑谱
  // 1.创建XMLHttpRequest对象
  const request = new XMLHttpRequest();
  // 2.用GET方法请求url
  request.open("GET", "/style.css"); // readyState = 1
  // 3.监听这个对象的onload事件和onerror事件，并处理它的response
  // 专业前端监听onreadystatechange
  request.onreadystatechange = () => {
    console.log(request.readyState);
    // 下载完成时渲染
    if (request.readyState === 4) {
      console.log("下载完成了");
      if (request.status >= 200 && request.status < 300) {
        const style = document.createElement("style");
        style.innerHTML = request.response;
        document.head.appendChild(style);
      } else {
        alert("加载CSS失败");
      }
    }
  };
  //   request.onload = () => {};
  //   request.onerror = () => {};

  // 4.调用对象的send方法
  request.send(); // readyState = 2
};

// 挑战二、AJAX 加载js
getJS.onclick = () => {
  const request2 = new XMLHttpRequest();
  request2.open("GET", "/2.js");
  request2.onload = () => {
    const res = document.createElement("script");
    res.innerHTML = request2.response;
    document.body.appendChild(res);
  };
  request2.onerror = () => {};
  request2.send();
};

// 挑战三、AJAX 请求HTML
getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/3.html");
  request.onload = () => {
    const div = document.createElement("div");
    div.innerHTML = request.response;
    document.body.appendChild(div);
  };
  request.onerror = () => {};
  request.send();
};

// 挑战四、AJAX 加载XML
getXML.onclick = () => {
  const req = new XMLHttpRequest();
  req.open("GET", "/4.xml");
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status >= 200 && req.status < 300) {
      console.log(req.responseXML);
      const dom = req.responseXML; // req.responseXML 是一个对象
      const text = dom.getElementsByTagName("warning")[0].textContent;
      console.log(text.trim());
    }
  };
  req.send();
};

// 挑战五、AJAX 加载JSON
getJSON.onclick = () => {
  const req = new XMLHttpRequest();
  req.open("GET", "/5.json");
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      const obj = JSON.parse(req.response); // JSON数据转成JS数据
      myName.textContent = obj.name;
    }
  };
  req.send();
};

// 挑战六、分页
let n = 1;
nextPage.onclick = () => {
  const req = new XMLHttpRequest();
  req.open("GET", `page${n + 1}`);
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      const array = JSON.parse(req.response); // 解析JSON为JS数组
      // JS 数组遍历，得到每项的id，作为li的内容，添加到id为xxx的ul里
      array.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.id;
        xxx.appendChild(li);
      });
    }
  };
  req.send();
  // 每点击一次下一页，n+=1
  n += 1;
};
