function loader() {
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
                    clearInterval(setInterval)
                }
            }, 35)
        }
    })
    tl.to(".line h3 ", {
        opacity: 1,
        animationName: "anime"
    })

    tl.to(".loader", {
        opacity: 0,
        duration: 0.4,
        delay: 3.5,
        onComplete: function () {
            document.querySelector(".loader").style.display = "none";
<<<<<<< HEAD
            document.querySelector(".page1").style.display = "block"; // Show Page 1
=======
<<<<<<< HEAD
            document.querySelector(".page1").style.display = "block"; // Show Page 1
=======
            document.querySelector(".page1").style.display = "block"; 
>>>>>>> f7de177 (completed till Page 4)
>>>>>>> 70ab65f (p)
            page1();
        }
    })

    tl.from(".page1", {
        y: 1000,
        opacity: 0,
        ease: "power2.out",
        duration: 0.2,
    })
    tl.from("#navbar", {
        opacity: 0,
        y: 100,
        duration: 2,
        delay: 0.5
    })
}
<<<<<<< HEAD
loader();
// document.querySelector(".loader").style.display = "none";
=======
<<<<<<< HEAD
loader();
// document.querySelector(".loader").style.display = "none";
=======
// loader();
document.querySelector(".loader").style.display = "none";
>>>>>>> f7de177 (completed till Page 4)
>>>>>>> 70ab65f (p)

function page1() {

    tl = gsap.timeline();

    tl.from(".hero-line h2", {
        y: 1500,
        opacity: 0,
        duration: 2,
        stagger: 0.2
    })

}
page1();

function cursor() {

    document.addEventListener("mousemove", function (data) {
        // console.log(data.clientX)
        gsap.to("#cursor", {
            left: data.x,
            top: data.y,
        }
        )
    })
    Shery.makeMagnet(".nav-part2 h4");
}
cursor();


