window.onload = function () {
  //canvas init
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //canvas dimensions
  var W;
  var H;
  if (screen.width > 1000) {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
  } else {
      W = screen.width;
      H = screen.height;
      canvas.width = W;
      canvas.height = H;
  }
  //snowflake particles
  var mp = 20; //max particles
  var particles = [];
  for (var i = 0; i < mp; i++)
  {
      particles.push({
          x: Math.random() * W, //x-coordinate
          y: Math.random() * H, //y-coordinate
          r: Math.random() * 4 + 1, //radius
          d: Math.random() * mp //density
      })
  }

  //Lets draw the flakes
  function draw()
  {

      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(250, 250, 250, 0.4)";
      ctx.beginPath();
      for (var i = 0; i < mp; i++)
      {
          var p = particles[i];
          ctx.moveTo(p.x, p.y);
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
  }

  //Function to move the snowflakes
  //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;
  function update()
  {
      angle += 0.01;
      for (var i = 0; i < mp; i++)
      {
          var p = particles[i];
          //Updating X and Y coordinates
          //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
          //Every particle has its own density which can be used to make the downward movement different for each flake
          //Lets make it more random by adding in the radius
          p.y += Math.cos(angle + p.d) + p.r / 2;
          p.x += Math.sin(angle) * 2;

          //Sending flakes back from the top when it exits
          //Lets make it a bit more organic and let flakes enter from the left and right also.
          if (p.x > W + 2 || p.x < -2 || p.y > H)
          {
              if (i % 3 > 0) //66.67% of the flakes
              {
                  particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
              } else
              {
                  //If the flake is exitting from the right
                  if (Math.sin(angle) > 0)
                  {
                      //Enter from the left
                      particles[i] = {x: -2, y: Math.random() * H, r: p.r, d: p.d};
                  } else
                  {
                      //Enter from the right
                      particles[i] = {x: W + 2, y: Math.random() * H, r: p.r, d: p.d};
                  }
              }
          }
      }
  }

  //animation loop
  setInterval(draw, 30);

  // Set random styles
  
  const colors = [
      "#133a88",        // Dark blue
      // "#CE5A57",     // red
    //   "#E1B16A",     // yellow
    //   "#B8B8F3",     // blue
        "#03CEA4",      // bright blue
      "#EAC435"         // bright yellow
    ];


  const elements = document.querySelectorAll('section');
  elements.forEach((e,i) => {
    const color = colors[Math.floor(Math.random()*colors.length)];
    const angle = Math.floor(Math.random() * 360) * 90 - 45;
    // if (i === 4) {
    //     // e.style.background = color;
    //     return;
    // }

    const angles = [
        315,
        0,
        45,
        270,
        0,
        90,
        225,
        180,
        135,
    ]
    // e.style.background = `linear-gradient(${angle}deg, ${color} 0%, rgba(2, 28, 30, 0.5) 100%)`;
    // e.style.animationDelay = `${i*0.5}s`;
    // e.style.border = `16px solid ${color}`;
  })
};