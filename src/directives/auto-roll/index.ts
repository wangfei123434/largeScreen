export default {
    name:'autoRoll',
    updated: function (el:HTMLElement, {value=[]}) {
        if (value.length==0){
            return
        }
        //开始定时
        const startTimer =()=>{
            clearInterval(el.timerId);
            el.timerId=setInterval(()=>{
                el.style.marginTop = '-30px'
                el.classList.add('roll-animate');
                setTimeout(()=>{
                    value.push(value[0])
                    value.shift();
                    el.style.marginTop = '0px'
                    el.classList.remove('roll-animate');
                    console.log('el.classList',el.classList)
                },1000)
            },1000)
        }

        el.addEventListener('mouseleave',()=>{
            clearInterval(el.timerId);
        })

        el.addEventListener('mouseenter',()=>{
            startTimer()
        })

        startTimer()

        console.log(value)
        console.log('updated: function (el:HTMLElement)',el)
    }
}
