var canvas = document.getElementById("Canvas");
		var ctx = canvas.getContext("2d");

		var r = Math.floor((Math.random() * 255) + 1);
		var g = Math.floor((Math.random() * 255) + 1);
		var b = Math.floor((Math.random() * 255) + 1);
		var color = 0;
		var Load = 0;

		// Sets x and y to the width of the canvas / 2 and the hight of the canvas - 30
		var x = canvas.width / 2;
		var y = canvas.height - 30;

		// Bullet Speed
		var b = .5;
		
		// Gun Stuff
		var slot = 0;
		var shot = 0;
		
		// Character size and position variables
		var characterHeight = 25;
		var characterWidth = 25;
		var characterX = (canvas.width-characterWidth) / 2;
		var characterY = (canvas.height-characterHeight) / 2;

		// Door Variables
		var doorWidth = characterWidth;
		var doorHeight = characterHeight + 50;
		var doorX = canvas.width - doorWidth;
		var doorY = (canvas.height - doorHeight) / 2;

		// Character movement speed
		var characterS = 5;

		// Character bullet variables
		var bulletX = characterX + 12;
		var bulletY = characterY + 12;
		var bulletRadius = 10;

		// Random number generated variables
		var enemyPosX = Math.floor((Math.random() * 1000) + 1);
		var enemyPosY = Math.floor((Math.random() * 900) + 1);

		// Enemy size and position variables
		var enemyHeight = 45;
		var enemyWidth = 45;
		var enemyX = enemyPosX - enemyWidth;
		var enemyY = enemyPosY - enemyHeight;

		//If keys are pressed variables
		var wPressed = false; 		//87
		var sPressed = false; 		//83
		var dPressed = false; 		//68
		var aPressed = false; 		//65
		
		var twoPressed = false;		//50
		var onePressed = true;		//49
		
		var downPressed = false; 	//40
		var rightPressed = false; 	//39
		var upPressed = false; 		//38
		var leftPressed = false; 	//37
		
		var spacePressed = false;	//32

		// Score and Lives variables
		var score = 0;
		var lives = 1;
		var health = 5;
		var enemyHealth = 3;

		
	
		
		
		
		
		
		
		// Allows the program to "listen" for a key to be pressed and not pressed
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);

		/* Mouse Movement
			function mouseMoveHandler(e) {
					var relativeX = e.clientX - canvas.offsetLeft;
			var relativeY = e.clientY - canvas.offsetTop;

					if(relativeX > 0 && relativeX < canvas.width) {
							paddleX = relativeX - paddleWidth/2;
					}
			if (relativeY > 0 && relativeY < canvas.height) {
				paddleY = relativeY - paddleHeight/2;
			}
			}
		*/

	    function drawTitle() {
			ctx.font = "180px Times New Roman";
			ctx.fillStyle = ["rgb(",r,",",g,",",b,")"].join("");
			ctx.fillText("MÛN", (canvas.width / 2) - 200, (canvas.height / 2) - 25);
		}

		function drawTitleDir() {
			ctx.font = "48px Times New Roman";
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText("Press space to start", (canvas.width / 2) - 175, (canvas.height / 2) + 25);
		}                        
                                   
		//Makes sure that if a certain key is pressed to set it to true
		function keyDownHandler(e) {
			if(e.keyCode == 87) {  
				wPressed = true;   
				collisionDetection();
			} else if(e.keyCode == 83) {
				sPressed = true;   
				collisionDetection();
			} else if(e.keyCode == 68) {
				dPressed = true;   
				collisionDetection();
			} else if(e.keyCode == 65) {
				aPressed = true;   
				collisionDetection();
			} else if(e.keyCode == 50) {
				twoPressed = true;
			} else if(e.keyCode == 49) {
				onePressed = true;
			} else if(e.keyCode == 40) {
				downPressed = true;
				collisionDetection();
			} else if(e.keyCode == 39) {
				rightPressed = true;
				collisionDetection();
			} else if(e.keyCode == 38) {
				upPressed = true;  
				collisionDetection();
			} else if(e.keyCode == 37) {
				leftPressed = true;
				collisionDetection();
			} else if(e.keyCode == 32) {
				spacePressed = true;
			}                      
		}                          
                                   
		//Sets the key to false when not pressed
		function keyUpHandler(e) { 
			if(e.keyCode == 87) {  
				wPressed = false;  
				collisionDetection();
			} else if(e.keyCode == 83) {
				sPressed = false;  
				collisionDetection();
			} else if(e.keyCode == 68) {
				dPressed = false;  
				collisionDetection();
			} else if(e.keyCode == 65) {
				aPressed = false;  
				collisionDetection();
			} else if(e.keyCode == 50) {
				twoPressed = false;
			} else if(e.keyCode == 49) {
				onePressed = false;
			} else if(e.keyCode == 32) {
				spacePressed = false;
			}                      
		}                          
                                   
		function gameStart() {     
			if(spacePressed) {     
				Load++;            
			}                      
			if(Load == 0) {        
				requestAnimationFrame(draw);
			} else if(Load == 1) { 
				requestAnimationFrame(draw2);
			}                      
		}

		function swap() {
			if(onePressed) {
				if(slot == 0) {
					slot++;
				} else if(slot == 1) {
					slot = slot;
				}
			} else if(twoPressed) {
				if(slot == 1) {
					slot--;
				} else if(slot == 0) {
					slot = slot;
				}
			}
			
			if(slot == 0) {
				return 0;
			} else if(slot == 1) {
				return 1;
			}
		}
                                   
		// Collision Detection     
		// Tests to see if a player hits an enemy
		function collisionDetection() {
		// Ends game if lives and health = 0
			if(lives == 0 && health == 0) {
				alert("GAME OVER");
				document.location.reload();
			// As long as health doesn't = 0 it will run this for if the caracter gets hit
			} else if(health != 0) {
				if(characterX  < enemyX + enemyWidth && characterX + characterWidth > enemyX && characterY < enemyY + enemyHeight && characterHeight + characterY > enemyY) {
					// If character gets hit it suptracts one from the health and knocks the character back 50px up and to the left
					health--;      
					characterX -= 50;
					characterY -= 50;
                                   
					/* Suppose to detect if the knockback will hit a wall and if so will calculate accordingly. Doesn't work so far.
					if((characterY + 50) == canvas.height && (characterX + 50) == canvas.width) {
						characterX -= 50;
						characterY -= 50;
					} else if(characterY - 50) == (canvas.height - 900) && (characterX - 50) == (canvas.width - 1000) {
						characterX += 50;
						characterY += 50;
					}else if(characterY - 50 == canvas.height - 900) && (characterX + 50) == canvas.width) {
						characterX -= 50;
						characterY += 50;
					} else {       
						characterX += 50;
						characterY -= 50;
					}              
					*/             
				}                  
                                   
			// If health = 0 this will take away one life, put your health back to whatever amount, and put you back into the middle of the room
			} else if(health == 0) {
				lives--;           
				health = 5;        
				characterX = (canvas.width - characterWidth) / 2;
				characterY = (canvas.height - characterHeight) / 2;
			}                      
                                   
			if(enemyHealth == 0) { 
				score += 50;       
				enemyHealth = 3;   
				enemyX = Math.floor((Math.random() * 1000) + 1);
				enemyY = Math.floor((Math.random() * 900) + 1);
			} else if(bulletX + (bulletRadius) >= (enemyX + enemyWidth) - 5 && bulletX + (bulletRadius) <= (enemyX + enemyWidth) + 5 || bulletY + (bulletRadius) >= (enemyY + enemyHeight) - 5 && bulletY + (bulletRadius) <= (enemyY + enemyHeight) + 5) {
				enemyHealth--;     
			}                      
		}                          
        
		function openDoor(){
			if(characterX  < doorX + doorWidth && characterX + characterWidth > doorX && characterY < doorY + doorHeight && characterHeight + characterY > doorY) {      
					characterX = 25;
					characterY = 25;
		}
		}
                                   
		function drawEnemy() {     
			ctx.beginPath();       
				ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
			ctx.fillStyle = "#000000";
				ctx.fill();   				
				ctx.closePath(); 
			for(x=0; x<7; x++)
			{
				enemyX = enemyX+5;
			}
			for(x=0; x<7; x++)
			{
				enemyX = enemyX-5;
			}
		}                          
                                   
		function drawCharacter() { 
			 ctx.beginPath();      
			 ctx.rect(characterX, characterY, characterWidth, characterHeight);
			 ctx.fillStyle = "#0095DD";
			 ctx.fill();           
			 ctx.closePath();      
		}

		function titleBackground() {
			ctx.beginPath();
			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#000000";
			ctx.fill();
			ctx.closePath();
		}
                                   
		function drawLives() {     
			ctx.font = "16px Arial";
				ctx.fillStyle = "#0095DD";
				ctx.fillText("Lives: "+lives, canvas.width-75, 20);
		}                          
                                   
		function drawHealth() {    
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText("Health: " + health, canvas.width - 75, 40);
		}                          
                                   
		function drawScore() {     
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText("Score: " + score, canvas.width - 975, 20);
		}                          
                                   
		function drawEnemyHealth() {
			ctx.font = "10px Arial";
			ctx.fillStyle = "#FF0000";
			ctx.fillText("HP: " + enemyHealth, enemyX, enemyY - 5);
		}             

		function testVariableNums() {
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText("Shot: " + shot, canvas.width - 975, 40)
		}
                                   
		function drawDoor() {      
			ctx.beginPath();       
			ctx.rect(doorX, doorY, doorWidth, doorHeight);
			ctx.fillStyle = "#84FFF1";
			ctx.fill();            
			ctx.closePath();       
		}                          
                                   
		function drawPistolBullet() {    
			ctx.beginPath();       
			ctx.arc(bulletX, bulletY, bulletRadius, 0, Math.PI*2);
			ctx.fillStyle = "#FF0000";
			ctx.fill();            
			ctx.closePath();       
		}
		
		function testVariableNums() {
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText("Swap:" + swap(), canvas.width - 975, 40);
		}

		function drawShotgunBullet() {
			ctx.beginPath();
			ctx.arc(bulletX - 22 + (characterWidth / 2), bulletY - 15, bulletRadius, 0, Math.PI*2);
			ctx.fillStyle = "#FF0000";
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.arc(bulletX + 3 + (characterWidth / 2), bulletY, bulletRadius, 0, Math.PI*2);
			ctx.fillStyle = "#FF0000";
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.arc(bulletX - 22 + (characterWidth / 2), bulletY + 15, bulletRadius, 0, Math.PI*2);
			ctx.fillStyle = "#FF0000";
			ctx.fill();
			ctx.closePath();
		}
		
		function drawLevelOneBackground() {
			ctx.beginPath();
			
			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#969696";
			ctx.fill();
			
			// Center Up/Down
			ctx.moveTo(canvas.width / 2, 0);
			ctx.lineTo(canvas.width /2, canvas.height);
			ctx.stroke();
			
			ctx.moveTo(canvas.width / 2 + (canvas.width / 2 / 2), 0);
			ctx.lineTo(canvas.width / 2 + (canvas.width / 2 / 2), canvas.height);
			ctx.stroke();
			
			ctx.moveTo(canvas.width / 2 / 2, 0);
			ctx.lineTo(canvas.width /2 / 2, canvas.height);
			ctx.stroke();
			
			// Center Left/Right
			ctx.moveTo(0, canvas.height / 2);
			ctx.lineTo(canvas.width, canvas.height / 2);
			ctx.stroke();
			
			ctx.moveTo(0, canvas.height / 2 + (canvas.height / 2 / 2));
			ctx.lineTo(canvas.width, canvas.height / 2 + (canvas.height / 2 / 2));
			ctx.stroke();
			
			ctx.moveTo(0, canvas.height / 2 / 2);
			ctx.lineTo(canvas.width, canvas.height / 2 / 2);
			ctx.stroke();
			
			ctx.closePath();
		}
		
		
                                   
		/* Don't worry about this, just a reference to something I was working on. Please don't delete. ~E
		function circle() {        
			ctx.beginPath();       
			ctx.fillStyle="#0000ff";
			// Draws a circle of radius 20 at the coordinates 100,100 on the canvas
			ctx.arc(x,y,20,0,Math.PI*2,true);
			ctx.fill();            
			ctx.closePath();       
		}                          
		*/                         
                                   
		function draw() {          
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			titleBackground();
			drawTitle();           
			drawTitleDir();       
                                   
			color++;               
			if(color == 15) {      
				r = Math.floor((Math.random() * 255) + 1);
				g = Math.floor((Math.random() * 255) + 1);
				b = Math.floor((Math.random() * 255) + 1);
				
				color = 0;         
			}
			
			gameStart();           
		}                          
		draw()                     
                                   
		function draw2() {         
                                   
			// Game code here      
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawLevelOneBackground();
			drawCharacter();       
			drawEnemy();           
			drawLives();           
			drawHealth();
			testVariableNums();
			testVariableNums();
			drawScore();           
			drawEnemyHealth();     
			drawDoor();
			openDoor();
			swap();
                                   
			// Tests if a key is pressed and if so it will move the character
			// Also tests if the character is touching a wall and if so it wont move
			if(dPressed && wPressed && characterY > 0 && characterX < canvas.width - characterWidth) {
				characterX += characterS;
				characterY -= characterS;
			} else if(dPressed && sPressed && characterX < canvas.width - characterWidth && characterY < canvas.height - characterHeight) {
				characterX += characterS;
				characterY += characterS;
			} else if(wPressed && aPressed && characterY > 0 && characterX > 0) {
				characterY -= characterS;
				characterX -= characterS;
			} else if(aPressed && sPressed && characterX > 0 && characterY < canvas.height - characterHeight) {
				characterX -= characterS;
				characterY += characterS;
			} else if(dPressed && characterX < canvas.width-characterWidth) {
				characterX += characterS;
			} else if(aPressed && characterX > 0) {
					characterX -= characterS;
			} else if(wPressed && characterY > 0) {
				characterY -= characterS;
			} else if(sPressed && characterY < canvas.height - characterHeight) {
				characterY += characterS;
			} else if(upPressed && rightPressed) {
				if(swap() == 0){
					drawPistolBullet();
					}	
				if(swap() == 1){
					drawShotgunBullet();
					}
				bulletX += b;
				bulletY -= b;
				if(shot == 0) {
					shot++;
				} else if(shot == 1) {
					downPressed = false;
					leftPressed = false;
				}     
			} else if(upPressed && leftPressed) {
				if(swap() == 0){
					drawPistolBullet();
					}	
				if(swap() == 1){
					drawShotgunBullet();
					}
				bulletX -= b;
				bulletY -= b;
				if(shot == 0) {
					shot++;
				} else if(shot == 1) {
					downPressed = false;
					rightPressed = false;
				}    
			} else if(downPressed && rightPressed) {
				if(swap() == 0){
					drawPistolBullet();
					}	
				if(swap() == 1){
					drawShotgunBullet();
					}
				bulletX += b;
				bulletY += b;   
				if(shot == 0) {
					shot++;
				} else if(shot == 1) {
					leftPressed = false;
					upPressed = false;
				}     
			} else if(downPressed && leftPressed) {
				if(swap() == 0){
					drawPistolBullet();
					}	
				if(swap() == 1){
					drawShotgunBullet();
					}
				bulletX -= b;
				bulletY += b;   
				if(shot == 0) {
					shot++;
				} else if(shot == 1) {
					rightPressed = false;
					upPressed = false;
				}     
			} else if (downPressed) {
				if(swap() == 0){
					drawPistolBullet();
					}	
				if(swap() == 1){
					drawShotgunBullet();
					}
				bulletY += b;
				if(shot == 0) {
					shot++;
				} else if(shot == 1) {
					rightPressed = false;
					leftPressed = false;
					upPressed = false;
				}      
			} else if(upPressed) { 
				if(swap() == 0){
					drawPistolBullet();
					}	
				if(swap() == 1){
					drawShotgunBullet();
					}
				bulletY -= b;
				if(shot == 0) {
					shot++;
				} else if(shot == 1) {
					downPressed = false;
					leftPressed = false;
					rightPressed = false;
				}     
			} else if(leftPressed) {
				if(swap() == 0){
					drawPistolBullet();
					}	
				if(swap() == 1){
					drawShotgunBullet();
					}
				bulletX -= b;
				if(shot == 0) {
					shot++;
				} else if(shot == 1) {
					downPressed = false;
					rightPressed = false;
					upPressed = false;
				}     
			} else if(rightPressed) {
				if(swap() == 0){
					drawPistolBullet();
					}	
				if(swap() == 1){
					drawShotgunBullet();
					}					
				bulletX += b;
				if(shot == 0) {
					shot++;
				} else if(shot == 1) {
					downPressed = false;
					leftPressed = false;
					upPressed = false;
				}     
			}
                                   
			if(bulletX < 0 || bulletX > 1000) {
				downPressed = false;
				rightPressed = false
				upPressed = false; 
				leftPressed = false;
				bulletX = characterX + 12;
				bulletY = characterY + 12;
				shot--;
			} else if (bulletY < 0 || bulletY > 900) {
				downPressed = false;
				rightPressed = false
				upPressed = false; 
				leftPressed = false;
				bulletX = characterX + 12;
				bulletY = characterY + 12;
				shot--;
			}                      
                                   
			requestAnimationFrame(draw2);
		}