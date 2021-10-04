const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
if(params.theme === "dark"){
    document.getElementById("body").classList.remove('light');
    document.getElementById("body").classList.add('dark');
}else{
    document.getElementById("body").classList.remove('dark');
    document.getElementById("body").classList.add('light');
}

hljs.configure({ ignoreUnescapedHTML: true })
const jar = CodeJar(document.querySelector('#editor'), hljs.highlightElement, { tab: '\t' });
jar.updateCode(`console.log("Hello there!")`)
// https://stackoverflow.com/questions/19846078/how-to-read-from-chromes-console-in-javascript
console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
    return console.logs.join(",")
}
document.querySelector("#exec").onclick = (e)=>{
    e.preventDefault()
    console.logs.length = 0;
    let code = jar.toString()
    try {
        let result = eval(code)
         document.getElementById("output").innerHTML = result
    } catch (error) {
        document.getElementById("output").innerHTML = error
    }
};

