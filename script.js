function locomotiveAnimation() {

    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotiveAnimation();

function loader() {
    document.querySelector(".loader").style.display = "none";
    var tl = gsap.timeline();

    tl.from(".line h2", {
        y: 150,
        opacity: 0,
        delay: 0.5,
        duration: 0.6,
        stagger: 0.3
    });

    tl.from("#line1-part1 , .line h3", {
        opacity: 0,
        duration: 0.3,
        stagger: 0.2,
        onStart: function () {
            var h5Timer = document.querySelector("#line1-part1 h5");
            var grow = 0;
            setInterval(function () {
                if (grow < 100) {
                    h5Timer.innerHTML = grow++;
                } else {
                    h5Timer.innerHTML = grow;
                    clearInterval(setInterval);
                }
            }, 30);
        }
    });

    tl.to(".line h3", {
        opacity: 1,
        animationName: "animeh3"
    });

    tl.to(".loader", {
        opacity: 0,
        duration: 0.4,
        delay: 3.2,
        onComplete: function () {
            document.querySelector(".loader").style.display = "none";
            document.querySelector(".page1").style.display = "block";
            page1();
        }
    });

    tl.from(".page1", {
        y: 1000,
        opacity: 0,
        ease: "power2.out",
        duration: 0.2,
    });
    tl.from("#navbar", {
        opacity: 0,
        y: 100,
        duration: 1.6,
        delay: 0.5
    });
}

loader();

function page1() {
    var tl = gsap.timeline();
    tl.from(".hero-line h2", {
        y: 1500,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        onComplete: function () {
            document.querySelector(".page3").style.display = "block";
        }
    });
}

page1();

function cursor() {
    document.addEventListener("mousemove", function (data) {
        gsap.to("#cursor", {
            left: data.x,
            top: data.y,
        });
    });
    Shery.makeMagnet(".nav-part2 h4");
}

cursor();
