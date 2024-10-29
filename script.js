var tl = gsap.timeline();

tl.from(".line h2", {
    y: 150,
    opacity: 0,
    delay: 0.5,
    duration: 0.6,
    stagger: 0.3
})

// timer and NOW text
tl.from("#line1-part1 , .line h3 ", {
    opacity: 0,
    duration: 0.3,
    stagger: 0.2,
    onStart: function () {
        var h5Timer = document.querySelector("#line1-part1 h5");
        var grow = 0;

        setInterval(function () {
            if (grow < 100) {
                h5Timer.innerHTML = grow++;
            }
            else {
                h5Timer.innerHTML = grow
            }
        }, 35)
    }
})
tl.to(".line h3 ",{
    opacity:1,
    animationName:"anime"
})

tl.to(".loader", {
    opacity: 0,
    duration: 0.4,
    delay: 3.5,
    onComplete: function () {
        document.querySelector(".loader").style.display = "none";
    }
})

tl.from(".page1", {
    y: 1600,
    opacity: 0,
    duration: 0.5,
})



