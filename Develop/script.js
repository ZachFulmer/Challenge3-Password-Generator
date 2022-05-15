// Assignment code here
var passwordInfo = 
{
  length: 0,
  lowercaseInclude: false,
  uppercaseInclude: false,
  numericInclude: false,
  specialInclude: false,
  charactersUsed: [],
  createCharacterArray: function()
  {
    if(this.lowercaseInclude == true)
    {
      var lowercaseArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
      this.charactersUsed = this.charactersUsed.concat(lowercaseArray);
    }
    
    if(this.uppercaseInclude == true)
    {
      var uppercaseArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
      this.charactersUsed = this.charactersUsed.concat(uppercaseArray);

    }
    
    if(this.numericInclude == true)
    {
      var numericArray = ["0","1","2","3","4","5","6","7","8","9"];
      this.charactersUsed = this.charactersUsed.concat(numericArray);
    }

    if(this.specialInclude == true)
    {
      var specialArray = [" ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"];
      this.charactersUsed = this.charactersUsed.concat(specialArray);
    }
  },
  passwordInfoReset: function()
  {
    this.charactersUsed = [];
    this.lowercaseInclude = false;
    this.uppercaseInclude = false;
    this.numericInclude = false;
    this.specialInclude = false;
    this.length = 0;
  }
};

var getPasswordLength = function()
{
  // Request length of password
  var passwordLengthString = window.prompt("For characters between 8 and 128, how long would you like your password to be?");
  passwordInfo.length = parseInt(passwordLengthString);
  if((passwordInfo.length < 8 || passwordInfo.length > 128) || passwordLengthString === "")
  {
    window.alert("Invalid Entry. Please try again.");
    getPasswordLength();
  }
};

var generatePassword = function()
{
  var password = "";

  // Get Password Length
  getPasswordLength();

  // Request Password character set
  criteriaSelect();

  // Build Password
  for(var i = 0; i < passwordInfo.length; i++)
  {
    password += passwordInfo.charactersUsed[Math.floor(Math.random() * passwordInfo.charactersUsed.length)];
  }

  return password;
};

// Determine Password Criteria
var criteriaSelect = function()
{
  // Lowercase selected?
  var lowercaseConfirm = window.confirm("Would you like your password to contain lowercase characters?");
  passwordInfo.lowercaseInclude = lowercaseConfirm;

  // Uppercase selected?
  var uppercaseConfirm = window.confirm("Would you like your password to contain uppercase characters?");
  passwordInfo.uppercaseInclude = uppercaseConfirm;

  // Numeric selected?
  var numericConfirm = window.confirm("Would you like your password to contain numeric characters?");
  passwordInfo.numericInclude = numericConfirm;

  // Uppercase selected?
  var specialConfirm = window.confirm("Would you like your password to contain special characters?");
  passwordInfo.specialInclude = specialConfirm;

  // If none selected.
  if((passwordInfo.lowercaseInclude || passwordInfo.uppercaseInclude || passwordInfo.numericInclude || passwordInfo.specialInclude) == false)
  {
    window.alert("You must select at least one characterset for your password. Try Again.");
    criteriaSelect();
  }

  // Builds an array of usable charaters 
  passwordInfo.createCharacterArray();

  return;
};


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  passwordInfo.passwordInfoReset();
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
