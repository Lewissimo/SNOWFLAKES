
    (function(){ 
        
        
    
    // Declarations of main variables
    max_size = 2;  
    min_size = 0.3;
    falling_down_size = 90; //distance to travel by the snowflake
    step = 3;  //speed of falling down
    speed = 10; //speed of creating new snowflakes  ---  interval 0 - 10
    var currentClientX;
    var currentClientY; 
    
    
    //extension of a built-in object with simple function which that allows us get random number from interval
    Math.randMinMax = function(min, max){
        return Math.random() * (max - min) + min;
    }
    
    //getting current mouse positiong with addEventListener
    window.addEventListener("mousemove", function(e){
        
        currentClientX = e.clientX;
        currentClientY = e.clientY;
    }, false)



    //Every single snowflake is a single object of class snowflake
    class snowflake{

        //constructos allows us set posision of snowflake which is same us posision of mouse cursor
        //size of snowflake is generated automatically from the given interval
        constructor(Y_coordinate, X_coordinate){
            this.X_coordinate = X_coordinate;
            this.Y_coordinate = Y_coordinate;
            this.size = Math.randMinMax(min_size, max_size);

        }
        
        //function reponsible for creating flake and animate it to falling down
        createFlake() {

            //every single flake is new single div
            //creating div destined to be a snowflake
            let dv = document.createElement('div');

            //adding div to body element
            let snowFlake = document.body.appendChild(dv);

            //adding style class which provide basic style params
            snowFlake.classList.add("snowFlake");
            //setting size of snowflake
            snowFlake.style.width = this.size + 'px';
            snowFlake.style.height = this.size + 'px';
            //setting posision of snowflake
            snowFlake.style.top = this.Y_coordinate + 'px';
            snowFlake.style.left =  this.X_coordinate + 'px';
            
            //variable used for manipulate the distance which snowflake should travel
            let steps = falling_down_size;
            //size of one sigle step of animation
            var crStep = Math.randMinMax(step-1, step+1);
            let _step = crStep;
            var step_rot_x = Math.randMinMax(step, -step);
            let _step_rot_x = step_rot_x;
            //function which is responsible for set animation of falling down
            var rot_x;
            function falling_down(){
                
                if(steps == falling_down_size - 10){
                    rot_x = _step_rot_x;    
                }

                if(steps > falling_down_size - 10){
                    dv.style.transform = "translateY(" + _step + "px) translateX(" + _step_rot_x + "px)";
                }
                else{
                    dv.style.transform = "translateY(" + _step + "px) translateX(" + rot_x + "px)";
                }
                
                _step_rot_x += step_rot_x;
                _step += crStep;
                --steps;
                (steps > 0)?requestAnimationFrame(falling_down):dv.remove();
            }
            falling_down();
        }
    }

    _speed = speed;

    //calling a function to animate falling snow
    (
    function animation_of_snowing(){
        //if currentClientX and currentClientY are set and bigger than 10 (this condition is helpfull to not creating unnecessairly snowflakes divs)
        //execute another set of condition which ensure exact set speed
        if((currentClientX && currentClientY)&&((currentClientX > 10)&&(currentClientY > 10))){
            if(_speed == 10){
                var snowFlake = new snowflake(currentClientY, currentClientX);
                snowFlake.createFlake();
                _speed = speed;
            }
            else{
                ++_speed;
            }
        }
        requestAnimationFrame(animation_of_snowing);
    }
    )();


   })();