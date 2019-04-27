const checkInstallButton = document.getElementById("checkInstallButton");
checkInstallButton.addEventListener("click", checkInstall);

const refreshPageButton = document.getElementById("refreshPageButton");
refreshPageButton.addEventListener("click", refreshPage);

const connectedSection = document.getElementById("connectedSection");
connectedSection.style.display = "none";

const errorSection = document.getElementById("errorSection");
errorSection.style.display = "none";

const envFileLink = document.getElementById("envFileLink");

let domainName = "";

function checkInstall() {
  console.log("test");
  return fetch("/checkinstall/").then(res => {
    console.log(res);
    if (res.status === 200) {
      //awesome the token is working!
      connectedSection.style.display = "block";
    } else {
      errorSection.style.display = "block";
    }
    return Promise.resolve();
  });
}

function refreshPage() {
  location.reload();
}

function getDomain() {
  console.log("test");
  return fetch("/domainname/")
    .then(res => res.json())
    .then(resJson => {
      if (resJson.error) {
        console.log(resJson.error);
      } else {
        console.log(resJson.message);
        domainName = resJson.message;
        console.log("domain name " + domainName);
        envFileLink.href =
          "https://glitch.com/edit/#!/" + domainName + "?path=.env:10";
      }
      return Promise.resolve();
    });
}

getDomain();

function clipboard(element) {
  let copyText = document.getElementById(element);
  copyText.select();
  document.execCommand("Copy");
}

function generateEnv() {
  let discordToken =
    document.getElementById("discordToken").value || "<Your token value here>";
  let env = `# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET

DISCORD_TOKEN=${discordToken}

# note: .env is a shell file so there can't be spaces around =
`;
  document.getElementById("env_file").value = env;
}

generateEnv();