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
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}


function loader() {
    // document.querySelector(".loader").style.display = "none";
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
        duration: 1.5
    });
    tl.from("#navbar", {
        opacity: 0,
        y: 100,
        duration: 1.6,
        delay: 0.5
    });
}


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



// function cursor() {

// function initializeMouseFollower() {
//     Shery.mouseFollower({
//         skew: true,
//         ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//         duration: 1
//     });
// }

// // Function to check screen width and activate/deactivate mouse follower
// function checkScreenSize() {
//     if (window.innerWidth >= 600) {
//         // Only initialize mouse follower if the screen width is 600px or more
//         if (typeof Shery !== 'undefined') {
//             initializeMouseFollower();
//         }
//     } else {

//         if (typeof Shery !== 'undefined' && Shery.mouseFollower) {
//             Shery.mouseFollower.disable(); 
//         }
//     }
// }


// window.addEventListener('load', checkScreenSize);
// window.addEventListener('resize', checkScreenSize);

// Shery.makeMagnet(".nav-part2 h4");

//     var vidCont = document.querySelector(".vid-container video")

//     // vidCont.addEventListener("mouseenter", function () {
//     //     vidCont.addEventListener("mousemove", function (dets) {
//     //         gsap.to(".mousefollower", {
//     //             opacity: 0,
//     //         });

//     //         gsap.to(".page-3-cursor", {
//     //             left: dets.x,
//     //             y: dets.y - 200
//     //         });
//     //     });
//     // });

//     // document.querySelector(".vid-container").addEventListener("mouseleave", function () {
//     //     gsap.to(".mousefollower", {
//     //         opacity: 1
//     //     });

//     //     gsap.to(".page-3-cursor", {
//     //         left: "70%",
//     //         top: "0%"
//     //     })
//     // });


//     vidCont.addEventListener("mouseenter", function () {
//         vidCont.addEventListener("mousemove", function (dets) {
//             if (window.innerWidth >= 600) {  // Only move cursor if screen width is 600px or more
//                 gsap.to(".mousefollower", { opacity: 0 });
//                 gsap.to(page3Cursor, {
//                     left: dets.x,
//                     top: dets.y - 200
//                 });
//             }
//         });
//     });

//     // Mouseleave event for the video container
//     document.querySelector(".vid-container").addEventListener("mouseleave", function () {
//         if (window.innerWidth >= 600) {  // Only reset cursor if screen width is 600px or more
//             gsap.to(".mousefollower", { opacity: 1 });
//             gsap.to(page3Cursor, {
//                 left: "70%",
//                 top: "0%"
//             });
//         }
//     });



//     var flag = 0
//     var video = document.querySelector(".vid-container video  , page-3-cursor")
//     video.addEventListener("click", function () {
//         if (flag == 0) {
//             video.play()
//             document.querySelector(".page-3-cursor").innerHTML = ` <i class="ri-pause-large-fill"></i> `
//             gsap.to(".page-3-cursor", {
//                 scale: 0.5
//             })
//             flag = 1
//         }
//         else {
//             video.pause()
//             document.querySelector(".page-3-cursor").innerHTML = ` <i class="ri-play-large-fill"></i> `
//             gsap.to(".page-3-cursor", {
//                 scale: 1
//             })
//             flag = 0
//         }
//     })
// }

function cursor() {
    // Initialize the mouse follower using Shery
    function initializeMouseFollower() {
        Shery.mouseFollower({
            skew: true,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1
        });
    }

    // Check screen size and activate/deactivate mouse follower based on width
    function checkScreenSize() {
        if (window.innerWidth >= 600) {
            if (typeof Shery !== 'undefined') {
                initializeMouseFollower();
            }
        } else {
            if (typeof Shery !== 'undefined' && Shery.mouseFollower) {
                Shery.mouseFollower.disable();
            }
        }
    }

    // Set up event listeners for load and resize events
    window.addEventListener('load', checkScreenSize);
    window.addEventListener('resize', checkScreenSize);

    // Initialize Shery magnet effect on the specified element
    Shery.makeMagnet(".nav-part2 h4");

    // Select the video element and cursor
    const vidCont = document.querySelector(".vid-container video");
    const page3Cursor = document.querySelector(".page-3-cursor");
    let flag = 0;

    // Function to toggle video play/pause
    function togglePlayPause() {
        if (flag === 0) {
            vidCont.play();
            page3Cursor.innerHTML = `<i class="ri-pause-large-fill"></i>`;
            gsap.to(page3Cursor,
                {
                    scale: 0.5,
                    top: "3%"
                });
            flag = 1;
        } else {
            vidCont.pause();
            page3Cursor.innerHTML = `<i class="ri-play-large-fill"></i>`;
            gsap.to(page3Cursor, {
                scale: 1,
                top: "50%",
                rotate: 360
            });
            flag = 0;
        }
    }

    // Mousemove event to control cursor position, with screen width check
    vidCont.addEventListener("mousemove", function (dets) {
        if (window.innerWidth >= 600) {  // Only move cursor if screen width is 600px or more
            gsap.to(".mousefollower", { opacity: 0 });
            gsap.to(page3Cursor, {
                left: dets.x,
                top: dets.y - 200
            });
        }
    });

    // Mouseleave event for the video container
    document.querySelector(".vid-container").addEventListener("mouseleave", function () {
        if (window.innerWidth >= 600) {  // Only reset cursor if screen width is 600px or more
            gsap.to(".mousefollower", { opacity: 1 });
            gsap.to(page3Cursor, {
                left: "70%",
                top: "0%"
            });
        }
    });

    // Click events for both the video and page-3-cursor to toggle play/pause
    vidCont.addEventListener("click", togglePlayPause);
    page3Cursor.addEventListener("click", togglePlayPause);
}


function flag() {

    document.addEventListener('mousemove', function (dts) {
        gsap.to("#Flag", {
            x: dts.x,
            y: dts.y,
        })
    })

    document.querySelector("#hero3").addEventListener("mouseenter", function () {
        gsap.to("#Flag", {
            opacity: 1
        })
    })

    document.querySelector("#hero3").addEventListener("mouseleave", function () {
        gsap.to("#Flag", {
            opacity: 0
        })
    })

}

locomotiveAnimation();
loader();
page1();
cursor();
flag();


function sa() {
    Shery.imageEffect(".image-div", {
        style: 5,
        gooey: true
    })
}
sa()


