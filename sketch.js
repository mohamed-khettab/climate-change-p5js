let temperature = 0;
let energyProduced = 0;
let moneyAmount = 350;
let elapsedTime = 0;
let timer = 0;
let factoriesOwned = 10;
let windmillsOwned = 0;
let solarsOwned = 0;
let gameState = "";

function setup() {
  new Canvas(313, 376, "pixelated");

  backgroundSprites = new Group();
  backgroundSprite1 = new backgroundSprites.Sprite(0, 188, 626, 376, "s");
  backgroundSprite1.addAni("assets/background.png");

  // Factory sprites start here
  factoriesGroup = new Group();
  factoriesGroup.addAni("assets/factory.png");
  factoriesGroup.scale = 0.1;
  factory1 = new factoriesGroup.Sprite(150, 265, 500, 500, "s");
  factory2 = new factoriesGroup.Sprite(250, 265, 500, 500, "s");

  // Windmill sprites start here
  windmillsGroup = new Group();
  windmillsGroup.addAni("assets/windmill.png");
  windmill1 = new windmillsGroup.Sprite(40, 250, 250, 500, "s");
  windmill2 = new windmillsGroup.Sprite(0, 250, 250, 500, "s");
  windmill3 = new windmillsGroup.Sprite(-40, 250, 250, 500, "s");
  windmillsGroup.scale = 0.18;

  solarsGroup = new Group();
  solarsGroup.addAni("assets/solar.png");
  solarsGroup.scale = 0.05;
  solar1 = new solarsGroup.Sprite(-150, 270, 200, 200, "s");
  solar2 = new solarsGroup.Sprite(-200, 270, 200, 200, "s");
  solar3 = new solarsGroup.Sprite(-250, 270, 200, 200, "s");

  // Text boxes start here
  textBoxesGroup = new Group();
  textBox = new textBoxesGroup.Sprite(200, 100, 200, 150, "n");
  textBox.textSize = 8;
  moneyTextBox = new textBoxesGroup.Sprite(5, 80, 100, 20, "n");
  textBoxesGroup.text = "";
  textBoxesGroup.color = "white";
  textBoxesGroup.visible = false;
  moneyTextBox.visible = true;

  // Buttons start here
  buttonsGroup = new Group();
  factoryButton = new buttonsGroup.Sprite(
    factory1.x + 50,
    factory1.y + 50,
    100,
    25,
    "s"
  );
  factoryButton.text = "Sell Factory (+1M)";
  windmillButton = new buttonsGroup.Sprite(
    windmill3.x + 40,
    windmill1.y + 65,
    100,
    25,
    "s"
  );
  windmillButton.text = "Buy Windmill (-20M)";
  solarButton = new buttonsGroup.Sprite(solar3.x + 50, 
    solar3.y + 45, 
    100, 
    25, 
    "s");
  solarButton.text = "Buy Solar Panel (-10M)";
  buttonsGroup.textSize = 9;
  buttonsGroup.color = "white"; 

  barsGroup = new Group();
  bar1 = new barsGroup.Sprite(0, 20, 100, 20, "n");
  barTemp = new barsGroup.Sprite(5, 20, 95, 15, "n");
  barTemp.text = "Temperature Rise: ";
  barTemp.textSize = 7;
  bar2 = new barsGroup.Sprite(0, 50, 100, 20, "n");
  barEnergy = new barsGroup.Sprite(5, 50, 10, 15, "n");
  barEnergy.text = "Energy Produced";
  barEnergy.textSize = 7;
  barsGroup.color = "white";
  barTemp.color = "red";
  barEnergy.color = "red";
}

function draw() {
  background("black");
  textBox.layer = 100;
  textBox.textSize = 8;
  textBox.x = camera.x;
  elapsedTime = millis();
  if (elapsedTime - timer >= 2000 / factoriesOwned) {
    timer = millis();
    if (temperature <= 95) {
      temperature += 1;
    }
  }

  moneyTextBox.text = "Money: " + moneyAmount + "M";
  barsGroup.x = camera.x + 100;
  moneyTextBox.x = camera.x + 100;

  barTemp.width = temperature;
  barEnergy.width = energyProduced;

  if (kb.pressing("right") && camera.x <= 154.5) {
    camera.x += 3;
  } else if (kb.pressing("left") && camera.x >= -154.5) {
    camera.x -= 3;
  }

  if (
    factoriesGroup.mouse.hovering() ||
    windmillsGroup.mouse.hovering() ||
    solarsGroup.mouse.hovering()
  ) {
    textBox.visible = true;
    textBox.x = camera.x;
  } else {
    textBox.visible = false;
    textBox.collider = "n";
  }
  if (factoriesGroup.mouse.hovering()) {
    textBox.text =
      "Factories emit several harmful chemicals and\n" +
      "compounds that can harm the environment,\n" +
      "and specifically the ozone layer. The\n" +
      "main emissions that are harmful to\n" +
      "the ozone layer, called ODS (Ozone\n" +
      "-Depleting Substances). Specifically, factories produce\n" +
      "Class 1 ODS, mainly CFCs (Chlorofluorocarbons) and \n" +
      "HCFCs (Hydrochlorofluorocarbons), which, under \n" +
      "proper conditions,could deteriorate the ozone layer. \n" +
      "They also emit greenhouse gases, like Methane and \n" +
      "Carbon Dioxide. These\n" +
      "can heat up the atmosphere and increase\n" +
      "global warming. These greenhouse gases\n" +
      "are produced by the burning of fossil fuels for energy.";
  }
  if (windmillsGroup.mouse.hovering()) {
    textBox.text =
      "Wind turbines are clean and\n" +
      "renewable sources of energy.\n" +
      "They use the wind to help spin\n" +
      "turbines that help create\n" +
      "energy. A farm of these can\n" +
      "produce roughly 300K MW \n" +
      "per year. They cost roughly\n" +
      "$3 million, plus $40K per\n" +
      "year for maintenance.";
    textBox.textSize = 13;
  }
  if (solarsGroup.mouse.hovering()) {
    textBox.text =
      "Solar panel farms are also very clean and\n" +
      "renewable sources of energy. Large, industrial, 10 acre\n" +
      "farms can create up to 25K MW per year.\n" +
      "They work by capturing\n" +
      "photons from sunlight to create electricity. A 10 acre\n" +
      "solar farm would cost roughly $5 million dollars for\n" +
      "installation, plus another $50K per year. However, \n" +
      "despite their widespread popularity among people, they\n" +
      "are less efficient than and cost more than wind energy.";
  }

  if (factoriesOwned >= 5) {
    factoriesGroup.visible = true;
  } else if (factoriesOwned > 0) {
    factory2.visible = false;
    factory1.visible = true;
  } else {
    factoriesGroup.visible = false;
  }
  if (factoryButton.mouse.hovering()) {
    factoryButton.color = "grey";
  } else {
    factoryButton.color = "white";
  }
  if (factoryButton.mouse.presses()) {
    if (factoriesOwned > 0) {
      factoriesOwned -= 1;
      moneyAmount += 1;
    }
  }

  if (windmillsOwned >= 7) {
    windmillsGroup.visible = true;
  } else if (windmillsOwned >= 3) {
    windmill2.visible = true;
  } else if (windmillsOwned > 0) {
    windmill1.visible = false;
    windmill2.visible = false;
    windmill3.visible = true;
  } else {
    windmillsGroup.visible = false;
  }
  if (windmillButton.mouse.hovering()) {
    windmillButton.color = "grey";
  } else {
    windmillButton.color = "white";
  }
  if (windmillButton.mouse.presses() && moneyAmount >= 20 && energyProduced < 95) {
    windmillsOwned += 1;
    moneyAmount -= 20;
  }

  if (solarsOwned >= 7) {
    solarsGroup.visible = true;
  } else if (solarsOwned >= 3) {
    solar2.visible = true;
  } else if (solarsOwned > 0) {
    solar1.visible = false;
    solar2.visible = false;
    solar3.visible = true;
  } else {
    solarsGroup.visible = false;
  }
  if (solarButton.mouse.hovering()) {
    solarButton.color = "grey";
  } else {
    solarButton.color = "white";
  }
  if (solarButton.mouse.presses() && moneyAmount >= 10 && energyProduced < 95) {
    solarsOwned += 1;
    moneyAmount -= 10;
  }

  if (energyProduced >= 95 && factoriesOwned == 0) {
    gameState = "won";
  }
  if (moneyAmount < 10 && energyProduced < 95) {
    gameState = "lost";
  }
  if (temperature >= 95) {
    gameState = "lost";
  }

  if (gameState == "won") {
    allSprites.visible = false;
    textBox.visible = true;
    textBox.text =
      "You won! \nI hope you learned something \nabout climate change.";
  }
  if (gameState == "lost") {
    allSprites.visible = false;
    textBox.visible = true;
    textBox.text =
      "You lost. \nI hope you learned something \nabout climate change.";
  }
  energyProduced = factoriesOwned * 5 + windmillsOwned * 5 + solarsOwned * 3;
}
