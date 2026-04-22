// ─────────────────────────────────────────────
//  POPUP CONTENT
//  Change the popup images and text here.
//  The id must match data-popup-id in HTML.
// ─────────────────────────────────────────────
var popupData = {
  groundbeef: {
    img: "mainimage/cow.avif",
    alt: "Ground Beef",
    text: "Ground beef comes from cuts like chuck, round, sirloin, and brisket. Mine was 85% lean, 15% fat. Did this cow roam free on grass or live on grain feed? No idea. I just know it was a lot of meat for a good price."
  },
  mirepoix: {
    img: "mainimage/Mirepoix.avif",
    alt: "Mirepoix",
    text: "Look, if you made me eat just carrots and celery on their own, I'd probably hate it. So why does it taste so good when they're all mixed together? I think it's because they melt into the meat and lose their shape. They're sort of there but not really. Honestly, they shine the most when you don't even realize you're eating them."
  },
  tomatopaste: {
    img: "mainimage/tomato.avif",
    alt: "Tomato Paste",
    text: "That intense red! I heard traditional tomato paste is dried under the sun. But let's be real, the one I'm using probably came out of a factory."
  },
  flour: {
    img: "mainimage/Flourtexture.avif",
    alt: "Flour",
    text: "Could've been bread. Guess you weren't that lucky."
  },
  chickenbroth: {
    img: "mainimage/chicken.avif",
    alt: "Chicken Broth",
    text: "Sometimes I wonder why it's even needed. Other times, it's the best seasoning ever. Truth is, I used Chinese style chicken stock. So maybe my cottage pie has a hint of wonton soup in there. Who knows."
  },
  peeler: {
    img: "mainimage/peeled potato.avif",
    alt: "Peeler",
    text: "Almost lost a hand in the process, but I made it through peeling the potatoes. What a blessing."
  },
  masher: {
    img: "mainimage/mashedtexture.avif",
    alt: "Masher",
    text: "Make sure to cook your potatoes all the way through. It's better for you. But honestly, as long as you have a masher, anyone can make the best mashed potatoes in the world."
  },
  garlic: {
    img: "mainimage/garlicp.avif",
    alt: "galic",
    text: "Honestly, one of the best powders out there. I don't know what I'd do without it. It's basically a foundation of everything I cook. So... Garlic?"
  },
  butter: {
    img: "mainimage/buttwet.avif",
    alt: "butter",
    text: "You can never have too much butter. And cream, too."
  },
  eggs: {
    img: "starterimage/eggs.avif",
    alt: "eggs",
    text: "Does using different colored eggs change the taste?"
  },
  bacon: {
    img: "starterimage/pig.avif",
    alt: "bacon",
    text: "Pigs are smarter than dogs and can be trained to play video games. They also have excellent long-term memory and can remember things for years. So yeah, they'd probably remember if you didn't share your snacks."
  }
};
// ─────────────────────────────────────────────


document.addEventListener('DOMContentLoaded', function() {
  var menuTrigger = document.querySelector('.js-menu-trigger');
  if (menuTrigger) {
    menuTrigger.addEventListener('click', function() {
      document.body.classList.toggle('show-menu');
    });
  }

  // Spoon parabolic hit (index.html only)
  var spoon = document.getElementById('spoon');
  var siteTitle = document.getElementById('siteTitle');
  if (spoon && siteTitle) {
    var isAnimating = false;

    spoon.addEventListener('click', function() {
      if (isAnimating) return;
      isAnimating = true;

      var spoonRect = spoon.getBoundingClientRect();
      var titleRect = siteTitle.getBoundingClientRect();

      // Distance from spoon center to title center
      var dx = (titleRect.left + titleRect.width / 2) - (spoonRect.left + spoonRect.width / 2);

      // Parabolic trajectory keyframes
      var keyframes = [
        { transform: 'translate(0px, 0px) rotate(-20deg)',                          offset: 0    },
        { transform: 'translate(-18px, -90px) rotate(-75deg)',                      offset: 0.22 },
        { transform: 'translate(' + (dx * 0.4) + 'px, -65px) rotate(-25deg)',      offset: 0.47 },
        { transform: 'translate(' + dx + 'px, 0px) rotate(28deg)',                  offset: 0.65 }, // collision
        { transform: 'translate(' + (dx * 0.72) + 'px, -28px) rotate(8deg)',       offset: 0.78 },
        { transform: 'translate(' + (dx * 0.18) + 'px, -10px) rotate(-14deg)',     offset: 0.91 },
        { transform: 'translate(0px, 0px) rotate(-20deg)',                          offset: 1    }
      ];

      var duration = 780;
      var hitTime = duration * 0.65; // collision point

      var anim = spoon.animate(keyframes, {
        duration: duration,
        easing: 'ease-in-out'
      });

      // Start pudding wobble at collision point
      setTimeout(function() {
        siteTitle.classList.add('wobbling');
      }, hitTime);

      anim.addEventListener('finish', function() {
        isAnimating = false;
      });

      siteTitle.addEventListener('animationend', function() {
        siteTitle.classList.remove('wobbling');
      }, { once: true });
    });
  }

  // Popup logic
  var overlay   = document.getElementById('popupOverlay');
  var popupImg  = document.getElementById('popupImg');
  var popupText = document.getElementById('popupText');
  var closeBtn  = document.getElementById('popupClose');

  document.querySelectorAll('[data-popup-id]').forEach(function(container) {
    container.addEventListener('click', function() {
      var data = popupData[container.dataset.popupId];
      if (!data || !overlay) return;
      popupImg.src = data.img;
      popupImg.alt = data.alt;
      popupText.textContent = data.text;
      overlay.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function() { overlay.classList.remove('active'); });
  }
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }
});
